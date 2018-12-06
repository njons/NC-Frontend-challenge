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
  console.log("this is the vw coming in :", vw);
  // console.log("this is the window.innerWidth:", window.innerWidth);
  // deduct 45px to compensate for the 2 x 20px margin and 5px box shadow on button
  let bodyWidth = ((document.body.clientWidth - 45) * 0.01).toFixed(3);
  console.log("this is the window width:", bodyWidth);
  // console.log("this is the window width(80%):", bodyWidth80percent);
  console.log("this is the window width * vw:", bodyWidth * vw);
  return bodyWidth * vw;
};

// use value from slide to calculate the width outputDiv
const setOutputDivWidth = sliderValue => {
  console.log("you have reached setOutputDivWidth");
  console.log("this is the slider value:", sliderValue);
  let calcWidth = convertVwToPx(100 * sliderValue);
  console.log("this is the calcWidth value:", calcWidth);
  console.log("this is the calcWidth value:", calcWidth);
  let outputDivWidth = calcWidth;
  outputDiv.style.width = outputDivWidth + "px";
  saveToLocalStorage("outputDivWidth", outputDivWidth);
  // outputDiv.style.width = calcWidth - 173 + "px";
};

const fitText = outputDiv => {
  console.log("you have reached fitText");
  let outputDivWidth = getFromLocalStorage("outputDivWidth") - 20;
  let outputTextWidth = outputText.clientWidth + 50;
  // let fontSize = 50;

  console.log(
    "this is the clientWidth of the button element :",
    outputDivWidth
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
    // save current font size in local storage
    saveToLocalStorage("fontSize", currFontSize);
    if (currFontSize > 50) {
      // check if the output div is bigger than the text
      outputText.style.fontSize = "50px";
      // save current font size in local storage
      saveToLocalStorage("fontSize", 50);
    } else if (currFontSize < 10) {
      // check if the output div is bigger than the text
      outputText.style.fontSize = "10px";
      // save current font size in local storage
      saveToLocalStorage("fontSize", 10);
    }
  }
};

// call fitText on window resize
window.addEventListener("resize", event => {
  console.log("you resized the window");
  setOutputDivWidth(slider.value);
  fitText(outputDiv);
});

// if avaliable, get and apply the stored values on load
window.addEventListener("load", event => {
  if (!getFromLocalStorage("sliderValue") === "") {
    slider.value = getFromLocalStorage("sliderValue");
    outputDiv.style.width = getFromLocalStorage("outputDivWidth") + "px";
    outputText.textContent = getFromLocalStorage("input");
    outputText.style.fontSize = getFromLocalStorage("fontSize") + "px";
  }
  slider.value = 0.5;
  setOutputDivWidth(slider.value);
  fitText(outputDiv);
});

slider.addEventListener("change", event => {
  console.log("you have changed the slider");
  let sliderValue = slider.value;
  saveToLocalStorage("sliderValue", sliderValue);
  setOutputDivWidth(sliderValue);
  fitText(outputDiv);
});

inputDiv.addEventListener("keyup", event => {
  console.log("you have keyed up");
  let text = inputDiv.value;
  console.log("this is text:", text);
  outputText.textContent = text;
  saveToLocalStorage("input", text);
  setOutputDivWidth(slider.value);
  // use text input to calculate the width of the output text
  fitText(outputDiv);
});

// clear all inputs and empty local storage
clear.addEventListener("click", event => {
  const clear = document.querySelector("#clear");
  const outputText = outputDiv.querySelector("#output__text");
  // prevent reloading the page
  event.preventDefault();

  // clear all inputs
  outputText.textContent = "";
  inputDiv.value = "";
  inputDiv.placeholder = "Type text here...";

  // clear all info stored in loal storage
  saveToLocalStorage("input", "");
  saveToLocalStorage("fontSize", "");
  saveToLocalStorage("sliderValue", "");
  saveToLocalStorage("outputDivWidth", "");
});
