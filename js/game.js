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

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

info.addEventListener('mouseout', e => {
    infoBox.style.display = "none";
})

info.addEventListener('click', e => {
    if(infoBox.style.display === "none") {
        infoBox.style.display = "block"
    } else
        infoBox.style.display = "none"
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
        bg: 'url(img/orion.jpg)',
        choice1: 'Mandible',
        choice2: 'Orion',
        choice3: 'Clear',
        choice4: 'Angel',
        answer: 2,
        info: "This dramatic image offers a peek inside a cavern of roiling dust and gas where thousands of stars are forming. The image, taken by the Advanced Camera for Surveys (ACS) aboard NASA/ESA Hubble Space Telescope, represents the sharpest view ever taken of this region. More than 3,000 stars of various sizes appear in this image. Some of them have never been seen in visible light. These stars reside in a dramatic dust-and-gas landscape of plateaus, mountains, and valleys that are reminiscent of the Grand Canyon."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/horsehead.jpg)',
        choice1: 'Bowtie',
        choice2: 'Horsehead',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 2,
        info: "This nebula resides in the constellation of Orion (The Hunter). The image shows the region in infrared light, which has longer wavelengths than visible light and can pierce through the dusty material that usually obscures the nebula’s inner regions. The result is a rather ethereal and fragile-looking structure, made of delicate folds of gas — very different to the nebula’s appearance in visible light."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/boomerang.jpg)',
        choice1: 'Bowtie',
        choice2: 'Hourglass',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 4,
        info: "This reflecting cloud of dust and gas has two nearly symmetric lobes of matter that are being ejected from a central star. Each lobe of the nebula is nearly one light-year in length, making the total length of the nebula half as long as the distance from our Sun to our nearest neighbors - the alpha Centauri stellar system, located roughly 4 light-years away."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/butterfly.jpg)',
        choice1: 'Bowtie',
        choice2: 'Hourglass',
        choice3: 'Butterfly',
        choice4: 'Boomerang',
        answer: 3,
        info: "This image from the NASA/ESA Hubble Space Telescope depicts NGC 6302. NGC 6302 lies within our Milky Way galaxy, roughly 3800 light-years away in the constellation of Scorpius. The glowing gas was once the star's outer layers, but has been expelled over about 2200 years. Its beautiful shape stretches for more than two light-years, which is about half the distance from the Sun to the nearest star, Proxima Centauri."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/southerncrab.jpg)',
        choice1: 'Eastern Vortex',
        choice2: 'Northern Butterfly',
        choice3: 'Southern Crab',
        choice4: 'Western Bow',
        answer: 3,
        info: "A tempestuous relationship between an unlikely pair of stars may have created an oddly shaped, gaseous nebula that resembles an hourglass nestled within an hourglass. The possible creators of these shapes cannot be seen at all in this Wide Field and Planetary Camera 2image. It's a pair of aging stars buried in the glow of the tiny, central nebula."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/helix.jpg)',
        choice1: 'Omega',
        choice2: 'Helix',
        choice3: 'God\'s Eye',
        choice4: 'Ring',
        answer: 2,
        info: "This is a planetary nebula, the glowing gaseous envelope expelled by a dying, sun-like star. It resembles a simple doughnut as seen from Earth. But looks can be deceiving. New evidence suggests that this nebula consists of two gaseous disks nearly perpendicular to each other."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/ring.jpg)',
        choice1: 'Omega',
        choice2: 'Helix',
        choice3: 'God\'s Eye',
        choice4: 'Ring',
        answer: 4,
        info: "From Earth’s perspective, the nebula looks like a simple elliptical shape with a shaggy boundary. However, new observations combining existing ground-based data with new NASA/ESA Hubble Space Telescope data show that the nebula is shaped like a distorted doughnut. This doughnut has a rugby-ball-shaped region of lower-density material slotted into in its central “gap”, stretching towards and away from us."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/cone.jpg)',
        choice1: 'Cone',
        choice2: 'Mountain',
        choice3: 'Worm',
        choice4: 'Pillar',
        answer: 1,
        info: "Resembling a nightmarish beast rearing its head from a crimson sea, this celestial object is actually just a pillar of gas and dust. This picture, taken by the newly installed Advanced Camera for Surveys (ACS) aboard the NASA/ESA Hubble Space Telescope, shows the upper 2.5 light-years of the nebula, a height that equals 23 million roundtrips to the Moon. The entire pillar is seven light-years long."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/redspider.jpg)',
        choice1: 'Omega',
        choice2: 'Red Spider',
        choice3: 'Cavern',
        choice4: 'Paladin',
        answer: 2,
        info: "Huge waves are sculpted in this two-lobed nebula some 3000 light-years away in the constellation of Sagittarius. This warm planetary nebula harbours one of the hottest stars known and its powerful stellar winds generate waves 100 billion kilometres high. The waves are caused by supersonic shocks, formed when the local gas is compressed and heated in front of the rapidly expanding lobes. The atoms caught in the shock emit the spectacular radiation seen in this image."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/mysticmountain.jpg)',
        choice1: 'Carina',
        choice2: 'Dune',
        choice3: 'Angel',
        choice4: 'Mystic Mountain',
        answer: 4,
        info: "The NASA/ESA Hubble Space Telescope image, which is even more dramatic than fiction, captures the chaotic activity atop a pillar of gas and dust, three light-years tall, which is being eaten away by the brilliant light from nearby bright stars. The pillar is also being assaulted from within, as infant stars buried inside it fire off jets of gas that can be seen streaming from towering peaks."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/carina.jpg)',
        choice1: 'Westbrook',
        choice2: 'Carina',
        choice3: 'Omega',
        choice4: 'Horsehead',
        answer: 2,
        info: "This region, about 8000 light-years from Earth, is located adjacent to the famous explosive variable star Eta Carinae, which lies just outside the field of view toward the upper right. The nebula that surrounds this one also contains several other stars that are among the hottest and most massive known, each about 10 times as hot, and 100 times as massive, as our Sun."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/bubble.jpg)',
        choice1: 'Westbrook',
        choice2: 'Crab',
        choice3: 'Bubble',
        choice4: 'Horsehead',
        answer: 3,
        info: "Also known as NGC 7635, this is an emission nebula located 8 000 light-years away. This stunning new image was observed by the NASA/ESA Hubble Space Telescope to celebrate its 26th year in space."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/eagle-nebula_ae188e318ffa2043fc04017447a73985.jpg)',
        choice1: 'Eagle',
        choice2: 'Crab',
        choice3: 'Cat\'s Eye',
        choice4: 'Horsehead',
        answer: 1,
        info: "This image shows the Nebula's famous pillars as seen in visible light, capturing the multi-coloured glow of gas clouds, wispy tendrils of dark cosmic dust, and the rust-coloured elephants’ trunks."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/lagoon.jpg)',
        choice1: 'Lagoon',
        choice2: 'Crab',
        choice3: 'Cat\'s Eye',
        choice4: 'Horsehead',
        answer: 1,
        info: "To celebrate its 28th anniversary in space the NASA/ESA Hubble Space Telescope took this amazing and colourful image of the Lagoon Nebula. The whole nebula, about 4000 light-years away, is an incredible 55 light-years wide and 20 light-years tall. This image shows only a small part of this turbulent star-formation region, about four light-years across."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/lagoon2.jpg)',
        choice1: 'Westbrook',
        choice2: 'Carina',
        choice3: 'Lagoon',
        choice4: 'Horsehead',
        answer: 3,
        info: "This new NASA/ESA Hubble Space Telescope image shows an object with a deceptively tranquil name. The region is filled with intense winds from hot stars, churning funnels of gas, and energetic star formation, all embedded within an intricate haze of gas and pitch-dark dust."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/crab.jpg)',
        choice1: 'Rock',
        choice2: 'Crab',
        choice3: 'Lagoon',
        choice4: 'Neural',
        answer: 2,
        info: "This image is the largest image ever taken with Hubble's WFPC2 camera. It was assembled from 24 individual exposures taken with the NASA/ESA Hubble Space Telescope and is the highest resolution image of this nebula ever made."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/monkeyhead.jpg)',
        choice1: 'Lagoon',
        choice2: 'Cavern',
        choice3: 'Mystic Mountain',
        choice4: 'Monkey Head',
        answer: 4,
        info: "This nebula, NGC 2174, lies about 6400 light-years away in the constellation of Orion (The Hunter). Hubble previously viewed this part of the sky back in 2011 — the colourful region is filled with young stars embedded within bright wisps of cosmic gas and dust."
    },
    {
        question: 'Name the Nebula',
        bg: 'url(img/tarantula.jpg)',
        choice1: 'Tarantula',
        choice2: 'Widow',
        choice3: 'Elephant',
        choice4: 'Orchid',
        answer: 1,
        info: "This nebula is situated 170,000 light-years away in the Large Magellanic Cloud (LMC) in the Southern sky and is clearly visible to the naked eye as a large milky patch. Astronomers believe that this smallish irregular galaxy is currently going through a violent period in its life. It is orbiting around the Milky Way and has had several close encounters with it. It is believed that the interaction with the Milky Way has caused an episode of energetic star formation - part of which is visible as this nebula."
    },
]

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    scoreText.innerText = 0;
    nextBtn.innerText = "Next Question";
    availableQuestions = [...questions];
    getNewQuestion();
}


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
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