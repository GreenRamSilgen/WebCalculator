
let display = document.querySelector("#mainDisplay");

const numbers = document.querySelectorAll("button");
numbers.forEach(button => button.addEventListener('click', addToMain));


function addToMain(e)
{
    display.textContent += this.value;
}