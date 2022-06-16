class TodosFormView {
  static FORM_TEMPLATE = `<form class="toDo">
  <h3>Current tasks</h2>
    <ol name="toDoList" class="toDoList">
    </ol>
    <div class="task">
      <input id="taskNameInput" name="newTask" type="text" placeholder="New Task">
      <button name="addTask" id="addTask">Add Task</button>
    </div>
    <div class="error"></div>
</form>`;

  static BUTTON_SELECTOR = "#addTask";
  // static ERROR_SELECTOR = ".error";
  static FORM_SELECTOR = ".toDo";
  static INPUT_SELECTOR = "#taskNameInput";

  static clearForm() {
    $(TodosFormView.FORM_SELECTOR).trigger("reset");
  }

  constructor(config = {}) {
    this.$el = $(TodosFormView.FORM_TEMPLATE).on(
      "click",
      TodosFormView.BUTTON_SELECTOR,
      (e) => {
        e.preventDefault();
        config.onAddTask &&
          config.onAddTask({
            title: $(TodosFormView.INPUT_SELECTOR).val(),
            isDone: false
          });
        TodosFormView.clearForm();
      }
    );
  }
}
