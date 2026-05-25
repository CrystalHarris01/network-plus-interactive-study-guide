const flashcards = [
  {
    question: 'What does DHCP do?',
    answer: 'DHCP automatically assigns IP addresses and network settings to devices.'
  },
  {
    question: 'What port does HTTPS use?',
    answer: 'HTTPS uses TCP port 443.'
  },
  {
    question: 'What does DNS do?',
    answer: 'DNS translates domain names into IP addresses.'
  },
  {
    question: 'What is the OSI model?',
    answer: 'A conceptual networking model with 7 layers used to standardize communication functions.'
  },
  {
    question: 'What command checks connectivity?',
    answer: 'The ping command tests network connectivity to another host.'
  }
];

let flashIndex = 0;

const flashcard = document.getElementById('flashcard');
const flashQuestion = document.getElementById('flashQuestion');
const flashAnswer = document.getElementById('flashAnswer');

flashcard.addEventListener('click', () => {
  flashAnswer.classList.toggle('hidden');
  addXP(5);
});

function nextFlashcard() {
  flashIndex = (flashIndex + 1) % flashcards.length;

  flashQuestion.textContent = flashcards[flashIndex].question;
  flashAnswer.textContent = flashcards[flashIndex].answer;
  flashAnswer.classList.add('hidden');
}

const quizData = [
  {
    question: 'Which port is used for HTTPS?',
    answers: ['53', '443', '22', '3389'],
    correct: '443'
  },
  {
    question: 'What protocol translates domain names to IP addresses?',
    answers: ['FTP', 'DNS', 'DHCP', 'SMTP'],
    correct: 'DNS'
  },
  {
    question: 'Which command displays IP information on Linux?',
    answers: ['ping', 'ip addr', 'chmod', 'grep'],
    correct: 'ip addr'
  },
  {
    question: 'What port does SSH use?',
    answers: ['22', '25', '80', '110'],
    correct: '22'
  },
  {
    question: 'Which device forwards traffic between networks?',
    answers: ['Switch', 'Hub', 'Router', 'Patch Panel'],
    correct: 'Router'
  }
];

let currentQuestion = 0;
let score = 0;
let streak = 0;
let xp = 0;

const questionElement = document.getElementById('quizQuestion');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const questionCount = document.getElementById('questionCount');

function loadQuestion() {
  const current = quizData[currentQuestion];

  questionElement.textContent = current.question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  answersElement.innerHTML = '';
  feedbackElement.textContent = '';

  current.answers.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('answer-btn');
    button.textContent = answer;

    button.addEventListener('click', () => checkAnswer(button, answer));

    answersElement.appendChild(button);
  });
}

function checkAnswer(button, answer) {
  const current = quizData[currentQuestion];
  const allButtons = document.querySelectorAll('.answer-btn');

  allButtons.forEach(btn => btn.disabled = true);

  if (answer === current.correct) {
    button.classList.add('correct');
    feedbackElement.textContent = 'Correct!';
    score++;
    streak++;
    addXP(20);
  } else {
    button.classList.add('wrong');
    feedbackElement.textContent = `Incorrect. Correct answer: ${current.correct}`;
    streak = 0;
  }

  scoreElement.textContent = `Score: ${score}`;
  document.getElementById('streak').textContent = streak;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= quizData.length) {
    currentQuestion = 0;
  }

  loadQuestion();
}

function addXP(amount) {
  xp += amount;
  document.getElementById('xp').textContent = xp;

  const mastery = Math.min(Math.floor((xp / 200) * 100), 100);
  document.getElementById('mastery').textContent = `${mastery}%`;
}

loadQuestion();
