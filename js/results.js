// ---------------------------
// Route protection
// ---------------------------
function protectRoute() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
        window.location.href = "login.html";
    }
}

function protectResults() {
    const score = localStorage.getItem("quizScore");
    const total = localStorage.getItem("quizTotal");
    const given = localStorage.getItem("given_answers");
    const correct = localStorage.getItem("correct_answers");

    if (!score || !total || !given || !correct) {
        alert("You must complete a quiz before viewing results.");
        window.location.href = "subjects.html";
    }
}

protectRoute();
protectResults();


const score = Number(localStorage.getItem('quizScore'));
const total = Number(localStorage.getItem("quizTotal"));
const givenAnswers = JSON.parse(localStorage.getItem("given_answers"));
const correctAnswers = JSON.parse(localStorage.getItem("correct_answers"));


const scoreText = document.getElementById('score-text');
const percentageText = document.getElementById('percentage-text');
const breakdownContainer = document.getElementById('breakdown-container');


scoreText.textContent = `Score: ${score} / ${total}`;

const percentage = Math.round((score / total) * 100);
percentageText.textContent = `Percentage: ${percentage}%`;


givenAnswers.forEach((ans, index) => {
    const correctAns = correctAnswers.find(
        c => Number(c.question_id) === Number(ans.question_id)
    );

    const wrapper = document.createElement('div');
    wrapper.classList.add('breakdown-item');


    const isCorrect = ans.user_answer === correctAns.correct_answer;

    wrapper.innerHTML = `
        <p><strong>Question ${index + 1}</strong></p>
        <p style="color:${isCorrect ? 'green' : 'red'};">
            ${isCorrect ? 'Correct' : 'Incorrect'}
        </p>
        <p>Your Answer: ${ans.user_answer}</p>
        <p>Correct Answer: ${correctAns.correct_answer}</p>
        <hr>
    `;

    breakdownContainer.appendChild(wrapper);
});
