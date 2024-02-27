var timeLeft = document.querySelector(".time-left");
var quizContainer = document.getElementById("container");
var nextBtn = document.getElementById("next-button");
var countOfQuestion = document.querySelector(".number-of-question");
var displayContainer = document.getElementById("display-container");
var scoreContainer = document.querySelector(".score-container");
var restart = document.getElementById("restart");
var userScore = document.getElementById("user-score");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var questionCount;
var scoreCount = 0;
var count = 11;
var countdown;

//Questions

let quizArray = [
  {
    id: "0",
    question: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    correct: "Ottawa",
  },
  {
    id: "1",
    question: "Who wrote the novel 'Pride and Prejudice'?",
    options: ["Jane Austen", "Charles Dickens", "William Shakespeare", "F.Scott Fitzgerald"],
    correct: "Jane Austen",
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Ir", "In", "Io"],
    correct: "Fe",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: "Mars",
  },
  {
    question: "Who painted the famous artwork 'Starry Night'?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "CLaude Monet"],
    correct: "Vincent van Gogh",
  },
  {
    question: "What is the chemical formula for water?",
    options: ["H2O2", "CO2", "H2O", "HO"],
    correct: "H2O",
  },
  {
    question: "Who is credited with discovering penicillin?",
    options: ["Alexander Fleming", "Louis Pasteur", "Jonas Salk", "Marie Curie"],
    correct: "Alexander Fleming",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Arctic Ocean", "Indian Ocean"],
    correct: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for silver?",
    options: ["Si", "Ag", "Sv", "Sn"],
    correct: "Ag",
  },
  {
    question: "Who is the author of 'The Great Gatsby'?",
    options: ["F.Scott Fitzgerald", "Ernest Hemingway", "Mark Twain", "J.D. Salinger"],
    correct: "F.Scott Fitzgerald",
  },
];


//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

// Time Display
var timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
var quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};