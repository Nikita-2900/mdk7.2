games = [
    { title: "Каркассон", players: 4, borrower: null },
    { title: "Доббль", players: 6, borrower: 'Аня' },
    { title: "Каркассон", players: 2, borrower: null }
]
const gameSelect = document.getElementById("gameSelect")
const borrowButton = document.getElementById("borrowButton")
const borrowerName = document.getElementById("borrowerName")
const gameList = document.getElementById("gameList")
const returnButton = document.getElementById("returnButton")
const message = document.getElementById("message")

function renderGames() {
    gameList.innerHTML = '';
    games.forEach(x => {
        const li = document.createElement("li");
        let check = ""
        if (x.borrower === null) {
            check = "Свободна"
        }
        else {
            check = `Взял(а) ${x.borrower}`;
        };


        li.textContent = `${x.title} · ${x.players} игроков · ${check}`;

        gameList.append(li);
    });
};
renderGames();
borrowButton.addEventListener('click', () => {
    const select = Number(gameSelect.value)
    if (borrowerName.value.trim() == "") {
        message.textContent = "Введите имя"
    }
    else {
        if (games[select].borrower == null) {
            games[select].borrower = borrowerName.value
            message.textContent = "Игра выдана"
        }
        else {
            message.textContent = "Игра уже выдана"
        };
    };
    renderGames();
});
returnButton.addEventListener('click', () => {
    const select = Number(gameSelect.value)
    if (games[select].borrower == null) {
        message.textContent = "Игра уже свободна"
    }
    else {
        games[select].borrower = null
        message.textContent = "Игра свободна"
    };
    renderGames();
});