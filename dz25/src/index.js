import "./styles/index.scss";
import $ from "jquery";
import { ContactController } from "./scripts/controller/ContactController";

$(() => {
  new ContactController($(".flex-table"), $(".dz10"));
});
