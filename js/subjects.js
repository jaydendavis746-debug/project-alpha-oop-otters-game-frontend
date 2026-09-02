
const subjects = [
    { id: 'sub1', name: "Geography"},
    {id:'sub2', name: 'History',},
    { id: 'sub3', name: 'RE',},
    { id: 'sub4', name: 'French',},

]


const grid = document.querySelector("#subject-grid");


subjects.forEach(subject =>{
    const card = document.createElement('div');
    card.classList.add('subject-card')
    card.innerHTML= `<h3>${subject.name}</h3>`;

    grid.appendChild(card)
})