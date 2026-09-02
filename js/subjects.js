



async function loadSubjects() {
    
    const subjects = await Promise.resolve([
        { id: 1, name: "Geography" },
        { id: 2, name: "History" },
        { id: 3, name: "RE" },
        { id: 4, name: "French" }
    ]);


const grid = document.querySelector("#subject-grid");


subjects.forEach(subject =>{
    const card = document.createElement('div');
    card.classList.add('subject-card')
    card.innerHTML= `<h3>${subject.name}</h3>`;

    grid.appendChild(card)
})
};

loadSubjects()