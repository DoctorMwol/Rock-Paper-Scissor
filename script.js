let score = {wins: 0, loses: 0, ties: 0}
let game = [[2, 1, 0],[0, 2, 1],[1, 0, 2]] // 0 ganha, 1 perde, 2 empata
let textGame = ['You Win!', 'You Lose!', 'Tie!'];
let choices = ['Rock', 'Paper', 'Scissor'];
score = JSON.parse(localStorage.getItem("score")) || {wins: 0, loses: 0, ties: 0}

// Funções para habilitar e desabilitar botões
function disableButtons() {
    document.getElementById('rock-btn').disabled = true;
    document.getElementById('paper-btn').disabled = true;
    document.getElementById('scissors-btn').disabled = true;
}

function enableButtons() {
    document.getElementById('rock-btn').disabled = false;
    document.getElementById('paper-btn').disabled = false;
    document.getElementById('scissors-btn').disabled = false;
}

function main(playerChoice){
    let compChoice = computerChoice();
    ShowResult(choices, playerChoice, compChoice)
}

function computerChoice(){
    let choice = Math.floor(Math.random() * 3)
    return choice;
}

function scoreUpdate(result){
    if(result === 0){
        score.wins++;
    } else if (result === 1){
        score.loses++;
    } else {
        score.ties++;
    }
    ShowScore()
    localStorage.setItem('score', JSON.stringify(score));
}

function ShowScore(){
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = `Wins: ${score.wins} | Loses: ${score.loses} | Ties: ${score.ties}`
}

function ShowResult(choices, playerChoice, computerChoice){
    const result = game[playerChoice][computerChoice];
    document.getElementById('result').innerHTML = `<h2>${textGame[result]}<br><span>You chose <em>${choices[playerChoice]}</em> and the Computer <em>${choices[computerChoice]}</em>.</span></h2>`
    scoreUpdate(result);
}

function ResetScore(){
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.setItem('score', JSON.stringify(score));
    ShowScore();
}
ShowScore();

let isAutoPlay = false;
let intervalId;

function AutoPlay(){
    if (!isAutoPlay){
        disableButtons(); // Desabilita os botões
        document.getElementById('auto').textContent = "Stop Play";
        document.getElementById('mode').innerHTML = `<p>Auto Play</p>`
        intervalId = setInterval(() => {
            let playerChoice = computerChoice();
            main(playerChoice);
        }, 1000);
        isAutoPlay = true;
    }
    else {
        enableButtons(); // Habilita os botões
        clearInterval(intervalId);
        document.getElementById('auto').textContent = "Auto Play";
        document.getElementById('mode').innerHTML = '';
        isAutoPlay = false;
    }
}
