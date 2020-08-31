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
var timer;


// functions

var startTimer = function () {
  // reset quiz variables
  currentQuestion = 0;
  displayQuestion(currentQuestion);

  remainingTime = 75;
  document.getElementById("timer").innerHTML = remainingTime;

  // show quiz page
  document.body.className = "quiz";

  // start the timer
  timer = setInterval(function () {
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
  var clickedEl = event.target;
  if (clickedEl.tagName !== "BUTTON") {
    return;
  }

  var correctAnswerIndex = quizData[currentQuestion].a;
  var correctAnswerStr = quizData[currentQuestion].choices[correctAnswerIndex];

  var resultEl = document.querySelector(".last-result");

  if (clickedEl.innerHTML === correctAnswerStr) {
    resultEl.textContent = "Correct!"
  } else {
    remainingTime -= 10;
    document.getElementById("timer").innerHTML = remainingTime;
    resultEl.textContent = "Wrong!"
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion(currentQuestion);
  } else {
    endQuiz();
  }
};

var endQuiz = function () {
  clearInterval(timer);
  document.getElementById("score").innerHTML = remainingTime;
  document.body.className += " end";
  var quizSectionEl = document.getElementById("quiz-page");
  quizSectionEl.querySelector(".question").textContent = "All done!";
};


var showHighScores = function () {
  // if the timer is running, clear it
  if (!timer) {
    clearInterval(timer);
    remainingTime = 0;
    document.getElementById("timer").innerHTML = remainingTime;
  }

  // get the high scores ordered list element
  var highScoreListEl = document.querySelector(".high-scores");
  // clear any previous contents
  highScoreListEl.innerHTML = "";

  // get high scores from localStorage, if any
  var highScores = localStorage.getItem("highScores");
  if (!highScores) {
    // if there are no high scores in localStorage, reset to an empty string
    highScores = [];
  }

  // create the high scores list
  for (var i = 0; i < highScores.length; i++) {
    var scoreLiEl = document.createElement("li");
    scoreLiEl.textContent = highScores[i].initial + " - " + highScores[i].score;
  }

  // show the score page
  document.body.className = "scores";
};


var showHome = function () {
  document.body.className = "start";
};


var clearScores = function () {
  // clear high scores if the key exists, will do nothing if key does not exist
  localStorage.removeItem("highScores");

  // get the high scores ordered list element
  var highScoreListEl = document.querySelector(".high-scores");
  // clear any previous contents
  highScoreListEl.innerHTML = "";
}

// event handlers

document.getElementById("startBtn").addEventListener("click", startTimer);
document.querySelector("#quiz-page .choices").addEventListener("click", checkAnswer);
document.querySelector(".high-score-link a").addEventListener("click", showHighScores);
document.getElementById("back-to-start").addEventListener("click", showHome);
document.getElementById("clear-scores").addEventListener("click", clearScores);
