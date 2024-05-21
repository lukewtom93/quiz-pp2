const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons= document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const resultDiv = document.getElementById('result');

let shuffleQuestions, currentQuestionIndex, score;

const questions = [
    {
      question: "What is the largest island in the world?",
      answers: [
        { text: "Greenland", correct: true },
        { text: "Great Britan", correct: false },
        { text: "Borneo", correct: false },
        { text: "New Zealand", correct: false },
      ],
    },
    {
      question: "What is the largest bird of prey in the world?",
      answers: [
        { text: "Andean Condor", correct: true },
        { text: "Harpy Eagle", correct: false },
        { text: "Bald Eagle", correct: false },
        { text: "Vulture", correct: false },
      ],
    },
    {
      question: "Which country are you visiting if you are in the Taj Mahal?",
      answers: [
        { text: "Malaysia", correct: false },
        { text: "China", correct: false },
        { text: "India", correct: true },
        { text: "Nepal", correct: false },
      ],
    },
    {
      question: "What are the primary colors?",
      answers: [
        { text: "Green, Red, Blue", correct: false },
        { text: "Blue, Yellow, Green", correct: false },
        { text: "Red, Yellow, Blue", correct: true },
        { text: "Red, Green, Blue", correct: false },
      ],
    },
  ];



starQuiz();


/**
 * Starts the quiz with a score of 0
 * and displays random question
 */
function starQuiz() {
    score = 0;
    questionContainer.style.display = 'flex';
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    nextButton.classList.remove('hide');
    restartButton.classList.add('hide')
    resultDiv.classList.add('hide')
    setNextQuestion();
}

/**
 * Gets next question
 */
function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}


function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = 'answer' + index;
        radio.name = 'answer';
        radio.value = index;
        
        const label = document.createElement('label');
        label.htmlFor = 'answer' + index;
        label.innerText = answer.text;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButtons.appendChild(inputGroup);
    })
}
  

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

nextButton.addEventListener("click", () => {
    const answerIndex = Array.from(
      answerButtons.querySelectorAll("input")
    ).findIndex((radio) => radio.checked);
    if (answerIndex !== -1) {
      if (shuffleQuestions[currentQuestionIndex].answers[answerIndex].correct) {
        score++;
      }
      currentQuestionIndex++;
      if (shuffleQuestions.length > currentQuestionIndex) {
        setNextQuestion();
      } else {
        endQuiz();
      }
    } else {
      alert("Please select an answer.");
    }
  });

  restartButton.addEventListener('click', starQuiz);

  function endQuiz() {
    questionContainer.style.display = 'none';
    nextButton.classList.add('hide');
    restartButton.classList.remove('hide');
    resultDiv.classList.remove('hide');
    resultDiv.innerText = `Your final score: ${score} / ${shuffleQuestions.length}`;

  }

  