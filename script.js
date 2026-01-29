// REQUIRED globals (must exist before renderQuestions runs)
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Restore progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Save answer using event delegation
questionsElement.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const index = e.target.name.split("-")[1];
    userAnswers[index] = e.target.value;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// Submit handler
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Restore score on refresh
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
