games = [
    { title: "Каркассон", players: 4, borrower: null },
    { title: "Доббль", players: 6, borrower: 'Аня' },
    { title: "Шахматы", players: 2, borrower: null }
]
const gameSelect = document.getElementById("gameSelect")
const borrowButton = document.getElementById("borrowButton")
const borrowerName = document.getElementById("borrowerName")
const gameList = document.getElementById("gameList")
const returnButton = document.getElementById("returnButton")
const message = document.getElementById("message")

const showHint = document.getElementById('showHint');

const gameName = document.getElementById("gameName")
const gameNum = document.getElementById("gameNum")
const gameButton = document.getElementById("gameButton")


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

        if (showHint.checked) {
            if (x.borrower === null) {
                li.textContent = `${x.title} · ${x.players} игроков · ${check}`;
                gameList.append(li);
            };
        }
        else {
            li.textContent = `${x.title} · ${x.players} игроков · ${check}`;
            gameList.append(li);
        }
    });
    if (gameList.children.length === 0) {
        message.textContent = "Свободных игр пока нет"
    }
};

function renderGameOptions() {
    gameSelect.innerHTML = '';
    games.forEach((x, index) => {
        const option = document.createElement("option");
        option.textContent = x.title;
        option.value = index;
        gameSelect.append(option);
    });

}

renderGames();
renderGameOptions()

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


showHint.addEventListener('change', () => {
    renderGames()
});

gameButton.addEventListener('click', () => {
    const new_obj = { title: "", players: 0, borrower: null }
    if (!gameName.value.trim() == "" && Number(gameNum.value) > 0) {
        new_obj.title = gameName.value;
        new_obj.players = Number(gameNum.value);
        games.push(new_obj)
        message.textContent = "Игра добавлена"
        renderGames()
        renderGameOptions()
    }
    else {
        message.textContent = "Введены не все данные"
    };
});