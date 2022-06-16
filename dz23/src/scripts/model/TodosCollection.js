const TODOS_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos/";

class TodosCollection {
  constructor() {
    this.list = [];
  }

  fetchList() {
    return fetch(TODOS_URL)
      .then((res) => res.json())
      .then((data) => {
        this.list = data;
      });
  }

  toggleTodo(todoId) {
    const todoItem = this.list.find(({ id }) => id == todoId);

    if (!todoItem) {
      return console.error("Id not found", todoId);
    }

    todoItem.isDone = !todoItem.isDone;

    fetch(TODOS_URL + todoId, {
      method: "PUT",
      body: JSON.stringify(todoItem),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async addTask(item) {
    await fetch(TODOS_URL, {
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

  removeTodo(todoId) {
    this.list = this.list.filter(({ id }) => id != todoId);

    fetch(TODOS_URL + todoId, {
      method: "DELETE"
    });
  }
}
