const home = document.getElementById("Home");
const quizz = document.getElementById("Quizz");
const htmlQuiz = document.getElementById("htmlQuiz");
const cssQuiz = document.getElementById("CssQuiz");
const jsQuiz = document.getElementById("JavaScriptQuiz");

const classname = "container d-flex justify-content-center mt-5";

function init() {
  home.className = classname;
  quizz.className = classname + " d-none";
  htmlQuiz.className = classname + " d-none";
  cssQuiz.className = classname + " d-none";
  jsQuiz.className = classname + " d-none";
}

window.onload = init();

function load(quiz) {
  init();
  home.className = classname + " d-none";
  quizz.className = classname;
  quiz.className = classname;
}

function loadQuiz(section) {
  switch (section) {
    case "html":
      load(htmlQuiz);
      break;
    case "css":
      load(cssQuiz);
      break;
    case "js":
      load(jsQuiz);
      break;
  }
}
