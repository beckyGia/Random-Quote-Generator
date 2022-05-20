const quoteText = document.querySelector(".quote");
const newQuoteButton = document.querySelector(".new-quote-button");
const twitterBtn = document.querySelector(".twitter");
const copyBtn = document.querySelector(".copy");
const popup = document.querySelector(".popup");
const speechBtn = document.querySelector(".sound");
synth = speechSynthesis;
const darkMode = document.querySelector("#dark");
const lightMode = document.querySelector("#light");

newQuoteButton.addEventListener("click", getQuote);

const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

async function getQuote() {
  newQuoteButton.classList.add("loading");
  newQuoteButton.innerText = "Loading Quote...";
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    displayQuote(json.message);
    newQuoteButton.innerText = "New Quote";
    newQuoteButton.classList.remove("loading");
  } catch (err) {
    console.log(err);
    alert("Failed to fetch new quote");
  }
}
getQuote();

speechBtn.addEventListener("click", speak);

function speak() {
  // the SpeechSynthesisUtterance is a web speech api that represents a speech request
  let utterance = new SpeechSynthesisUtterance(`${quoteText.textContent}`);
  speechSynthesis.speak(utterance); //speak method of speechSynthesis speaks the utterance
  document.querySelector(".sound").style.cursor = "not-allowed";
}

copyBtn.addEventListener("click", () => {
  //copying the quote text on copyBtn click
  // writeText() property writes the specified text string to the system clipboard
  navigator.clipboard.writeText(quoteText.textContent);
  popup.classList.add("active");
  // copyToClipBoard();
});

// function copyToClipBoard() {
//   const textarea = document.createElement("textarea");
//   textarea.setAttribute("readonly", "");
//   textarea.value = text.innerText;
//   textarea.style.position = "absolute";
//   document.body.appendChild(textarea);
//   textarea.select();
//   document.execCommand("copy");
//   document.body.removeChild(textarea);
// }

twitterBtn.addEventListener("click", () => {
  let tweetURL = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetURL, "_blank"); //opening a new twitter tab with passing quote in the url
});

function displayQuote(quote) {
  quoteText.textContent = quote;
}

darkMode.addEventListener("click", () => {
  document.body.classList.add("dark-mode");
  document.querySelector(".light-hidden").style.display = "initial";
  document.querySelector(".dark-hidden").style.display = "none";
});

lightMode.addEventListener("click", () => {
  document.body.classList.remove("dark-mode");
  document.querySelector(".light-hidden").style.display = "none";
  document.querySelector(".dark-hidden").style.display = "initial";
});
