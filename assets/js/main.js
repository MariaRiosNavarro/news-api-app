import { api_key } from "/config.js";
import { countries } from "/assets/db/countries.js";
import { languages } from "/assets/db/languages.js";

const selectLanguage = document.querySelector('[data-js="select-language"]');
const selectCountry = document.querySelector('[data-js="select-country"]');
const selectType = document.querySelector('[data-js="select-type"]');

// create the options dynamically for language

languages.forEach((language) => {
  const optionLanguage = document.createElement("option");
  optionLanguage.value = language.language;
  optionLanguage.setAttribute("name", "languages");
  optionLanguage.textContent = language.language;
  language.language === "Deutsch"
    ? optionLanguage.setAttribute("selected", "selected")
    : "";
  selectLanguage.appendChild(optionLanguage);
  console.log(selectLanguage);
});

// create the options dynamically for country

countries.forEach((country) => {
  const optionCountry = document.createElement("option");
  optionCountry.value = country.country;
  optionCountry.setAttribute("name", "countries");
  optionCountry.textContent = country.country;
  country.country === "Germany"
    ? optionCountry.setAttribute("selected", "selected")
    : "";
  selectCountry.appendChild(optionCountry);

  console.log(selectCountry);
});

// var url =
//   "https://newsapi.org/v2/everything?" +
//   "q=Samsung&" +
//   "from=2023-01-16&" +
//   "sortBy=popularity&" +
//   `apiKey=${api_key}`;

// var req = new Request(url);

// fetch(req).then(function (response) {
//   console.log(response.json());
// });
