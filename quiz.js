/* Instantiate constants and vars */

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/* questions */

let questions = [
    {
        question: 'What country has the highest life expectancy?',
        choice1: 'USA',
        choice2: 'HongKong',
        choice3: 'Japan',
        choice4: 'Italy',
        answer: 2,
    },
    {
        question:
            "What car manufacturer had the highest revenue in 2020?",
        choice1: "Volkswagen",
        choice2: "Ferarri",
        choice3: "Ford",
        choice4: "BMW",
        answer: 1,
    },
    {
        question: "What country drinks the most coffee per capita?",
        choice1: "India",
        choice2: "Brasil",
        choice3: "Finland",
        choice4: "Germany",
        answer: 3,
    },
    {
        question: "Which planet in the Milky Way is the hottest?",
        choice1: "Mercury",
        choice2: "Mars",
        choice3: "Saturn",
        choice4: "Venus",
        answer: 4,
    }
]

/* Game start */

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

/* Get next question */

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('quiz-end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

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

        }, 800)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()