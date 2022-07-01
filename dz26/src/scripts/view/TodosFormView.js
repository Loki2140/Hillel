import $ from "jquery";
import { EventEmitter } from "../common/EventEmitter";

export class TodosFormView extends EventEmitter {
  static FORM_TEMPLATE = `<form class="toDo">
    <div class="task">
      <input id="taskNameInput" name="newTask" type="text" placeholder="New Task">
      <button type="submit" name="addTask" id="addTask">Add Task</button>
    </div>
</form>`;
  static INPUT_SELECTOR = "#taskNameInput";

  constructor() {
    super();

    this.init();
  }

  init() {
    this.$el = $(TodosFormView.FORM_TEMPLATE);
    this.$el.on("submit", (e) => {
      e.preventDefault();

      const formData = this._getFormData();
      this.trigger("save", formData);
      this.reset();
    });

    this._$inputs = this.$el.find("input");
  }

  _getFormData() {
    const data = this.$el.find(TodosFormView.INPUT_SELECTOR).val();
    return { title: data, isDone: false };
  }

  //   _getFormData() {
  //     const formData = {};

  //     this.$el
  //       .serializeArray()
  //       .forEach(({ name, value }) => (formData[name] = value));

  //     return formData;
  //   }

  // fill(model) {
  //   this._$inputs.each((_, input) => {
  //     input.value = model[input.name];
  //   });
  // }

  reset() {
    this._$inputs.each((_, input) => {
      input.value = "";
    });
  }
}
