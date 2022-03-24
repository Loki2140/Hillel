export default function dz1() {
  let name = prompt("Приветствую, Как тебя зовут?!", "Аноним");
  if (name == "" || name == null) {
    alert("Необходимо было что-то ввести! Попробуй еще раз!");
    return;
  }
  name.match(/\d+/)
    ? alert("Это не имя, попробуй еще раз!")
    : alert(`Hello, ${name}! How are you?`);
}
