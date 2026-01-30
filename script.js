const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// get saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.textContent = q.question;

    q.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // restore from sessionStorage
      if (userAnswers[i] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // 🔑 IMPORTANT
      }

      input.addEventListener("click", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));

        // remove checked attribute from siblings
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach((el) => el.removeAttribute("checked"));

        input.setAttribute("checked", "true"); // 🔑 IMPORTANT
      });

      div.appendChild(input);
      div.appendChild(document.createTextNode(choice));
    });

    questionsElement.appendChild(div);
  });
}

submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", String(score));
});

// restore score after refresh
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

renderQuestions();
