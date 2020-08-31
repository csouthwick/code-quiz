var quizData = [{
  q: "Commonly used data types DO NOT include:",
  a: 2,
  choices: ["strings", "booleans", "alerts", "numbers"]
}, {
  q: "The condition in an if / else statement is enclosed with _______.",
  a: 2,
  choices: ["quotes", "curly brackets", "parenthesis", "square brackets"]
}, {
  q: "Arrays in JavaScript can be used to store _______.",
  a: 3,
  choices: ["numbers and strings", "other arrays", "booleans", "all of the above"]
}, {
  q: "String values must be enclosed within _______ when being assigned to variables.",
  a: 2,
  choices: ["commas", "curly brackets", "quotes", "parenthesis"]
}, {
  q: "A very useful tool used during development and debugging for printing content to the debugger is:",
  a: 3,
  choices: ["JavaScript", "terminal / bash", "for loops", "console.log"]
}];

var remainingTime = 0;
var currentQuestion = 0;


// functions

var startTimer = function () {
  displayQuestion(0);
  document.querySelector("main").className = "quiz";
  remainingTime = 75;
  document.getElementById("timer").innerHTML = remainingTime;

  var timer = setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      document.getElementById("timer").innerHTML = remainingTime;
    } else {
      document.getElementById("timer").innerHTML = 0;
      clearInterval(timer);
    }
  }, 1000);
};


var displayQuestion = function (questionIndex) {
  var question = quizData[questionIndex];
  var quizSectionEl = document.getElementById("quiz-page");

  // display the next question
  var questionEl = quizSectionEl.querySelector(".question");
  questionEl.textContent = question.q;
  questionEl.setAttribute("data-question-index", questionIndex.toString());

  // clear previous answers
  var choicesEl = quizSectionEl.querySelector(".choices");
  choicesEl.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var answerBtn = document.createElement("button");
    answerBtn.textContent = (i + 1) + ". " + question.choices[i];
    choicesEl.appendChild(answerBtn);
  }
};


// event handlers

document.getElementById("startBtn").addEventListener("click", startTimer);
