import { Autocomplete } from './Autocomplete.js';
import { countries } from './data.js';

window.onload = () => {
    const inputElement = document.getElementById("autocomplete-input");
    const listElement = document.getElementById("autocomplete-list");
    new Autocomplete(inputElement, listElement, countries);
};