// your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions (code below this line is already provided)
// -----------------------------------------------------------

// Handle option selection (event delegation)
questionsElement.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const questionIndex = e.target.name.split("-")[1];
    userAnswers[questionIndex] = e.target.value;

    // Save progress to sessionStorage
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// Handle submit
submitButton.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store score in localStorage
  localStorage.setItem("score", score);
});

// Load score from localStorage (if exists)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
