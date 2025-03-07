let score = {wins: 0, loses: 0, ties: 0}
let game = [[2, 1, 0],[0, 2, 1],[1, 0, 2]] // 0 ganha, 1 perde, 2 empata
let textGame = ['You Win!', 'You Lose!', 'Tie!'];
let choices = ['Rock', 'Paper', 'Scissor'];
score = JSON.parse(localStorage.getItem("score")) // usado para recuperar o objeto salvo no localStorage
function main(playerChoice){
    ShowResult(choices, playerChoice, computerChoice())
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
    localStorage.setItem('score', JSON.stringify(score)); // usado para salvar dados no navegador
}
function ShowScore(){
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = `Wins: ${score.wins} | Loses: ${score.loses} | Ties: ${score.ties}`
}
ShowScore();

function ShowResult(choices, playerChoice, computerChoice){
    const resultElement = document.getElementById('result');
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
