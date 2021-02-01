const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const container = document.querySelector('body');
const actualContainer = document.querySelector('.container');
const game = document.querySelector('#game');
const info = document.querySelector('.info');
const infoBox = document.querySelector('.info-box');
const nextBtn = document.querySelector('.next-button');

info.addEventListener('mouseover', e => {
    infoBox.style.display = "block"
})

info.addEventListener('mouseout', e => {
    infoBox.style.display = "none";
})


actualContainer.addEventListener('click', function(e) {
    if(e.target !== this || screenLock) {
        return;
    } 
    else {
        game.classList.toggle('move-left');
        game.classList.toggle('move-from-left');
    }
})


let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let screenLock = false;


let questions = [
    {
        question: 'Name the Nebula',
        bg: 'url(../img/orion.jpg)',
        choice1: 'Mandible',
        choice2: 'Orion',
        choice3: 'Clear',
        choice4: 'Angel',
        answer: 2,
        info: "Orion"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/horsehead.jpg)',
        choice1: 'Bowtie',
        choice2: 'Horsehead',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 2,
        info: "Horsehead"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/boomerang.jpg)',
        choice1: 'Bowtie',
        choice2: 'Hourglass',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 4,
        info: "Boomerang"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/butterfly.jpg)',
        choice1: 'Bowtie',
        choice2: 'Hourglass',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 3,
        info: "Butterly"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/southerncrab.jpg)',
        choice1: 'Eastern Vortex',
        choice2: 'Northern Butterfly',
        choice3: 'Southern Crab',
        choice4: 'Western Bow',
        answer: 3,
        info: "Southern Crab"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/helix.jpg)',
        choice1: 'Omega',
        choice2: 'Helix',
        choice3: 'God\'s Eye',
        choice4: 'Iris',
        answer: 2,
        info: "Helix"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/cone.jpg)',
        choice1: 'Cone',
        choice2: 'Mountain',
        choice3: 'Worm',
        choice4: 'Pillar',
        answer: 1,
        info: "Cone"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/redspider.jpg)',
        choice1: 'Omega',
        choice2: 'Red Spider',
        choice3: 'Cavern',
        choice4: 'Paladin',
        answer: 2,
        info: "Red Spider"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/mysticmountain.jpg)',
        choice1: 'Carina',
        choice2: 'Dune',
        choice3: 'Angel',
        choice4: 'Mystic Mountain',
        answer: 4,
        info: "Mystic Mountain"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/carina.jpg)',
        choice1: 'Westbrook',
        choice2: 'Carina',
        choice3: 'Omega',
        choice4: 'Horsehead',
        answer: 2,
        info: "Carina"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/bubble.jpg)',
        choice1: 'Westbrook',
        choice2: 'Crab',
        choice3: 'Bubble',
        choice4: 'Horsehead',
        answer: 3,
        info: "Bubble"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/eagle-nebula_ae188e318ffa2043fc04017447a73985.jpg)',
        choice1: 'Eagle',
        choice2: 'Crab',
        choice3: 'Cat\'s Eye',
        choice4: 'Horsehead',
        answer: 1,
        info: "Eagle"
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/lagoon.jpg)',
        choice1: 'Lagoon',
        choice2: 'Crab',
        choice3: 'Cat\'s Eye',
        choice4: 'Horsehead',
        answer: 1,
        info: "To celebrate its 28th anniversary in space the NASA/ESA Hubble Space Telescope took this amazing and colourful image of the Lagoon Nebula. The whole nebula, about 4000 light-years away, is an incredible 55 light-years wide and 20 light-years tall. This image shows only a small part of this turbulent star-formation region, about four light-years across."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(../img/lagoon2.jpg)',
        choice1: 'Westbrook',
        choice2: 'Carina',
        choice3: 'Lagoon',
        choice4: 'Horsehead',
        answer: 3,
        info: "Lagoon"
    },
]

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

 
    if(questionCounter === (MAX_QUESTIONS -1)) {
        nextBtn.innerText = "Finish Quiz";
    }

    nextBtn.style.display ="none";
    screenLock = false;
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    container.style.backgroundImage = currentQuestion.bg
    infoBox.innerText = currentQuestion.info

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
        choice.parentElement.classList.remove('correct', 'incorrect');
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswer = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            nextBtn.style.display ="block";
            screenLock = true;
        }, 1000)
    })
})


incrementScore = num => {
    score +=num 
    scoreText.innerText = score
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }


startGame()