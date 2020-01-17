let questionHeading = document.querySelector('.quiz-question');

const quizQuestions = [
    {
        question: "What is the difference between a block level element and an inline level element?",
        choice1: "Blocks are big legos. Inline elements are skates",
        choice2: "Blocks fill the whole width they are contained in. Inline element don't.",
        choice3: "Blocks are box model elements. Inline are flexbox z-indices.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: 2
    },
    {
        question: "What does Array.flat do?",
        choice1: "Blocks are big legos. Inline elements are skates",
        choice2: "Blocks fill the whole width they are contained in. Inline element don't.",
        choice3: "Blocks are box model elements. Inline are flexbox z-indices.",
        choice4: "Blocks are passed as arguments. Inline elements are API's.",
        correctAnswer: 2
    },
]

let questionIndex = 0;

quizQuestions.forEach((quizQuestion) => {
    console.log(quizQuestion.question);
})

questionHeading.innerHTML = quizQuestions[0].question;
