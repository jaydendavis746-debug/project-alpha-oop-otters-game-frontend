
function protectRoute(e){
    e.preventDefault()

    const session = JSON.parse(localStorage.getItem("session"))
    if(!session || session.loggedIn){
        window.location.href = 'login.html'   
    }
}


async function loadSubjects() {
    
    const subjects = await Promise.resolve([
        { subject_id: 1, name: "Geography" },
        { subject_id: 2, name: "History" },
        { subject_id: 3, name: "RE" },
        { subject_id: 4, name: "French" }
    ]);
    
    
    const grid = document.querySelector("#subject-grid");
    
    
    subjects.forEach(subject =>{
        const card = document.createElement('div');
        card.classList.add('subject-card')
        card.innerHTML= `<h3>${subject.name}</h3>`;
        
        grid.appendChild(card)

        card.addEventListener("click", () => {
            localStorage.setItem("selectedSubject", subject.subject_id);
            window.location.href = "quiz.html";
        });

    })
};



loadSubjects()
protectRoute()