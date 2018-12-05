console.log("this is main.js");

const outputDiv = document.querySelector("#output__div");
const inputText = document.querySelector("#input__text");
const slider = document.querySelector("#slider");

slider.addEventListener("change", event => {
  console.log("you have changed the slider");
});
