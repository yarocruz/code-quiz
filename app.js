let questionHeading = document.querySelector('.quiz-question');
let nextBtn = document.querySelector('.next-question');
let quizStartBtn = document.querySelector('.quiz-start-btn');
let quizStartContainer = document.querySelector('.quiz-start');
let quiztContainer = document.querySelector('.quiz-container');
let feedBack = document.querySelector('.feedback');

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
        choice3: "Blocks are box model elements. Inline are flexbox z-indices.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: "2"
    },
    {
        question: "What does Array.flat do?",
        choice1: "It makes an array that has arrays into one array.",
        choice2: "Blocks fill the whole width they are contained in. Inline element don't.",
        choice3: "A different answer here to show that the looping is working.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: "1"
    },
    {
        question: "What are you doing here?",
        choice1: "These are not the droids you are looking for",
        choice2: "Blocks fill the whole width they are contained in. Inline element don't.",
        choice3: "Blocks are box model elements. Inline are flexbox z-indices.",
        choice4: "A beautiful sample answer right here.",
        correctAnswer: "4"
    },
    {
        question: "Do you believe in god?",
        choice1: "Blocks are big legos. Inline elements are skates",
        choice2: "Blocks fill the whole width they are contained in. Inline element don't.",
        choice3: "Blocks are box model elements. Inline are flexbox z-indices.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: "2"
    },
    {
        question: "This is another sample question?",
        choice1: "Blocks are big legos. Inline elements are skates",
        choice2: "This will catch you with your pants down",
        choice3: "Blocks are box model elements. Inline are flexbox z-indices.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: "2"
    },
]

let questionIndex = 0;

questionHeading.textContent = quizQuestions[questionIndex].question;
answerElement1.textContent = quizQuestions[questionIndex].choice1;
answerElement2.textContent = quizQuestions[questionIndex].choice2;
answerElement3.textContent = quizQuestions[questionIndex].choice3;
answerElement4.textContent = quizQuestions[questionIndex].choice4;

quizStartBtn.addEventListener('click', startQuiz)

nextBtn.addEventListener('click', function () {
    if (questionIndex < quizQuestions.length - 1) {
        questionIndex++;
        resetQuestions();
    }
    questionHeading.textContent = quizQuestions[questionIndex].question;
    answerElement1.textContent = quizQuestions[questionIndex].choice1;
    answerElement2.textContent = quizQuestions[questionIndex].choice2;
    answerElement3.textContent = quizQuestions[questionIndex].choice3;
    answerElement4.textContent = quizQuestions[questionIndex].choice4;
})

function startQuiz() {
    disableCheckboxes();
    checkAnswers();
    quizStartContainer.style.display = 'none';
    quiztContainer.style.display = 'block';

}

function resetQuestions() {
    for (let checkbox of checkBoxes) {
        checkbox.checked = false;
        checkbox.disabled = false;
    }
}

let checkBoxes = document.querySelectorAll('input[type=checkbox]');

function disableCheckboxes() {
    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', (e) => {
            if (e.target.checked) {
                for (let unchecked of checkBoxes) {
                    console.log(unchecked);
                    if (!unchecked.checked) {
                        unchecked.disabled = true;
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
            console.log(e.target.nextSibling.dataset.value);
            console.log(quizQuestions[questionIndex].correctAnswer);
            if (e.target.nextSibling.dataset.value === quizQuestions[questionIndex].correctAnswer) {
                console.log('That is correct');
            } else {
                console.log('Answer is wrong');
            }

        })
    }
}

//console.log(checkBoxes[0].nextSibling.textContent);










