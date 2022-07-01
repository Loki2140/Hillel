import { EventEmitter } from "../common/EventEmitter";
import { TaskModel } from "./TaskModel";

export class TodosCollection extends EventEmitter {
  constructor(apiUrl) {
    super();

    this.list = [];
    this._url = apiUrl;
  }

  fetchList() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((data) => {
        this.list = data.map((el) => this._wrapModel(el));
        this.trigger("update", this.list);
      });
  }

  // toggleTodo(todoId) {
  //     const todoItem = this.list.find(({ id }) => id == todoId);

  //     if (!todoItem) {
  //         return console.error('Id not found', todoId);
  //     }

  //     todoItem.isDone = !todoItem.isDone;

  //     return fetch(this._url + todoId, {
  //         method: 'PUT',
  //         body: JSON.stringify(todoItem),
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //     });
  // }

  removeUser(userId) {
    // this.list = this.list.filter(({ id }) => id != todoId);
    // return fetch(this._url + todoId, {
    //     method: 'DELETE',
    // });
  }

  createUser(newUser) {
    return fetch(this._url, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const model = this._wrapModel(data);
        this.list.push(model);
        this.trigger("add", model);
      });
  }

  //   get(id) {
  //     return this.list.find((model) => model.id === id);
  //   }

  _wrapModel = (data) => {
    const model = new TaskModel(this._url, data);
    model.on(
      "delete",
      () => (this.list = this.list.filter((m) => m !== model))
    );
    // model.on("update", this.);

    return model;
  };
}
