const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const homeButton = document.getElementById('home-btn')
const returnButton = document.getElementById('return-btn')
const finishButton = document.getElementById('finish-btn')
const itemsList = document.getElementById('items-list')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const mainMenu = document.getElementById('main-menu')
const selectMenu = document.getElementById('select-menu')
const mainMenuButton = document.getElementById('mainMenu-btn')

let shuffledQuestions, currentQuestionIndex
let coins = 0;
document.getElementById('right-answers').innerHTML = coins;

// Cheat button codes
const coinsButton = document.getElementById('score-btn')
const cheatButton = document.getElementById('cheat-btn')
let coinsButtonClickCount = 0;
coinsButton.addEventListener('click', cheatButtonActivate)
cheatButton.addEventListener('click', cheatActivate)

function cheatButtonActivate() {
if(coinsButtonClickCount >= 4) {
  cheatButton.classList.remove('hide');
  coinsButtonClickCount = 0;
}
else {
  coinsButtonClickCount++;
}
}

function cheatActivate() {
  coins+=100000;
  cheatButton.classList.add('hide');
  document.getElementById('right-answers').innerHTML = coins;
}
// Cheat button codes

// Prize Menu codes
const bike = document.getElementById('bike')
const motorbike = document.getElementById('motorbike')
const car = document.getElementById('car')
const sportsCar = document.getElementById('sports-car')

let bikeToken = 0;
let motorbikeToken = 0;
let carToken = 0;
let sportsCarToken = 0;

bike.addEventListener('click', bikeBuy)
motorbike.addEventListener('click', motorbikeBuy)
car.addEventListener('click', carBuy)
sportsCar.addEventListener('click', sportsCarBuy)

function bikeBuy() {
  if(bikeToken == 0 & coins >= 10) {
  coins-=10;
  bikeToken = 1;
  bike.innerText = String.fromCodePoint(0x1F6B4) + ' ' + String.fromCodePoint(0x2705);
  document.getElementById('right-answers').innerHTML = coins;
  }
}

function motorbikeBuy() {
  if(motorbikeToken == 0 & coins >= 50) {
  coins-=50;
  motorbikeToken = 1;
  motorbike.innerText = String.fromCodePoint(0x1F3CD) + ' ' + String.fromCodePoint(0x2705);
  document.getElementById('right-answers').innerHTML = coins;
  }
}

function carBuy() {
  if(carToken == 0 & coins >= 100) {
  coins-=100;
  carToken = 1;
  car.innerText = String.fromCodePoint(0x1F697) + ' ' + String.fromCodePoint(0x2705);
  document.getElementById('right-answers').innerHTML = coins;
  }
}

function sportsCarBuy() {
  if(sportsCarToken == 0 & coins >= 1000) {
  coins-=1000;
  sportsCarToken = 1;
  sportsCar.innerText = String.fromCodePoint(0x1F3CE) + ' ' + String.fromCodePoint(0x2705);
  document.getElementById('right-answers').innerHTML = coins;
  }
}
// Prize menu codes


startButton.addEventListener('click', startGame)
finishButton.addEventListener('click', finishGame)
homeButton.addEventListener('click', homePage)
returnButton.addEventListener('click', returnMenu)
mainMenuButton.addEventListener('click', returnMainMenu)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  startButton.classList.add('hide')
  homeButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(questionsX) {
  questionElement.innerText = questionsX.question
  questionsX.answers.forEach(answer => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.innerText = answer.text
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  finishButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    finishButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  if (selectedButton.dataset = correct) {
    coins++;
 // +1, change it if you need +10, +25 etc
 }
 document.getElementById('right-answers').innerHTML = coins; // span will show the score
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function finishGame() {
  nextButton.classList.add('hide')
  questionContainerElement.classList.add('hide')
  finishButton.classList.add('hide')
  startButton.classList.remove('hide')
  homeButton.classList.remove('hide')
  clearStatusClass(document.body)
}

function homePage() {
  startButton.classList.add('hide')
  homeButton.classList.add('hide')
  returnButton.classList.remove('hide')
  itemsList.classList.remove('hide')
  clearStatusClass(document.body)
}
function returnMenu() {
  startButton.classList.remove('hide')
  homeButton.classList.remove('hide')
  returnButton.classList.add('hide')
  itemsList.classList.add('hide')
  clearStatusClass(document.body)
}

function returnMainMenu() {
  selectMenu.classList.add('hide')
  mainMenu.classList.remove('hide')
}

const questions = [
  {
    question: 'about',
    answers: [
      { text: 'sadık', correct: false },
      { text: 'hakkında', correct: true }
    ]
  },
  {
    question: 'add',
    answers: [
      { text: 'saymak', correct: false },
      { text: 'eklemek', correct: true }
    ]
  },
  {
    question: 'afternoon',
    answers: [
      { text: 'akşam', correct: false },
      { text: 'öğle', correct: true }
    ]
  },
  {
    question: 'again',
    answers: [
      { text: 'tekrar', correct: true },
      { text: 'yakın', correct: false }
    ]
  },
  {
    question: 'alien',
    answers: [
      { text: 'uzaylı', correct: true },
      { text: 'gökkuşağı', correct: false }
    ]
  },
  {
    question: 'alphabet',
    answers: [
      { text: 'abaküs', correct: false },
      { text: 'alfabe', correct: true }
    ]
  },
  {
    question: 'and',
    answers: [
      { text: 've', correct: true },
      { text: 'veya', correct: false }
    ]
  },
  {
    question: 'angry',
    answers: [
      { text: 'kızgın', correct: true },
      { text: 'hasta', correct: false }
    ]
  },
  {
    question: 'animal',
    answers: [
      { text: 'küçük', correct: false },
      { text: 'hayvan', correct: true }
    ]
  },
  {
    question: 'answer',
    answers: [
      { text: 'yanıtlamak', correct: true },
      { text: 'çağırmak', correct: false }
    ]
  },
  {
    question: 'apple',
    answers: [
      { text: 'elma', correct: true },
      { text: 'şeftali', correct: false }
    ]
  },
  {
    question: 'arm',
    answers: [
      { text: 'sandık', correct: false },
      { text: 'kol', correct: true }
    ]
  },
  {
    question: 'armchair',
    answers: [
      { text: 'çekyat', correct: false },
      { text: 'koltuk', correct: true }
    ]
  },
  {
    question: 'ask',
    answers: [
      { text: 'sormak', correct: true },
      { text: 'konuşmak', correct: false }
    ]
  },
  {
    question: 'baby',
    answers: [
      { text: 'havuç', correct: false },
      { text: 'bebek', correct: true }
    ]
  },
  {
    question: 'bag',
    answers: [
      { text: 'tahta', correct: false },
      { text: 'çanta', correct: true }
    ]
  },
  {
    question: 'ball',
    answers: [
      { text: 'sepet', correct: false },
      { text: 'top', correct: true }
    ]
  },
  {
    question: 'baloon',
    answers: [
      { text: 'balon', correct: true },
      { text: 'palyaço', correct: false }
    ]
  },
  {
    question: 'banana',
    answers: [
      { text: 'muz', correct: true },
      { text: 'ananas', correct: false }
    ]
  },
  {
    question: 'bath',
    answers: [
      { text: 'şelale', correct: false },
      { text: 'banyo', correct: true }
    ]
  },
  {
    question: 'beach',
    answers: [
      { text: 'orman', correct: false },
      { text: 'plaj', correct: true }
    ]
  },
  {
    question: 'bean',
    answers: [
      { text: 'fasülye', correct: true },
      { text: 'lamba', correct: false }
    ]
  },
  {
    question: 'bear',
    answers: [
      { text: 'aslan', correct: false },
      { text: 'ayı', correct: true }
    ]
  },
  {
    question: 'beautiful',
    answers: [
      { text: 'güzel', correct: true },
      { text: 'sakin', correct: false }
    ]
  },
  {
    question: 'bed',
    answers: [
      { text: 'kızgın', correct: false },
      { text: 'yatak', correct: true }
    ]
  },
  {
    question: 'bedroom',
    answers: [
      { text: 'yatak odası', correct: true },
      { text: 'oturma odası', correct: false }
    ]
  },
]
