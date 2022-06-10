class TodosListView {
  static LIST_TEMPLATE = `<ol id="taskList" name="toDoList" class="toDoList">
    </ol>`;
  static LIST_ITEM_TEMPLATE = `<li data-id="{{id}}" class="task-item {{doneClass}}">{{title}}<span class="delete-btn">X</span></li>`;

  static TASK_SELECTOR = ".task-item";
  static TASK_DELETE_SELECTOR = ".delete-btn";
  static TASK_DONE_CLASS = "done";

  static createItemElement(todo) {
    return $(
      TodosListView.LIST_ITEM_TEMPLATE.replace("{{id}}", todo.id)
        .replace("{{title}}", todo.title)
        .replace(
          "{{doneClass}}",
          todo.isDone ? TodosListView.TASK_DONE_CLASS : ""
        )
    );
  }

  constructor(config = {}) {
    this.$el = $(TodosListView.LIST_TEMPLATE)
      .on(
        "click",
        TodosListView.TASK_SELECTOR,
        (e) => config.onToggle && config.onToggle($(e.target).data("id"))
      )
      .on("click", TodosListView.TASK_DELETE_SELECTOR, (e) => {
        e.stopPropagation();
        config.onDelete &&
          config.onDelete(
            $(e.target).closest(TodosListView.TASK_SELECTOR).data("id")
          );
      });
  }

  renderList(list) {
    this.$el.empty();
    this.$el.append(list.map(TodosListView.createItemElement));
  }
}
