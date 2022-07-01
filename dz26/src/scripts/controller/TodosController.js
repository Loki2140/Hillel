import { TODOS_URL } from "../../config";
import { TodosCollection } from "../model/TodosCollection";
import { TodoViews } from "../view/TodoViews";

export class TodosController {
  constructor($container) {

    this._collection = new TodosCollection(TODOS_URL);
    this._view = new TodoViews($container, this._collection);

    this._collection.fetchList();
  }
}
