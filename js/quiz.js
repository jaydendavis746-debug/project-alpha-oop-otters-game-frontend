
const API_URL = "https://project-alpha-oop-otters-game-backend.onrender.com";

const token = localStorage.getItem("token")
if (!token) {
    window.location.href = "login.html";
}



const selectedSubject = Number(localStorage.getItem("selectedSubject"));
if (!selectedSubject) {
  window.location.href = "subjects.html";
}


function getUserId(){
    const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
}

const userId = getUserId()

let questions = []
let currentIndex = 0;
let score = 0;
let correctAnswers = [];
let givenAnswers = [];
let selectedAnswerValue = null;

const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");



async function loadQuestions(){


    try{

        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        const res = await fetch(`${API_URL}/questions/${selectedSubject}`, options)
        const data = await res.json()

   if (!res.ok) {
      alert(data.error || "Failed to load questions");
      window.location.href = "subjects.html";
      return;
    }
    questions = data

    loadQuestion()

    } catch(err){
        console.error('Server error', err)
    }
}


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

    const resultPayload = {
        user_id: userId,
        subject_id: selectedSubject,
        score: score,
        correct_answers: correctAnswers,
        given_answers: givenAnswers
    };

    console.log("POST /results/submit", resultPayload);

    try{

        const options =  {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resultPayload)
        }

        const res = await fetch(`${API_URL}/results/submit`, options)

        const data = res.json()

        if(!res.ok){
            console.error("Failed to submit results:", data.error);
        }
  
    } catch(err){
        console.err('Server error ', err)
    }
    

    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizTotal", questions.length);
    localStorage.setItem("given_answers", JSON.stringify(givenAnswers));
    localStorage.setItem("correct_answers", JSON.stringify(correctAnswers));

    window.location.href = "results.html";
}


loadQuestions();

