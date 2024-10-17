const cells = document.querySelectorAll(".item");
const startButton = document.querySelector(".start");
const message = document.getElementById("message");
const board = document.querySelector(".container")

let currPlayer;
let gameActive;
let gameStatus;


function startGame()
{
    currPlayer = 'X';
    gameActive = true;
    gameStatus = Array(9).fill('');
    // console.log(currPlayer);

    message.innerText = `Player ${currPlayer}'s Turn`;
    cells.forEach((cell) =>{
        cell.innerText = '';
    })
}

function handleClick(event){
    const cell = event.target;
    const index = parseInt(cell.id)-1;
    // console.log(index)

    if(gameStatus[index] !== '' || !gameActive)
        return;
    
    startButton.innerHTML = "RESTART GAME"
    cell.innerText = currPlayer;
    gameStatus[index] = currPlayer;

    checkWinner();
}

function checkWinner(){

    let winningCondn = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(const condn of winningCondn)
    {
        const [a,b,c] = condn;
        if(gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c])
        {
            gameActive = false;
            message.innerText = `Player ${currPlayer} WINS`;
            return;
        }
    }

    if(!gameStatus.includes(''))
    {
        gameActive = false;
        message.innerText = "It's a DRAW";
        return;
    }

    if(currPlayer === 'X')
        currPlayer = 'O';
    else
        currPlayer = 'X';
    message.innerText = `Player ${currPlayer}'s turn`;
}

cells.forEach((cell)=>{
    cell.addEventListener("click",handleClick);
})

startButton.addEventListener("click",startGame);