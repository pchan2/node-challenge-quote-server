// https://syllabus.codeyourfuture.io/node/week-1/lesson
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.send(quotes);
});


app.get("/quotes/random", function (request, response) {
  response.send(pickFromArray(quotes));
});

// search by a term

app.get("/quotes/search", function (request, response) {
  let termQuery = request.query.term;
  let quotesFound = quotes.filter(item => item.quote.toLowerCase().includes(termQuery));
  response.json(quotesFound);
})

// app.get("/quotes/search", function (req, res) {
//   let {term} = req.query;
//   const quotesFound = quotes.find(quote => quote.includes(term));
//   res.json(quotesFound);
// });

// ********** example with Rody starts **********
const quotes1 = {a: "hehehe", b: "ooooh", c: "aaah"}

app.get("/quotes/search", function (request, response) {

  const queryParams = request.query; // this represents the part that comes after the "?""
  const requestedQuote = queryParams.quote;
  const quote = quotes1[requestedQuote];
  // let life = request.query.search.includes("life");
  console.log(requestedQuote);
  response.send(quotes);
});

// ********** example with Rody ends **********
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
