const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const homeButton = document.getElementById('home-btn')
const returnButton = document.getElementById('return-btn')
const finishButton = document.getElementById('finish-btn')
const playButton = document.getElementById('play-btn')

const A1Button = document.getElementById('a1-btn')
const playA1_aButton = document.getElementById('a1a-btn')
const playA1_bButton = document.getElementById('a1b-btn')
const playA1_cButton = document.getElementById('a1c-btn')
const playA2Button = document.getElementById('a2-btn')
const playB1Button = document.getElementById('b1-btn')
const playB2Button = document.getElementById('b2-btn')

const itemsList = document.getElementById('items-list')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const mainMenu = document.getElementById('main-menu')
const selectMenu = document.getElementById('select-menu')
const mainMenuButton = document.getElementById('mainMenu-btn')

let shuffledQuestions, currentQuestionIndex, coingain
let coins = 0;
document.getElementById('right-answers').innerHTML = coins;

/////////////////////// Cheat Button Codes ///////////////////////////
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
/////////////////////// Cheat Button Codes ///////////////////////////

//////////////////////  Prize Menu Codes  ///////////////////////////
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
//////////////////////  Prize Menu Codes  ///////////////////////////

playButton.addEventListener('click', play)
A1Button.addEventListener('click', A1ButtonClick)
playA1_aButton.addEventListener('click', playA1_a)
playA1_bButton.addEventListener('click', playA1_b)
playA1_cButton.addEventListener('click', playA1_c)
playA2Button.addEventListener('click', playA2)
playB1Button.addEventListener('click', playB1)
playB2Button.addEventListener('click', playB2)


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

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  finishButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
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
    "You have completed all the questions!"
    finishButton.classList.remove('hide')
  }
  if (selectedButton.dataset = correct) {
    coins=coins + coingain;
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
  A1Button.classList.remove('hide')
  playA2Button.classList.remove('hide')
  playB1Button.classList.remove('hide')
  playB2Button.classList.remove('hide')
  mainMenuButton.classList.remove('hide')
  clearStatusClass(document.body)
  startButton.innerText = 'Start'
}

function play() {
  mainMenu.classList.add('hide')
  selectMenu.classList.remove('hide')
}

function homePage() {
  playButton.classList.add('hide')
  homeButton.classList.add('hide')
  returnButton.classList.remove('hide')
  itemsList.classList.remove('hide')
  clearStatusClass(document.body)
}

function returnMenu() {
  playButton.classList.remove('hide')
  homeButton.classList.remove('hide')
  returnButton.classList.add('hide')
  itemsList.classList.add('hide')
  clearStatusClass(document.body)
}

function returnMainMenu() {
  selectMenu.classList.add('hide')
  mainMenu.classList.remove('hide')
}

function A1ButtonClick() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  playA1_aButton.classList.remove('hide')
  playA1_bButton.classList.remove('hide')
  playA1_cButton.classList.remove('hide')


}

function playA1_a() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  playA1_aButton.classList.add('hide')
  playA1_bButton.classList.add('hide')
  playA1_cButton.classList.add('hide')
  shuffledQuestions = questions_A1_a.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  coingain = 1
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function playA1_b() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  playA1_aButton.classList.add('hide')
  playA1_bButton.classList.add('hide')
  playA1_cButton.classList.add('hide')
  shuffledQuestions = questions_A1_a.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  coingain = 1
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function playA1_c() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  playA1_aButton.classList.add('hide')
  playA1_bButton.classList.add('hide')
  playA1_cButton.classList.add('hide')
  shuffledQuestions = questions_A1_a.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  coingain = 1
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function playA2() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  shuffledQuestions = questions_A2.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  coingain = 3
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function playB1() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  shuffledQuestions = questions_B1.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  coingain = 5
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function playB2() {
  A1Button.classList.add('hide')
  playA2Button.classList.add('hide')
  playB1Button.classList.add('hide')
  playB2Button.classList.add('hide')
  mainMenuButton.classList.add('hide')
  shuffledQuestions = questions_B2.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  coingain = 10
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

const questions_A1_a = [
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
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
]

const questions_A2 = [
  {
    question: 'ability',
    answers: [
      { text: 'beceri', correct: true },
      { text: 'kurnazlık', correct: false }
    ]
  },
  {
  question: 'back',
  answers: [
    { text: 'sabit', correct: false },
    { text: 'geri', correct: true }
  ]
  },
  {
    question: 'camp',
    answers: [
      { text: 'kamp', correct: true },
      { text: 'kanyon', correct: false }
    ]
  },
  {
  question: 'daily',
  answers: [
    { text: 'özgür', correct: false },
    { text: 'günlük', correct: true }
  ]
  },
  {
    question: 'able',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'abroad',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'accept',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'accident',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'achieve',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'act',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'active',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'actually',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'adult',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'advantage',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'adventure',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'advertise',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'advertisement',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'advertising',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'affect',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'after',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'against',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'airline',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'alive',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'all',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'allow',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'almost',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'alone',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'along',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'already',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'alternative',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'although',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'among',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'amount',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'ancient',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'ankle',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'any',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'anybody',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'anyway',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'anywhere',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'app',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'appear',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'appearance',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'apply',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'architect',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'architecture',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'argue',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'argument',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'army',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'arrange',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'arrangement',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'asleep',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'assistant',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'athlete',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'attack',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'attend',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'attention',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'attractive',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'audience',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'author',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'available',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'average',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'avoid',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'award',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'awful',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'back',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'background',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'badly',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'based',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'bean',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'bear',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'beat',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'beef',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'before',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'behave',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'behaviour',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'belong',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'belt',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'benefit',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'best',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'better',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'between',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'billion',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'bin',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'biology',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'birth',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'biscuit',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'bit',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'blank',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'blood',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'blow',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'board',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'boil',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'bone',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'book',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'borrow',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'boss',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'bottom',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'bowl',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'brain',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'bridge',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'bright',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'brilliant',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'broken',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'brush',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'burn',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'businessman',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: 'button',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: 'camp',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true }
    ]
  },
]

const questions_B1 = [
  {
    question: 'test1',
    answers: [
      { text: 'a', correct: false },
      { text: 'b', correct: true }
    ]
  },
  {
  question: 'test2',
  answers: [
    { text: 'a', correct: false },
    { text: 'b', correct: true }
  ]
  },
  {
    question: 'test3',
    answers: [
      { text: 'a', correct: false },
      { text: 'b', correct: true }
    ]
  },
]

const questions_B2 = [
  {
    question: 'ability',
    answers: [
      { text: 'beceri', correct: true },
      { text: 'kurnazlık', correct: false }
    ]
  },
  {
  question: 'back',
  answers: [
    { text: 'sabit', correct: false },
    { text: 'geri', correct: true }
  ]
  },
  {
    question: 'camp',
    answers: [
      { text: 'kamp', correct: true },
      { text: 'kanyon', correct: false }
    ]
  },
  {
  question: 'daily',
  answers: [
    { text: 'özgür', correct: false },
    { text: 'günlük', correct: true }
  ]
  },
]
