import $ from "jquery";
export class ContactFormView {
  static FORM_TEMPLATE = `<form class="newContact">
  <input id="name" name="name" type="text" placeholder="Name">
  <input id="surname" name="surname" type="text" placeholder="Surname">
  <input id="e-mail" name="telNum" type="text" placeholder="E-mail">
  <button name="addRow" id="addRow">Add Contact</button>
</form>`;

  static BUTTON_SELECTOR = "#addRow";
  // static ERROR_SELECTOR = ".error";
  static FORM_SELECTOR = ".newContact";
  static INPUT_SELECTOR_NAME = "#name";
  static INPUT_SELECTOR_EMAIL = "#e-mail";
  static INPUT_SELECTOR_SURNAME = "#surname";

  static clearForm() {
    $(ContactFormView.FORM_SELECTOR).trigger("reset");
  }

  constructor(config = {}) {
    this.$el = $(ContactFormView.FORM_TEMPLATE).on(
      "click",
      ContactFormView.BUTTON_SELECTOR,
      (e) => {
        e.preventDefault();
        config.onAddContact &&
          config.onAddContact({
            name: $(ContactFormView.INPUT_SELECTOR_NAME).val(),
            email: $(ContactFormView.INPUT_SELECTOR_EMAIL).val(),
            surname: $(ContactFormView.INPUT_SELECTOR_SURNAME).val()
          });
        ContactFormView.clearForm();
      }
    );
  }
}
