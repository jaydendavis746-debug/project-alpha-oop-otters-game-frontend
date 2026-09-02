function protectRoute() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
        alert('You must be logged in');
        window.location.href = "login.html";
    }
}

protectRoute();

const session = JSON.parse(localStorage.getItem('session'));

const usernameSpan = document.getElementById('profile-username');
usernameSpan.textContent = session.username;

const fakeResults = [
    { subject: "Geography", score: 8, date: "2026-09-01T14:22:00Z" },
    { subject: "French", score: 6, date: "2026-08-29T10:10:00Z" },
    { subject: "History", score: 9, date: "2026-08-25T16:45:00Z" },
    { subject: "RE", score: 7, date: "2026-08-20T12:30:00Z" },
    { subject: "Geography", score: 5, date: "2026-08-18T09:15:00Z" },
    { subject: "French", score: 10, date: "2026-08-15T18:05:00Z" },
    { subject: "History", score: 4, date: "2026-08-10T11:50:00Z" }
];

localStorage.setItem("fakeResults", JSON.stringify(fakeResults));

function loadResults(){
    const results = JSON.parse(localStorage.getItem('fakeResults')) || [];
    renderResults(results);
}

function renderResults(results){
    const container = document.getElementById('results-list');
    
    if(results.length === 0){
        container.innerHTML = '<p>No results yet.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');

        item.innerHTML = `
            <p><strong>Subject:</strong> ${result.subject}</p>
            <p><strong>Score:</strong> ${result.score}</p>
            <p><strong>Date:</strong> ${new Date(result.date).toLocaleString()}</p>
            <hr>
        `;

        container.appendChild(item);
    });
}

loadResults();
