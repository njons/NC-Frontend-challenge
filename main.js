console.log("this is main.js");
const inputDiv = document.querySelector("#input__text");
const outputDiv = document.querySelector("#output__div");
const outputText = document.querySelector("#output__text");
const slider = document.querySelector("#slider");

// store values in local storage
const saveToLocalStorage = (id, value) => {
  // console.log("you're in save to local");
  return localStorage.setItem(id, value);
};

//get the saved value function
const getFromLocalStorage = key => {
  // console.log("this is key:", key);
  if (localStorage.getItem(key) === null) {
    return ""; // You can change this to your defualt value.
  }
  return localStorage.getItem(key);
};

// use window width and the value from slide to convert vw into px
const convertVwToPx = vw => {
  console.log("you have reached convertVwToPx");
  // const container = document.querySelector("#output__container");
  console.log("this is the vw coming in :", vw);
  console.log("this is the window.innerWidth:", window.innerWidth);
  let windowWidth = (window.innerWidth * 0.01).toFixed(3);
  console.log("this is the window width:", windowWidth);
  console.log("this is the window width * vw:", windowWidth * vw);
  return windowWidth * vw;
};

// use value from slide to calculate the width outputDiv
const setOutputDivWidth = sliderValue => {
  console.log("you have reached setOutputDivWidth");
  console.log("this is the slider value:", sliderValue);
  let calcWidth = convertVwToPx(100 * sliderValue);
  console.log("this is the calcWidth value:", calcWidth);
  outputDiv.style.width = calcWidth - 173 + "px";
};

const fitText = outputDiv => {
  console.log("you have reached fitText");
  let outputDivWidth = getFromLocalStorage("outputDivWidth") - 20;
  let outputTextWidth = outputText.clientWidth + 50;
  // let fontSize = 50;

  console.log(
    "this is the clientWidth of the button element :",
    outputDivWidth.clientWidth
  );
  console.log(
    "this is the clientWidth of the text element :",
    outputText.clientWidth + 50
  );

  let difference = (outputDivWidth / outputTextWidth).toFixed(3);
  // console.log("this is the difference:", difference);

  if (difference) {
    console.log("the text should be smaller");
    let currFontSize = parseFloat(
      window.getComputedStyle(outputText, null).getPropertyValue("font-size")
    );
    console.log("this is the currFontSize before manipulation:", currFontSize);
    // fontSize = currFontSize;
    currFontSize = (currFontSize * difference).toFixed(3);
    console.log("this is currFontSize after manipulation:", currFontSize);
    outputText.style.fontSize = currFontSize + "px";
  }
};

slider.addEventListener("change", event => {
  console.log("you have changed the slider");
  let sliderValue = slider.value;
  setOutputDivWidth(sliderValue);
  fitText(outputDiv);
});

inputDiv.addEventListener("keyup", event => {
  console.log("you have keyed up");
  let text = inputDiv.value;
  console.log("this is text:", text);
  outputText.textContent = text;
  // use text input to calculate the width of the output text
  fitText(outputDiv);
});
