import { EventEmitter } from "../common/EventEmitter";

const urlsMap = new WeakMap();

export class TaskModel extends EventEmitter {
  get url() {
    return urlsMap.get(this);
  }

  constructor(baseUrl, data) {
    super();

    urlsMap.set(this, baseUrl + data.id);
    this.set(data);
  }

  delete() {
    return fetch(this.url, {
      method: "DELETE"
    }).then(() => {
      this.trigger("delete");
    });
  }

  //   save() {
  //     console.log("save");
  //     return fetch(this.url, {
  //       method: "PUT",
  //       body: JSON.stringify(this),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }).then(() => {
  //       this.trigger("update");
  //     });
  //   }

  set(data) {
    Object.assign(this, data);
  }

  toggleTodo() {
    const data = this;
    data.isDone = !data.isDone;

    fetch(this.url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.trigger("update");
    });
  }
}
