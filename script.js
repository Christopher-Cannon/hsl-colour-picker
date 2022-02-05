const clipboardMessage = document.querySelector("#clipboard-message");
const colourPreview = document.querySelector("#colour-preview");
const colourForm = document.querySelector("#colour-picker-form");
const previousColours = document.querySelector("#previous-colours");
const rangeHue = document.querySelector("#range-hue");
const rangeSaturation = document.querySelector("#range-saturation");
const rangeLightness = document.querySelector("#range-lightness");
const numberHue = document.querySelector("#number-hue");
const numberSaturation = document.querySelector("#number-saturation");
const numberLightness = document.querySelector("#number-lightness");

const colours = [];

function getHSL() {
  return `hsl(${rangeHue.value}deg, ${rangeSaturation.value}%, ${rangeLightness.value}%)`
}

function storeColour() {
  colours.unshift({
    hue: rangeHue.value,
    saturation: rangeSaturation.value,
    lightness: rangeLightness.value,
    hsl: getHSL()
  });

  if (colours.length > 5) {
    colours.pop();
  }
}

function displayStoredColours() {
  previousColours.replaceChildren();

  for (const colour of colours) {
    const colourBlock = document.createElement("div");
    const colourText = document.createElement("div");

    colourBlock.classList = "colour-block";
    colourBlock.style.backgroundColor = colour.hsl;
    colourText.textContent = colour.hsl;

    if (colour.lightness < 50) {
      colourText.style.color = "white";
    }

    colourBlock.appendChild(colourText);
    previousColours.appendChild(colourBlock);
  }
}

function addPreviousColourEvents() {
  const colourBlock = document.querySelectorAll(".colour-block");

  for (const block of colourBlock) {
    block.addEventListener("click", () => {
      const hsl = block.childNodes[0];

      showClipboardModal(hsl.textContent);
    })
  }
}

function showClipboardModal(hsl) {
  navigator.clipboard.writeText(hsl);

  clipboardMessage.textContent = `Copied ${hsl} to clipboard`
  clipboardMessage.style.display = "block";

  setTimeout(() => {
    clipboardMessage.style.display = "none";
  }, 2500);
}

function updateColourPreview() {
  colourPreview.style.backgroundColor = getHSL();
}

function updateNumber(elem, value) {
  elem.textContent = value;
}

colourForm.addEventListener("submit", (e) => {
  e.preventDefault();

  storeColour();
  displayStoredColours();
  addPreviousColourEvents();
})

rangeHue.addEventListener("input", (e) => {
  updateNumber(numberHue, e.target.value);
  updateColourPreview();
});

rangeSaturation.addEventListener("input", (e) => {
  updateNumber(numberSaturation, e.target.value);
  updateColourPreview();
});

rangeLightness.addEventListener("input", (e) => {
  updateNumber(numberLightness, e.target.value);
  updateColourPreview();
});

updateColourPreview();