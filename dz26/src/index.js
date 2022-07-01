import $ from "jquery";
import { TodosController } from "./scripts/controller/TodosController";
import "./styles/index.scss";

$(() => {
  new TodosController($(".dz9"));
});
