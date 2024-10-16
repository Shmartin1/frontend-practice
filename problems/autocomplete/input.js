import { getElementFromHtml } from "./utils.js";

export class Input {
  constructor(searchFunction) {
    const inputHtml = `<div class="input__suggestion"><input type="text" id="search-input" placeholder="Search here" autocomplete="on" /><span id="autocomplete-suggestion"></span></div>`;
    this.inputElement = getElementFromHtml(inputHtml);
    this.handleInputChange();
    this.searchWithDelay = searchFunction;
  }

  handleInputChange() {
    this.inputElement.addEventListener("input", (e) => {
      const value = e.target.value;
      this.searchWithDelay(value);
    });
  }
}