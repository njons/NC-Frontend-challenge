const inputText = document.querySelector("#input__text");
const outputDiv = document.querySelector("#output__div");
const outputText = document.querySelector("#output__text");
const slider = document.querySelector("#slider");

// store values in local storage
const saveToLocalStorage = (id, value) => {
  return localStorage.setItem(id, value);
};

//get the saved value function
const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

// use window width and the value from slide to convert vw into px
const convertVwToPx = vw => {
  // deduct 45px to compensate for the 2 x 20px margin and 5px box shadow on button
  let bodyWidth = ((document.body.clientWidth - 45) * 0.01).toFixed(3);
  return bodyWidth * vw;
};

// use value from slide to calculate the width outputDiv
const setOutputDivWidth = sliderValue => {
  let calcWidth = convertVwToPx(100 * sliderValue);
  let outputDivWidth = calcWidth;
  outputDiv.style.width = outputDivWidth + "px";
  saveToLocalStorage("outputDivWidth", outputDivWidth);
};

const fitText = outputDiv => {
  // 20px padding inside the div to iniate the resizing earlier
  let outputDivWidth = getFromLocalStorage("outputDivWidth") - 20;
  // 50px margin outside the text to iniate the resizing earlier
  let outputTextWidth = outputText.clientWidth + 50;
  let difference = (outputDivWidth / outputTextWidth).toFixed(3);

  if (difference) {
    let currFontSize = parseFloat(
      window.getComputedStyle(outputText, null).getPropertyValue("font-size")
    );
    currFontSize = (currFontSize * difference).toFixed(3);
    outputText.style.fontSize = currFontSize + "px";
    // save current font size in local storage
    saveToLocalStorage("fontSize", currFontSize);
    // set a max and min font size
    if (currFontSize > 50) {
      outputText.style.fontSize = "50px";
      saveToLocalStorage("fontSize", 50);
    } else if (currFontSize < 10) {
      outputText.style.fontSize = "10px";
      saveToLocalStorage("fontSize", 10);
    }
  }
};

// call fitText on window resize
window.addEventListener("resize", event => {
  setOutputDivWidth(slider.value);
  fitText(outputDiv);
});

// if avaliable, get and apply the stored values on load
window.addEventListener("load", event => {
  slider.value = getFromLocalStorage("sliderValue");
  outputDiv.style.width = getFromLocalStorage("outputDivWidth") + "px";
  outputText.textContent = getFromLocalStorage("input");
  outputText.style.fontSize = getFromLocalStorage("fontSize") + "px";
  if (getFromLocalStorage("sliderValue") === "") {
    slider.value = 0.5;
    setOutputDivWidth(slider.value);
    fitText(outputDiv);
  }
});

slider.addEventListener("change", event => {
  let sliderValue = slider.value;
  saveToLocalStorage("sliderValue", sliderValue);
  setOutputDivWidth(sliderValue);
  fitText(outputDiv);
});

inputText.addEventListener("keyup", event => {
  event.preventDefault();
  let text = inputText.value;
  if (event.key === "Enter") {
    event.preventDefault();
  } else if (text.length === 0) {
    inputText.placeholder = "Type something here...";
    inputText.style.backgroundColor = "yellow";
    saveToLocalStorage("input", "");
  } else {
    inputText.placeholder = "";
    inputText.style.backgroundColor = "transparent";
    outputText.textContent = text;
    saveToLocalStorage("input", text);
    setOutputDivWidth(slider.value);
    // use text input to calculate the width of the output text
    fitText(outputDiv);
  }
});

// clear all inputs and empty local storage
clear.addEventListener("click", event => {
  const clear = document.querySelector("#clear");
  const outputText = outputDiv.querySelector("#output__text");
  // prevent reloading the page
  event.preventDefault();

  // clear all inputs
  outputText.textContent = "";
  inputText.value = "";
  inputText.placeholder = "Type text here...";

  // clear all info stored in loal storage
  saveToLocalStorage("input", "");
  saveToLocalStorage("fontSize", "");
  saveToLocalStorage("sliderValue", "");
  saveToLocalStorage("outputDivWidth", "");
});
