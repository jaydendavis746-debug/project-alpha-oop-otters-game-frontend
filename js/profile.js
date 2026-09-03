const API_URL = "https://project-alpha-oop-otters-game-backend.onrender.com";

const token = localStorage.getItem("token");
const userId = Number(localStorage.getItem("user_id"));
const username = localStorage.getItem("username");

if (!token || !userId || !username) {
    alert("You must be logged in");
    window.location.href = "login.html";
}

const usernameSpan = document.getElementById("profile-username");
const resultsContainer = document.getElementById("results-list");

async function loadProfile() {
    try {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const userRes = await fetch(`${API_URL}/users/${username}`, options);
        const userData = await userRes.json();

        if (!userRes.ok) {
            alert("Failed to load profile");
            return;
        }

        usernameSpan.textContent = userData.username;

        const resultsRes = await fetch(`${API_URL}/results/${userId}`, options);
        const resultsData = await resultsRes.json();

        if (!resultsRes.ok) {
            alert("Failed to load results");
            return;
        }

        if (resultsData.length === 0) {
            resultsContainer.innerHTML = "<p>No results yet.</p>";
            return;
        }

        resultsContainer.innerHTML = "";

        for (const result of resultsData) {
            const subjectRes = await fetch(`${API_URL}/subjects/${result.subject_id}`, options);
            const subjectData = await subjectRes.json();

            const item = document.createElement("div");
            item.classList.add("result-item");

            item.innerHTML = `
                <p><strong>Subject:</strong> ${subjectData.name.toUpperCase()}</p>
                <p><strong>Score:</strong> ${result.score}</p>
                <p><strong>Date:</strong> ${new Date(result.created_at).toLocaleString()}</p>
                <hr>
            `;

            resultsContainer.appendChild(item);
        }

    } catch (err) {
        console.error("Server error:", err);
    }
}

loadProfile();
