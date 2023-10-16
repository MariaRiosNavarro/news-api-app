import { api_key } from "/config.js";
import { countries } from "/assets/db/countries.js";
import { languages } from "/assets/db/languages.js";

const inputQueryEverything = document.querySelector('[data-js="query"]');
const inputQueryHeadlines = document.querySelector('[data-js="query2"]');
const selectLanguage = document.querySelector('[data-js="select-language"]');
const selectCountry = document.querySelector('[data-js="select-country"]');
const selectType = document.querySelector('[data-js="select-type"]');
const formEverything = document.querySelector('[data-js="form"]');
const formHeadlines = document.querySelector('[data-js="form2"]');

// create the options dynamically for language

languages.forEach((language) => {
  const optionLanguage = document.createElement("option");
  optionLanguage.value = language.language;
  optionLanguage.setAttribute("name", "languages");
  optionLanguage.textContent = language.language;
  if (language.language === "Deutsch") {
    optionLanguage.setAttribute("selected", "selected");
  }
  selectLanguage.appendChild(optionLanguage);
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
});

// work Variables

let query, query2, language, country, type;

// Eventlistener for euch buttons

formEverything.addEventListener("submit", () => {
  event.preventDefault();
  let queryValue = inputQueryEverything.value;
  query = queryValue.toLowerCase();
  language = selectLanguage.value;
  let languageCode;
  languages.filter((value) => {
    if (value.language === language) return (languageCode = value.code);
  });

  type = selectType.value;

  console.log(query, languageCode, type);

  let urlEverything =
    `https://newsapi.org/v2/everything?` +
    `q=${query}&` +
    `language=${languageCode}&` +
    `sortBy=${type}&` +
    `apiKey=${api_key}`;

  fetch(urlEverything)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error Message", error);
    });
});

formHeadlines.addEventListener("submit", () => {
  event.preventDefault();
  let query2Value = inputQueryHeadlines.value;
  query2 = query2Value.toLowerCase();
  country = selectCountry.value;
  console.log(query2, country, typeof query2);
  let countryCode;
  countries.filter((value) => {
    if (value.country === country) return (countryCode = value.code);
  });

  console.log(countryCode);

  //--Adress
  let urlHeadlines =
    `https://newsapi.org/v2/top-headlines?` +
    `q=${query2}&` +
    `country=${countryCode}&` +
    `apiKey=${api_key}`;

  console.log(urlHeadlines);

  //--fetch
  fetch(urlHeadlines)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error Message", error);
    });
});
