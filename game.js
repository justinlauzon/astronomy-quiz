const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const container = document.querySelector('body');
const actualContainer = document.querySelector('.container');
const game = document.querySelector('#game');
const showTab = document.querySelector('#show-tab');
const gameTabIcon = document.querySelector('#show__icon')
const info = document.querySelector('.info')






actualContainer.addEventListener('click', function(e) {
    if(e.target !== this) {
        return;
    } 
    else {
        game.classList.toggle('move-left');
        game.classList.toggle('move-from-left');
        gameTabIcon.classList.toggle('fa-chevron-circle-right');
        gameTabIcon.classList.toggle('fa-chevron-circle-left');
    }
})


let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: 'Name the Nebula',
        bg: 'url(img/orion.jpg)',
        choice1: 'Mandible',
        choice2: 'Orion',
        choice3: 'Clear',
        choice4: 'Angel',
        answer: 2,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(https://upload.wikimedia.org/wikipedia/commons/b/b2/Boomerang_nebula.jpg)',
        choice1: 'Bowtie',
        choice2: 'Hourglass',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 4,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(https://images.unsplash.com/photo-1447433819943-74a20887a81e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1975&q=80)',
        choice1: 'Keyhole',
        choice2: 'Horsehead',
        choice3: 'The Great Bird',
        choice4: 'Paladin',
        answer: 1,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80)',
        choice1: 'Keyhole',
        choice2: 'Horsehead',
        choice3: 'The Great Bird',
        choice4: 'Paladin',
        answer: 1,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(https://upload.wikimedia.org/wikipedia/commons/b/b2/Hs-2009-25-e-full.jpg)',
        choice1: 'Westbrook',
        choice2: 'Carina',
        choice3: 'Omega',
        choice4: 'Horsehead',
        answer: 2,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/bubble.jpg)',
        choice1: 'Westbrook',
        choice2: 'Crab',
        choice3: 'Bubble',
        choice4: 'Horsehead',
        answer: 3,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/eagle-nebula_ae188e318ffa2043fc04017447a73985.jpg)',
        choice1: 'Eagle',
        choice2: 'Crab',
        choice3: 'Cat\'s Eye',
        choice4: 'Horsehead',
        answer: 1,
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/lagoon.jpg)',
        choice1: 'Lagoon',
        choice2: 'Crab',
        choice3: 'Cat\'s Eye',
        choice4: 'Horsehead',
        answer: 1,
    },
]

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


showTab.addEventListener('click', e => {
    game.classList.toggle('move-left');
    game.classList.toggle('move-from-left');
    
    setTimeout(() => {
        gameTabIcon.classList.toggle('fa-chevron-circle-right');
        gameTabIcon.classList.toggle('fa-chevron-circle-left');
    }, 200)
})


showTab.addEventListener('mouseover', e => {
    showTab.style.left = '0';
})

showTab.addEventListener('mouseleave', e => {
    setTimeout(() => {
        showTab.style.left = '-4rem';
    }, 1000)
})


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    container.style.backgroundImage = currentQuestion.bg

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswer = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 500)
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