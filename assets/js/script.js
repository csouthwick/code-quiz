var quizData = [{
  q: "Commonly used data types DO NOT include:",
  a: 2,
  choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"]
}, {
  q: "The condition in an if / else statement is enclosed with _______.",
  a: 2,
  choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"]
}, {
  q: "Arrays in JavaScript can be used to store _______.",
  a: 3,
  choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"]
}, {
  q: "String values must be enclosed within _______ when being assigned to variables.",
  a: 2,
  choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"]
}, {
  q: "A very useful tool used during development and debugging for printing content to the debugger is:",
  a: 3,
  choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"]
}];

var remainingTime = 0;
var currentQuestion = 0;


// functions

var startTimer = function () {
  // reset quiz variables
  currentQuestion = 0;
  displayQuestion(currentQuestion);

  remainingTime = 75;
  document.getElementById("timer").innerHTML = remainingTime;

  // show quiz page
  document.querySelector("main").className = "quiz";

  // start the timer
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

  // clear previous answer choices
  var choicesEl = quizSectionEl.querySelector(".choices");
  choicesEl.innerHTML = "";

  // display answer choices
  for (var i = 0; i < question.choices.length; i++) {
    var answerBtn = document.createElement("button");
    answerBtn.textContent = question.choices[i];
    choicesEl.appendChild(answerBtn);
  }
};


var checkAnswer = function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  var correctAnswerIndex = quizData[currentQuestion].a;
  var correctAnswerStr = quizData[currentQuestion].choices[correctAnswerIndex];

  var resultEl = document.querySelector(".last-result");

  if (event.target.innerHTML === correctAnswerStr) {
    resultEl.textContent = "Correct!"
  } else {
    remainingTime -= 10;
    resultEl.textContent = "Wrong!"
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion(currentQuestion);
  }
};


// event handlers

document.getElementById("startBtn").addEventListener("click", startTimer);
document.querySelector("#quiz-page .choices").addEventListener("click", checkAnswer);
