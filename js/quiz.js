
const mockQuestions = [
    {
        question_id: 1,
        subject_id: 1,
        question_text: 'What is the capital of Australia?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Canberra'
    },
    {
        question_id: 2,
        subject_id: 1,
        question_text: 'What is the capital of England?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'London'
    },
    {
        question_id: 3,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
    {
        question_id: 4,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
    {
        question_id: 5,
        subject_id: 1,
        question_text: 'What is the capital of Belgium?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Brussels'
    },
    {
        question_id: 6,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
    {
        question_id: 7,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
    {
        question_id: 8,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
    {
        question_id: 9,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
    {
        question_id: 10,
        subject_id: 1,
        question_text: 'What is the capital of France?',
        option_a: 'London',
        option_b: 'Paris',
        option_c: 'Brussels',
        option_d: 'Canberra',
        correct_option: 'Paris'
    },
   // -------------------------
    // SUBJECT 4 — French
    // -------------------------
    {
        question_id: 11,
        subject_id: 4,
        question_text: 'What is the French word for "apple"?',
        option_a: 'Pomme',
        option_b: 'Banane',
        option_c: 'Orange',
        option_d: 'Poire',
        correct_option: 'Pomme'
    },
    {
        question_id: 12,
        subject_id: 4,
        question_text: 'How do you say "thank you" in French?',
        option_a: 'Bonjour',
        option_b: 'Merci',
        option_c: 'Au revoir',
        option_d: 'S’il vous plaît',
        correct_option: 'Merci'
    },
    {
        question_id: 13,
        subject_id: 4,
        question_text: 'What is the French word for "cat"?',
        option_a: 'Chien',
        option_b: 'Chat',
        option_c: 'Cheval',
        option_d: 'Oiseau',
        correct_option: 'Chat'
    },
    {
        question_id: 14,
        subject_id: 4,
        question_text: 'How do you say "goodbye" in French?',
        option_a: 'Bonjour',
        option_b: 'Merci',
        option_c: 'Au revoir',
        option_d: 'Salut',
        correct_option: 'Au revoir'
    },
    {
        question_id: 15,
        subject_id: 4,
        question_text: 'What is the French word for "bread"?',
        option_a: 'Lait',
        option_b: 'Pain',
        option_c: 'Fromage',
        option_d: 'Eau',
        correct_option: 'Pain'
    }
];


function protectRoute() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
        alert('You must be logged in')
        window.location.href = "login.html";
    }
}


const selectedSubject = Number(localStorage.getItem("selectedSubject"));
const questions = mockQuestions.filter(q => q.subject_id === selectedSubject);
console.log("Filtered questions:", questions);


let currentIndex = 0;
let score = 0;
let correctAnswers = [];
let givenAnswers = [];
let selectedAnswerValue = null;

const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");


function loadQuestion() {

    if (questions.length === 0) {
    alert("This quiz has no questions available.");
    window.location.href = "subjects.html";
    return;
}

   const q = questions[currentIndex];

    selectedAnswerValue = null;
    questionCounter.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    questionText.textContent = q.question_text;
    answersContainer.innerHTML = "";

    const options = [
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d
    ];

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = option;

        btn.addEventListener("click", () => {
            selectedAnswerValue = option;

            document.querySelectorAll(".answer-btn")
                .forEach(b => b.classList.remove("selected"));

            btn.classList.add("selected");
        });

        answersContainer.appendChild(btn);
    });
}


nextBtn.addEventListener("click", () => {

    if (!selectedAnswerValue) {
        alert("Please select an answer before continuing");
        return;
    }

    if (selectedAnswerValue === questions[currentIndex].correct_option) {
        score++;
    }

    givenAnswers.push({
        question_id: questions[currentIndex].question_id,
        user_answer: selectedAnswerValue
    });

    correctAnswers.push({
        question_id: questions[currentIndex].question_id,
        correct_answer: questions[currentIndex].correct_option
    });

    if (currentIndex === questions.length - 1) {
        finishQuiz();
        return;
    }

    currentIndex++;
    selectedAnswerValue = null;
    loadQuestion();
});



async function finishQuiz() {
    const session = JSON.parse(localStorage.getItem("session"));

    const resultPayload = {
        user_id: session.userId,
        subject_id: selectedSubject,
        score: score,
        correct_answers: correctAnswers,
        given_answers: givenAnswers
    };

    console.log("POST /results/submit", resultPayload);

    /*
    await fetch("http://localhost:3000/results/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultPayload)
    });
    */

    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizTotal", questions.length);
    localStorage.setItem("given_answers", JSON.stringify(givenAnswers));
    localStorage.setItem("correct_answers", JSON.stringify(correctAnswers));

    window.location.href = "results.html";
}


loadQuestion();
protectRoute();
