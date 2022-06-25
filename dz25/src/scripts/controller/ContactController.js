import $ from "jquery";
import { ContactCollection } from "../model/ContactCollection";
import { ContactFormView } from "../view/ContactFormView";
import { ContactListView } from "../view/ContactListView";

export class ContactController {
  constructor(container, containerForm) {
    this._contactFormView = new ContactFormView({
      onAddContact: (contact) => this.addContact(contact)
    });
    this._contactListView = new ContactListView({
      onDelete: (id) => this.removeContact(id)
    });
    containerForm.append(this._contactFormView.$el);
    container.append(this._contactListView.$el);

    this._contactList = new ContactCollection();
    this._contactList
      .fetchList()
      .then(() => this._contactListView.renderList(this._contactList.list));
  }

  addContact(contact) {
    this._contactList
      .addContact(contact)
      .then(() => this._contactListView.renderList(this._contactList.list));
  }

  removeContact(id) {
    this._contactList
      .removeContact(id)
      .then(() => this._contactListView.renderList(this._contactList.list));
  }
}
