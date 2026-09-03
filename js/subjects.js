const API_URL = "https://project-alpha-oop-otters-game-backend.onrender.com";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

const grid = document.querySelector("#subject-grid");

async function loadSubjects() {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${API_URL}/subjects`, options);
    const subjects = await res.json();

    if (!res.ok) {
      console.error("Failed to load subjects", subjects.error);
      return;
    }

    grid.innerHTML = "";

    subjects.forEach((subject) => {
      const card = document.createElement("div");
      card.classList.add("subject-card");
      card.innerHTML = `<h3>${subject.name}</h3>`;

      grid.appendChild(card);

      card.addEventListener("click", () => {
        localStorage.setItem("selectedSubject", subject.subject_id);
        window.location.href = "quiz.html";
      });
    });
  } catch (err) {
    console.error("Server error", err);
  }
}

loadSubjects();
