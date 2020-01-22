let questionHeading = document.querySelector('.quiz-question');
let nextBtn = document.querySelector('.next-question');
let quizStartBtn = document.querySelector('.quiz-start-btn');
let quizStartContainer = document.querySelector('.quiz-start');
let quiztContainer = document.querySelector('.quiz-container');
let feedBack = document.querySelector('.feedback');
let timerContainer = document.querySelector('.quiz-timer');
let timer = document.querySelector('.timer');
let progressBar = document.querySelector('.progress-bar');
let quizScoreContainer = document.querySelector('.quiz-score-container');
let quizScore = document.querySelector('.quiz-score');
let checkBoxes = document.querySelectorAll('input[type=checkbox]');
let restartQuizBtn = document.querySelector('.restart-btn');
let scoresContainer = document.querySelector('.scores-container');

// Answer choices Elements
let answerElement1 = document.querySelector('#answer1');
let answerElement2 = document.querySelector('#answer2');
let answerElement3 = document.querySelector('#answer3');
let answerElement4 = document.querySelector('#answer4');

const quizQuestions = [
    {
        question: "What is the difference between a block level element and an inline level element?",
        choice1: "Blocks are big legos. Inline elements are skates",
        choice2: "Blocks fill the whole width they are contained in. Inline element don't.",
        choice3: "Blocks are box model elements. Inline are flexboxes.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: "2"
    },
    {
        question: "What does Array.flat do?",
        choice1: "It makes an array that has arrays into one array.",
        choice2: "It makes fat objects into skinny arrays.",
        choice3: "It deletes all the items in an array.",
        choice4: "It makes new indexes in an array.",
        correctAnswer: "1"
    },
    {
        question: "A CSS example of a pseudo selector is...",
        choice1: ":click",
        choice2: ":change",
        choice3: ":hover",
        choice4: "h1 > p",
        correctAnswer: "3"
    },
    {
        question: "An example of an HTML element that's self closing",
        choice1: "The <img> tag",
        choice2: "The <br> tag",
        choice3: "The <link> tag",
        choice4: "All of the above.",
        correctAnswer: "4"
    },
    {
        question: "CSS is short for...",
        choice1: "Cascading Style Sheeps",
        choice2: "Cascading Style Sheets",
        choice3: "Centered System Signs",
        choice4: "Cats Sing Songs",
        correctAnswer: "2"
    },
]

let questionIndex = 0;
let timeLeft = 60;
let width = 500;
let TIMER;
let score = 0;
let initials;

// Setting up the data that will get saved to local storage
let records = [];
let user = {};

function startTimer() {
    TIMER = setInterval(() => {
        timeLeft--;
        timer.textContent = `You have ${timeLeft} seconds left.`;
        progressBar.style.width = (timeLeft * 1017 / 100) + 'px';
        if (timeLeft <= 0) {
            stopTimer();
        }
        for (checkbox of checkBoxes) {
            if (questionIndex >= quizQuestions.length - 1 && checkbox.checked === true) {
                stopTimer();
            }
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(TIMER);
    console.log('Times up!');
    setScore();
    quizScoreContainer.style.display = 'block';
    quizScore.textContent = `You had ${score} of 5 correct.`
}

function setScore() {
    initials = prompt('Quiz complete! Enter your initials to save your score.');
    user.name = initials;
    user.finalScore = score;
    records.push(user);
    console.log(records);
    if (records) {
        localStorage.setItem('records', JSON.stringify(records));
    }
}

function getScores() {
    let recordCollection = JSON.parse(localStorage.getItem('records'));
    if (recordCollection) {
        for (let record of recordCollection) {
            records.push(record);
        }
    }
}

function displayScores() {
    for (let record of records) {
        let paragraph = document.createElement('p');
        paragraph.textContent = `${record.name} - ${record.finalScore}`;
        scoresContainer.appendChild(paragraph);
    }
}

questionHeading.textContent = quizQuestions[questionIndex].question;
answerElement1.textContent = quizQuestions[questionIndex].choice1;
answerElement2.textContent = quizQuestions[questionIndex].choice2;
answerElement3.textContent = quizQuestions[questionIndex].choice3;
answerElement4.textContent = quizQuestions[questionIndex].choice4;

quizStartBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', getNextQuestion);
restartQuizBtn.addEventListener('click', reStartQuiz);

function getNextQuestion() {
    for (checkbox of checkBoxes) {
        if (questionIndex < quizQuestions.length - 1 && checkbox.checked) {
            questionIndex++;
            resetQuestions();
        }
    }

    questionHeading.textContent = quizQuestions[questionIndex].question;
    answerElement1.textContent = quizQuestions[questionIndex].choice1;
    answerElement2.textContent = quizQuestions[questionIndex].choice2;
    answerElement3.textContent = quizQuestions[questionIndex].choice3;
    answerElement4.textContent = quizQuestions[questionIndex].choice4;
}

function startQuiz() {
    startTimer();
    disableCheckboxes();
    checkAnswers();
    getScores();
    displayScores();
    quizStartContainer.style.display = 'none';
    quiztContainer.style.display = 'block';
    timerContainer.style.display = 'block';
}

function reStartQuiz() {
    document.location.reload();
}

function resetQuestions() {
    for (let checkbox of checkBoxes) {
        checkbox.checked = false;
        checkbox.disabled = false;
        checkbox.nextSibling.style.opacity = '1';
    }
    feedBack.textContent = '';
}

function disableCheckboxes() {
    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', (e) => {
            if (e.target.checked) {
                for (let unchecked of checkBoxes) {
                    if (!unchecked.checked) {
                        unchecked.disabled = true;
                        unchecked.nextSibling.style.opacity = '0.5';
                    }
                    checkbox.disabled = true;
                }
            }
        })
    }
}

function checkAnswers() {
    for (i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('click', (e) => {
            if (e.target.nextSibling.dataset.value === quizQuestions[questionIndex].correctAnswer) {
                score++;
                feedBack.textContent = 'That is correct';
                feedBack.style.backgroundColor = 'blue';
            } else {
                console.log('Answer is wrong');
                feedBack.style.backgroundColor = 'red';
                feedBack.textContent = 'Wrong!';
                timeLeft -= 10;
            }
        })
    }
}