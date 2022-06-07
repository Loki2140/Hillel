class TodosController {
  constructor($container) {
    this._todosFormView = new TodosFormView({
      onAddTask: (task) => this.addTask(task)
    });
    this._todosListView = new TodosListView({
      onToggle: (id) => this.toggleTodo(id),
      onDelete: (id) => this.removeTodo(id)
    });
    $container.append(this._todosListView.$el);
    $container.append(this._todosFormView.$el);

    this._todosList = new TodosCollection();
    this._todosList
      .fetchList()
      .then(() => this._todosListView.renderList(this._todosList.list));
  }

  async addTask(task) {
    await this._todosList.addTask(task);
    this._todosListView.renderList(this._todosList.list);
  }

  toggleTodo(id) {
    this._todosList.toggleTodo(id);
    this._todosListView.renderList(this._todosList.list);
  }

  removeTodo(id) {
    this._todosList.removeTodo(id);
    this._todosListView.renderList(this._todosList.list);
  }
}
