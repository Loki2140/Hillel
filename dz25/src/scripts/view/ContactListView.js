import $ from "jquery";

export class ContactListView {
  static LIST_TEMPLATE = `<tbody class="tbody">
  </tbody>`;
  static LIST_ITEM_TEMPLATE = `<tr data-id="{{id}}" class="trItem">
  <td>{{name}}</td>
  <td>{{surname}}</td>
  <td>{{email}}</td>
  <td class="delete-btn">X</td>
</tr>`;
  static CONTACT_SELECTOR = ".trItem";
  static CONTACT_DELETE_SELECTOR = ".delete-btn";

  static createItemElement(contact) {
    return $(
      ContactListView.LIST_ITEM_TEMPLATE.replace("{{id}}", contact.id)
        .replace("{{name}}", contact.name)
        .replace("{{surname}}", contact.surname)
        .replace("{{email}}", contact.email)
    );
  }

  constructor(config = {}) {
    this.$el = $(ContactListView.LIST_TEMPLATE).on(
      "click",
      ContactListView.CONTACT_DELETE_SELECTOR,
      (e) => {
        e.stopPropagation();
        config.onDelete &&
          config.onDelete(
            $(e.target).closest(ContactListView.CONTACT_SELECTOR).data("id")
          );
      }
    );
  }

  renderList(list) {
    this.$el.empty();
    this.$el.append(list.map(ContactListView.createItemElement));
  }
}
