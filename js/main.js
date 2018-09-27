let currentPlayer = 1;
let moves = 0;
let winner = false;
let player1Selections = new Array();
let player2Selections = new Array();
let winningSolutions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
document.querySelector('.currentPlayer p').innerHTML = `Player ${currentPlayer} pick a square`;


function transition() {
    document.getElementById('cover').classList.add('not-visible');
    document.getElementById('showcase').classList.add('visible');
}

// function to grab id of element box clicked
// Place X or O based on current player
function boxClicked(click_id) {
    let box = document.getElementById(click_id);

    if (currentPlayer == 1) {
        box.innerHTML = '<img src="./img/X.jpg" alt="">';
        player1Selections.push(parseInt(click_id.slice(-1), 10));
        moves++;
        box.removeAttribute('onclick');
        if (moves > 4 && moves <= 9) {
            checkWinner(player1Selections);
        }
        currentPlayer = 2;
        console.log('This runs after the checkWinner function');
        if (!winner) {
            document.querySelector('.currentPlayer p').innerHTML = `Player ${currentPlayer} pick a square`;
        }
    } else if (currentPlayer == 2) {
        box.innerHTML = '<img src="./img/O.jpg" alt="">'
        player2Selections.push(parseInt(click_id.slice(-1), 10));
        moves++;
        box.removeAttribute('onclick');
        if (moves > 4 && moves <= 9) {
            checkWinner(player2Selections);
        }
        currentPlayer = 1;
        console.log('This runs after the checkWinner function');
        if (!winner) {
            document.querySelector('.currentPlayer p').innerHTML = `Player ${currentPlayer} pick a square`;
        }
    }
}

// function call containing player1 or 2 selections.
// Using that array to check if the selections are a winner.


function reload() {
    //refresh the game board
    currentPlayer = 1;
    moves = 0;
    winner = false;
    player1Selections = [];
    player2Selections = [];
    document.querySelector('.currentPlayer p').innerHTML = `Player ${currentPlayer} pick a square`;
    document.querySelector('.displayWinner p').innerHTML = ' ';
    document.querySelector('.image').innerHTML = ' ';
    document.querySelector('.buttons').style.display = 'none';
    for (let i = 1; i < 10; i++) {
        document.getElementById(`box-${i}`).innerHTML = ' ';
        document.getElementById(`box-${i}`).setAttribute('onclick', 'boxClicked(this.id)');
    }
}

function endGame() {
    //Clear game board and display message
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container2').style.display = 'flex';
    document.querySelector('.displayWinner p').innerHTML = ' ';
    document.querySelector('.buttons h1').innerHTML = 'Reset to start game over';
    document.querySelector('.button.green').innerHTML = 'Reset';
    document.querySelector('.button.red').remove();
    document.querySelector('.button.green').setAttribute('onclick', 'reset()');
}

function reset() {
    document.location.reload();
}

function checkWinner(playerSelections) {
    console.log(`playerSelections: ${playerSelections}`);
    for (let i = 0; i < winningSolutions.length; i++) {
        console.log(`Winning Solution: ${winningSolutions[i]}`);
        let isSubset = winningSolutions[i].every(function(element) {
            return playerSelections.includes(element);
        })
        if (isSubset) {
            console.log(`Is there a winner? ${isSubset}`);
            console.log(`Player ${currentPlayer} wins!`);
            document.querySelector('.displayWinner p').innerHTML = `Player ${currentPlayer} wins!`;
            document.querySelector('.currentPlayer p').innerHTML = ' ';
            document.querySelector('.buttons').style.display = 'block';
            winner = true;
            break;
        } else if (!isSubset) {
            if (moves == 9 && i == 7) {
                console.log(`Is there a winner? ${isSubset}`);
                console.log(`Cat wins!`);
                document.querySelector('.displayWinner p').innerHTML = 'Cat wins!';
                document.querySelector('.currentPlayer p').innerHTML = ' ';
                document.querySelector('.image').innerHTML = '<img src="./img/cat.jpg" alt="">';
                document.querySelector('.buttons').style.display = 'block';
                winner = true;
                break;
            }
        }
    }
}