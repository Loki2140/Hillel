import $ from "jquery";
import { TodosFormView } from "./TodosFormView";
import { TodosListView } from "./TodosListView";
// import { EventEmitter } from "../common/EventEmitter";
// extends EventEmitter
export class TodoViews {
  static TEMPLATE = `
  <div class="toDo"><div class="flex"><div>Task</div><div>Actions</div>
  </div>`;
  constructor($container, collection) {
    // super();
    this._collection = collection;
    this.init();
    this._$listView = new TodosListView(collection);
    this._$formView = new TodosFormView();

    this.$el.append(this._$listView.$el);
    $container.prepend(this.$el);
    this._$listView.$el.after(this._$formView.$el);
    this._$formView.on("save", this.saveData);
  }

  init() {
    this.$el = $(TodoViews.TEMPLATE);
  }

  saveData = (data) => {
    if (data.id) {
      const model = this._collection.get(data.id);

      model.set(data);

      model.save();
    } else {
      this._collection.createUser(data);
    }
  };

  editModel = (model) => {
    this._$formView.fill(model);
  };
}
