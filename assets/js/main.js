import { api_key } from "../../config";

var url =
  "https://newsapi.org/v2/everything?" +
  "q=Samsung&" +
  "from=2023-01-16&" +
  "sortBy=popularity&" +
  "apiKey=97e29d4302af4f009566d77739fd9f0a";

var req = new Request(url);

fetch(req).then(function (response) {
  console.log(response.json());
});
