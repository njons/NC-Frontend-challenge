console.log("this is main.js");
const inputDiv = document.querySelector("#input__text");
const outputDiv = document.querySelector("#output__div");
const outputText = document.querySelector("#output__text");
const slider = document.querySelector("#slider");

slider.addEventListener("change", event => {
  console.log("you have changed the slider");
  let sliderValue = slider.value;
  console.log("this is the slider value:", sliderValue);
  // use value from slide to calculate the width outputDiv
  fitText();
});

inputDiv.addEventListener("keyup", event => {
  console.log("you have keyed up");
  let text = inputDiv.value;
  console.log("this is text:", text);
  // use text input to calculate the width of the output text
  fitText();
});

const fitText = outputDiv => {
  console.log(
    "this is the clientWidth of the text element :",
    outputText.clientWidth
  );
  console.log(
    "this is the clientWidth of the button element :",
    outputDiv.clientWidth
  );
};
