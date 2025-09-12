const home = document.getElementById("Home");
const quizz = document.getElementById("Quizz");
const htmlQuiz = document.getElementById("htmlQuiz");
const cssQuiz = document.getElementById("CssQuiz");
const jsQuiz = document.getElementById("JavaScriptQuiz");
const result = document.getElementById("result-card");
const htmlSubmitButton = document.getElementById("htmlSubmit");
const cssSubmitButton = document.getElementById("cssSubmit");
const jsSubmitButton = document.getElementById("jsSubmit");

const classname = "container d-flex justify-content-center my-5";

function loadSection(section) {
  const allSections = [home, quizz, htmlQuiz, cssQuiz, jsQuiz, result];

  // Slide out current sections
  allSections.forEach((sec) => {
    if (!sec.classList.contains("d-none")) {
      sec.style.transition =
        "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
      sec.style.transform = "translateX(-100%)";
      sec.style.opacity = "0";
    }
  });

  setTimeout(() => {
    home.className = classname + " d-none";
    quizz.className = classname + " d-none";
    htmlQuiz.className = classname + " d-none";
    cssQuiz.className = classname + " d-none";
    jsQuiz.className = classname + " d-none";
    result.className = classname + " d-none";

    let targetSections = [];
    switch (section) {
      case "home":
        home.className = classname;
        targetSections = [home];
        break;
      case "result":
        result.className = classname;
        targetSections = [result];
        break;
      case "html":
        quizz.className = classname;
        htmlQuiz.className = classname;
        targetSections = [quizz, htmlQuiz];
        break;
      case "css":
        quizz.className = classname;
        cssQuiz.className = classname;
        targetSections = [quizz, cssQuiz];
        break;
      case "js":
        quizz.className = classname;
        jsQuiz.className = classname;
        targetSections = [quizz, jsQuiz];
        break;
      default:
        console.log("Section not valid");
        return;
    }

    targetSections.forEach((sec, index) => {
      sec.style.transform = "translateX(100%)";
      sec.style.opacity = "0";
      sec.style.transition =
        "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease";

      setTimeout(() => {
        sec.style.transform = "translateX(0)";
        sec.style.opacity = "1";
      }, index * 150);
    });
  }, 300);
}

function init() {
  loadSection("home");
}

window.onload = init;

const numOfQuestions = 15;
const htmlAns = [
  "d",
  "b",
  "a",
  "d",
  "c",
  "a",
  "b",
  "d",
  "a",
  "b",
  "c",
  "b",
  "a",
  "b",
  "a",
];
const jsAns = [
  "a",
  "a",
  "b",
  "d",
  "b",
  "a",
  "b",
  "a",
  "d",
  "d",
  "b",
  "b",
  "b",
  "c",
  "a",
];
const cssAns = [
  "d",
  "d",
  "c",
  "c",
  "d",
  "b",
  "d",
  "b",
  "a",
  "c",
  "b",
  "d",
  "a",
  "c",
  "b",
];

function animateResult(scored, total = 15, duration = 1500) {
  const scoreEl = document.getElementById("score");
  const totalEl = document.getElementById("total");
  const progressCircle = document.querySelector(".progress");

  totalEl.textContent = total;

  let percentage = (scored / total) * 100;
  let circumference = 2 * Math.PI * 65; // r=65
  let targetOffset = circumference - (percentage / 100) * circumference;

  progressCircle.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
  progressCircle.style.strokeDashoffset = targetOffset;

  let start = 0;
  let stepTime = Math.abs(Math.floor(duration / scored));
  let counter = setInterval(() => {
    if (start < scored) {
      start++;
      scoreEl.textContent = start;
    } else {
      clearInterval(counter);
    }
  }, stepTime);
}

function evaluate(name, AnsArray) {
  let score = 0;
  for (let i = 1; i <= numOfQuestions; i++) {
    const qName = name + i;
    const choices = document.getElementsByName(qName);
    if (!choices || choices.length === 0) continue;
    let selected = null;
    for (let c = 0; c < choices.length; c++) {
      if (choices[c].checked) {
        selected = choices[c].value;
        break;
      }
    }
    if (selected === AnsArray[i - 1]) score++;
  }
  loadSection("result");
  animateResult(score);
}

htmlSubmitButton.onclick = function () {
  evaluate("html", htmlAns);
};
cssSubmitButton.onclick = function () {
  evaluate("css", cssAns);
};
jsSubmitButton.onclick = function () {
  evaluate("js", jsAns);
};
