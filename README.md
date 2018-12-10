## Natural cycles frontend challenge

:sparkles: **[Check out the live site](https://njons.github.io/NC-Frontend-challenge)** :balloon:

## Brief

**Create a JavaScript solution to make a variable length text fit inside a container with flexible width, but fixed height.**

###### The purpose of the solution:

> To “fit” the input text into the div in one line (no line breaks) within the div height and using the maximum possible integer font-size.

###### Real world example:

> Phone app on iPhone, where the numbers get smaller as you add digits beyond the screen limit.

## Solution

Stack:

- HTML5 and CSS3
- Vanilla JavaScript (ES6) :icecream:

#### Functionality

- The functionality of resizing the `outputText` is based on the difference in size between the `outputDiv` and the `outputText`
- Once the `difference` is calculated, it is multiplied with the current font size:
  - When the text is larger than its container (difference > 1.0) = **larger text**
  - When the container is larger than the text (difference < 1.0) = **smaller text**

##### Calculating the difference

- The `text` is used to determine the width of the `outputText`
- The `slideValue` is used to determine the width of the `outputDiv` however, I wanted to make the width dynamic and so there are a few more steps involved to arrive at the final width:
  - In `setOutputDivWidth()`, the `slideValue` is multiplied by `100` to generate a number in the right order of magnitude to act as a mock viewport width(vw)
  - For the functionality of this website, I need to use an `outputDiv` width in actual px. In`convertVwToPx()` the width of the `body` acts as the viewport on which a proportional px is based
  - This proportional value is returned to `setOutputDivWidth()` where it sets the width of the `outputDiv`, but is also saved in local storage for use in `fitText`

##### Resizing the font

- The difference between the two elements is calculated in `fitText()` and based on this value `currFontSize` is recalculated
- An upper font limit has been set at 50px and a lower limit at 10px
- The font `currFontSize` resizing is triggered whenever the `difference` can be calculated (ie a change in width for either element), making it possible to also let `currFontSize` adjust on resizing of the window

##### Values persisting after reload

- To persist after reload the `slideValue` and `input` were saved however, to display the two correctly I also saved `fontSize` and `outputDivWidth`
- As multiple values are stored in local storage, I also added functionality to clear the local storage as well

#### Design

- To me, it made sense to split the website into two steps for a user:
  1.  Type your input
  2.  See your input and play with the width
- Although the brief asked for one `<form>` with two `<input>`, I chose to position the slider together with the`outputDiv` as that is the element that changes on user input
- Borrowing from the user case given in the brief (below), I chose to make the `outputDiv` look like a button

###### Typical use case:

> This solution would be used when you have a button with width/height restrictions set by designer, but the text length can be different depending on the language of the text.

- The website can also be navigated using the keyboard

---

### :zap: In short...

_Build a website:_

- [x] Stick it on GitHub and provide a link
- [x] Make it easy to test the result

_Add two types of `<input>`:_

- [x] A `<form>` with two types of `<input>`: `<input type="text">` and `<input type="range">`
- [x] The values of the two `<input>` should persist on page reload

_The site must have an `outputDiv`:_

- [x] It must have `border: solid 1px` and `height: 50px`
- [x] It should display the text from the`<input type="text">` and should update as the text changes
- [x] The width of `outputDiv` should be controlled by the `<input type="range">`

_The codebase:_

- [x] The solution should be something similar to `fitText(‘ element selector ’)`
