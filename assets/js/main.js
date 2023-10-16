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
const output = document.querySelector('[data-js="output"]');
const restart = document.querySelector('[data-js="restart"]');

restart.addEventListener("click", () => {
  window.location.reload();
});

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

let noimage = "/assets/img/noimage.png";
let nodescription =
  "There is no more information available here, if you want to know more click on the button below";

// Eventlistener for each buttons

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
  //--Adress
  let urlEverything =
    `https://newsapi.org/v2/everything?` +
    `q=${query}&` +
    `language=${languageCode}&` +
    `sortBy=${type}&` +
    `pageSize=21&` +
    `apiKey=${api_key}`;
  //--fetch
  fetch(urlEverything)
    .then((response) => response.json())
    .then((everything) => {
      console.log(everything);
      let everythingData = everything.articles;

      everythingData.forEach((info) => {
        const card = document.createElement("article");
        card.classList.add("card");
        const goTo = () => {
          //   window.open(info.url);
        };
        card.innerHTML = `<h3 class="card-title">${info.title}</h3>
          <p class="card-description">${
            info.description ? info.description : nodescription
          }</p>
          <div class="img-wrapper">
          <img src=${
            info.urlToImage ? info.urlToImage : noimage
          } alt="" class="card-image" target="_blank"/></div>
          <button class="card-button" onclick="${goTo()}">to the article</button>`;
        output.appendChild(card);
        inputQueryEverything.value = "";
        inputQueryEverything.focus();
      });
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
    .then((headlines) => {
      console.log(headlines);
      let headlinesData = headlines.articles;

      headlinesData.forEach((info) => {
        const card = document.createElement("article");
        card.classList.add("card");
        const goTo = () => {
          //   window.open(info.url);
        };
        card.innerHTML = `
              <h3 class="card-title">${info.title}</h3>
              <p class="card-description">${
                info.description ? info.description : nodescription
              }</p>
              <div class="img-wrapper">
                <img src="${
                  info.urlToImage ? info.urlToImage : noimage
                }" alt="" class="card-image" target="_blank" />
              </div>
              <button class="card-button" onclick="goTo()">to the article</button>
            `;

        output.appendChild(card);
        inputQueryHeadlines.value = "";
        inputQueryHeadlines.focus();
      });
    })
    .catch((error) => {
      console.error("Error Message", error);
    });
});
