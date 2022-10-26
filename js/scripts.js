/* Retornando a explicação... Abaixo a variávle do textArray vai separar as palavras tanto letras quando espaçamento em array 
e após isso ele fará a captura ao qual armazenará no array como dito anteriormente, após isso restauraremos usando o forEach usando
os parametros da  letra (variavel) e i(posição do array) e ir distribuindo até se encerrar onde após isso faremos a captura como dito na linha 15*/
function typeWriter(elemento){
    const textArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textArray.forEach((letra,i) =>  {
        setTimeout(() =>  elemento.innerHTML += letra, 75 * i)
    });
    // Acima o setTimeout vai estar colocando uma setagem de tempo para que os elementos pertinentes ao Array apareçam por isso os 75s * i
}

const jogodavelha2 = document.querySelector('h2');
typeWriter(jogodavelha2);
// A frase sempre seja digitada no reinicio por conta da passagem de parâmetro ser a variável ao qual acessa o H2 do html

// Acima é um teste sobre o efeito do H2 para que toda vez ao qual o jogo seja reiniciado abaixo

// Abaixo são as variáveis e funcionalidades do jogo da velha!!
const cellElements = document.querySelectorAll("[data-cell]");

const board = document.querySelector("[data-board]");

const winningMessageText = document.querySelector("[data-winning-message-text]");

const winningMessage = document.querySelector("[data-winning-message]");

const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("winner-message");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageText.innerText = 'Empate!!';
    } else {
        winningMessageText.innerText = isCircleTurn ? "O venceu!!" : "X venceu!!";
    }

    winningMessage.classList.add("winner-message");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index)=> {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};
// Acima está verificando se alguma das combinações de vitória está preenchida das formas citadas

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

const handleClick = (e) => {
    // Adicionar uma das duas formas de jogada
    // Não se esqueça de criar uma checagem de vitória
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);



    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);