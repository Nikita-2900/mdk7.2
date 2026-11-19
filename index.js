games = [
    { title: "Каркассон", players: 4, borrower: [], count: 3 },
    { title: "Доббль", players: 6, borrower: ['Аня'], count: 2 },
    { title: "Шахматы", players: 2, borrower: [], count: 3 }
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
const gameCount = document.getElementById("gameCount")

function renderGames() {
    gameList.innerHTML = '';
    games.forEach(x => {
        const li = document.createElement("li");
        let check = ""
        if (x.borrower.length === 0) {
            check = ""
        }
        else {
            check = `· Взяли ${x.borrower.join(', ')}`;
        };

        if (showHint.checked) {
            if (x.count > 0) {
                li.textContent = `${x.title} · ${x.players} игроков ${check} · Осталось ${x.count} шт.`;
                gameList.append(li);
            };
        }
        else {
            li.textContent = `${x.title} · ${x.players} игроков ${check} · Осталось ${x.count} шт.`;
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
        if (games[select].count > 0) {
            games[select].borrower.push(borrowerName.value);
            games[select].count -= 1
            message.textContent = "Игра выдана"
        }
        else {
            message.textContent = "Свободных игр нет"
        };
    };
    renderGames();
});
returnButton.addEventListener('click', () => {
    const select = Number(gameSelect.value)
    if (borrowerName.value.trim() == "") {
        message.textContent = "Введите имя"
    }
    else {
        if (games[select].borrower.length === 0) {
            message.textContent = "Эту игру никто не брал"
        }
        else {
            const index = games[select].borrower.findIndex(x => x === borrowerName.value);
            if (index >= 0) {
                games[select].count += 1
                message.textContent = "Игра свободна"
                games[select].borrower.splice(index, 1);
            }
            else {
                message.textContent = "Этот человек не брал эту игру"
            }
        };
    };
    renderGames();
});


showHint.addEventListener('change', () => {
    renderGames()
});

gameButton.addEventListener('click', () => {
    const new_obj = { title: "", players: 0, borrower: [], count: 0}
    if (!gameName.value.trim() == "" && Number(gameNum.value) > 0 && Number(gameCount.value) > 0) {
        new_obj.title = gameName.value;
        new_obj.players = Number(gameNum.value);
        new_obj.count = Number(gameCount.value);
        games.push(new_obj)
        message.textContent = "Игра добавлена"
        renderGames()
        renderGameOptions()
        gameName.value = ""
        gameNum.value = ""
        gameCount.value = ""
    }
    else {
        message.textContent = "Введены не все данные"
    };
});