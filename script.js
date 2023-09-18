var isGameActive = true;

function storeInformation(event)
{
    event.preventDefault();

    const inputP1 = document.getElementById("inputp1").value;
    const inputP2 = document.getElementById("inputp2").value;

    localStorage.setItem("inputP1", inputP1);
    localStorage.setItem("inputP2", inputP2);

    window.location.href = "game.html";

};

function loadPage()
{
    const val1 = localStorage.getItem("inputP1");
    const val2 = localStorage.getItem("inputP2");

    document.getElementById("nickp1").textContent = val1;
    document.getElementById("nickp2").textContent = val2;
    document.getElementById("result-game").textContent = "Vez de " + val1;
}

function reloadPage()
{
    window.location.href = "index.html";
}

function startGame() {
    var velha = 0;
    var finalize = 0;
    var currentPlayer = "player1";
    
    const columns = document.getElementsByClassName("column");
    const result = document.getElementById("result-game");
    const reloadButton = document.getElementById("reload-button");

    const player1 = document.getElementById("nickp1").textContent;
    const player2 = document.getElementById("nickp2").textContent;

    const gameBoard = document.getElementById("game-board");

    if (!isGameActive) {
        return;
    }

    function addClicker(event) {
        if (!isGameActive) {
            return;
        }

        if (event.target.childElementCount === 0) {
            playerTurn(currentPlayer, event.target);
            if (currentPlayer == "player1") {
                result.textContent = "Vez de " + player2;
            } else {
                result.textContent = "Vez de " + player1;
            }

            event.target.removeEventListener("click", addClicker);
            event.target.style = "cursor: default;"

            finalize = analiseGame(columns);
            if (finalize != 0) {
                isGameActive = false;
                if (currentPlayer === "player1") {
                    result.textContent = player1 + " é o(a) vencedor(a)";
                    reloadButton.hidden = false;
                } else {
                    result.textContent = player2 + " é o(a) vencedor(a)";
                    reloadButton.hidden = false;
                }
                removeClickListeners();
            } else {
                velha++;
                if (velha == 9) {
                    isGameActive = false;
                    result.textContent = "Empate! Deu velha!";
                    reloadButton.hidden = false;
                    removeClickListeners();
                }
            }

            currentPlayer = togglePlayer(currentPlayer);
        }
    }

    function removeClickListeners() {
        for (var i = 0; i < 9; i++) {
            columns[i].removeEventListener("click", addClicker);
        }
    }

    gameBoard.addEventListener("click", addClicker);
}

function playerTurn(player, space)
{
    var newIcon = document.createElement("iconify-icon");
    if(player === "player1")
    {
        newIcon.setAttribute("icon", "line-md:twitter-x");
        
        newIcon.classList.add("x-turn");
        newIcon.textContent = "x";
        
    }
    else
    {
        newIcon.setAttribute("icon", "line-md:circle");
        
        newIcon.classList.add("o-turn");
        newIcon.textContent = "o";

    }
    space.appendChild(newIcon);
}

function togglePlayer(player)
{
    if(player === "player1")
    {
        return "player2";
    }    
    
    return "player1";
}

function analiseGame(columnsGame)
{
    if(
        (columnsGame[0].textContent.trim() !== "" && (columnsGame[0].textContent === columnsGame[1].textContent) && (columnsGame[1].textContent === columnsGame[2].textContent))
        || (columnsGame[3].textContent.trim() !== "" && (columnsGame[3].textContent === columnsGame[4].textContent) && (columnsGame[4].textContent === columnsGame[5].textContent))
        || (columnsGame[6].textContent.trim() !== "" &&  (columnsGame[6].textContent === columnsGame[7].textContent) && (columnsGame[7].textContent === columnsGame[8].textContent))
        || (columnsGame[0].textContent.trim() !== "" && (columnsGame[0].textContent === columnsGame[3].textContent) && (columnsGame[3].textContent === columnsGame[6].textContent))
        || (columnsGame[1].textContent.trim() !== "" && (columnsGame[1].textContent === columnsGame[4].textContent) && (columnsGame[4].textContent === columnsGame[7].textContent))
        || (columnsGame[2].textContent.trim() !== "" && (columnsGame[2].textContent === columnsGame[5].textContent) && (columnsGame[5].textContent === columnsGame[8].textContent))
        || (columnsGame[0].textContent.trim() !== "" && (columnsGame[0].textContent === columnsGame[4].textContent) && (columnsGame[4].textContent === columnsGame[8].textContent))
        || (columnsGame[2].textContent.trim() !== "" && (columnsGame[2].textContent === columnsGame[4].textContent) && (columnsGame[4].textContent === columnsGame[6].textContent))
        )
    {
        return 1;
    }
    return 0;
}