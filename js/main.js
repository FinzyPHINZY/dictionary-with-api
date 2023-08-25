const word = document.querySelector("input").value.toLowerCase();
let outputBox = document.querySelector(".output-box");
const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
const sound = document.getElementById("sound");

document.querySelector("button").addEventListener("click", getMeaning);

const synth = window.speechSynthesis;

function getMeaning() {
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      document.querySelector("h3").innerText = data[0].word;

      document.getElementById("phonetic").innerText = data[0].phonetic;

      document.getElementById("pos").innerText =
        data[0].meanings[0].partOfSpeech;

      document.querySelector(".word-meaning").innerText =
        data[0].meanings[0].definitions[0].definition;

      console.log(data[0].meanings[0].definitions[0]);

      document.querySelector(".word-example").innerText =
        data[0].meanings[0].definitions[0].example;

      document.getElementById("speak").addEventListener("click", playSound);
      function playSound() {
        let yellThis = new SpeechSynthesisUtterance(data[0].word);

        synth.speak(yellThis);
      }
    })
    .catch((err) => {
      outputBox.innerHTML = `<h3>Word could not be found</h3>`;
      outputBox.style.marginTop = "80px";
    });
}

// document.getElementById("speak").addEventListener("click", playSound);
// function playSound() {
//   let yellThis = new SpeechSynthesisUtterance(data[0].word);

//   synth.speak(yellThis);
