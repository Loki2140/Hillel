const CONTACTS_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users/";

export class ContactCollection {
  constructor() {
    this.list = [];
  }

  fetchList() {
    return fetch(CONTACTS_URL)
      .then((res) => res.json())
      .then((data) => {
        this.list = data;
      });
  }

  addContact(item) {
    return fetch(CONTACTS_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.list.push(data);
      });
  }

  removeContact(contactId) {
    this.list = this.list.filter(({ id }) => id != contactId);

    return fetch(CONTACTS_URL + contactId, {
      method: "DELETE"
    });
  }
}
