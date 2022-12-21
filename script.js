///////////// InitialConfigs
var playerOneSelection = '';
var playerTwoSelection = '';
var playerOneTurn = false;
var playerTwoTurn = false;
var playerOneName = '';
var playerTwoName = '';
// variaverys
var inputOne = document.querySelector('#inputOne');
var inputTwo = document.querySelector('#inputTwo');
var playerOnePoints = 0;
var playerTwoPoints = 0;
var WinPlayer = '';
var juia = '';
let isGameActive = true;
const boxs = Array.from(document.querySelectorAll('.boxJ'));

let options = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// selectTeam
selectTeam = (Player, TypeSelect) => {
    if ((Player = 'One')) {
        switch (TypeSelect) {
            case 'X1':
                if (playerTwoSelection == 'X') {
                    break;
                }
                if (playerOneSelection == 'X') {
                    $('.x1').removeClass('active');
                    playerOneSelection = '';
                    break;
                }
                $('.x1').addClass('active');
                $('.o1').removeClass('active');
                playerOneSelection = 'X';
                break;
            case 'O1':
                if (playerTwoSelection == 'O') {
                    break;
                }
                if (playerOneSelection == 'O') {
                    $('.o1').removeClass('active');
                    playerOneSelection = '';
                    break;
                }
                $('.o1').addClass('active');
                $('.x1').removeClass('active');
                playerOneSelection = 'O';
                break;
            default:
                break;
        }
    }
    if ((Player = 'Two')) {
        switch (TypeSelect) {
            case 'X2':
                if (playerOneSelection == 'X') {
                    break;
                }
                if (playerTwoSelection == 'X') {
                    $('.x2').removeClass('active');
                    playerTwoSelection = '';
                    break;
                }
                $('.x2').addClass('active');
                $('.o2').removeClass('active');

                playerTwoSelection = 'X';
                break;
            case 'O2':
                if (playerOneSelection == 'O') {
                    break;
                }
                if (playerTwoSelection == 'O') {
                    $('.o2').removeClass('active');
                    playerTwoSelection = '';
                    break;
                }
                $('.o2').addClass('active');
                $('.x2').removeClass('active');
                playerTwoSelection = 'O';
                break;
            default:
                break;
        }
    }
};

// startGame
startGame = () => {
    playerOneName = inputOne.value;
    playerTwoName = inputTwo.value;

    if (playerOneName == '') {
        return;
    }
    if (playerTwoName == '') {
        return;
    }
    if (playerOneName == playerTwoName) {
        return;
    }
    if (playerOneSelection == '') {
        return;
    }
    if (playerTwoSelection == '') {
        return;
    }

    randomize = Math.floor(Math.random() * 100);
    if (randomize > 50) {
        playerOneTurn = true;
        correctionInfos();
    } else {
        playerTwoTurn = true;
        correctionInfos();
    }
    $('.choice').addClass('hide');
    $('.inGame').removeClass('hide');

    document.getElementById('score').innerHTML =
        '' +
        playerOneName +
        ': ' +
        playerOnePoints +
        ' / ' +
        playerTwoName +
        ': ' +
        playerTwoPoints +
        '';
};

const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
        return false;
    }

    return true;
};

const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
        if (playerOneTurn == true) {
            box.innerText = playerOneSelection;
            box.classList.add(`${playerOneSelection}`);
            updateBoard(index);
            playerOneTurn = false;
            playerTwoTurn = true;
            correctionInfos();
        } else if (playerTwoTurn == true) {
            box.innerText = playerTwoSelection;
            box.classList.add(`${playerTwoSelection}`);
            updateBoard(index);

            playerOneTurn = true;
            playerTwoTurn = false;
            correctionInfos();
        }
        handleResultValidation();
    }
};

correctionInfos = () => {
    if (playerOneTurn == true) {
        document.getElementById('turn').innerHTML =
            'Vez de ' + playerOneName + '';
    } else if (playerTwoTurn == true) {
        document.getElementById('turn').innerHTML =
            'Vez de ' + playerTwoName + '';
    }
};

boxs.forEach((box, index) => {
    box.addEventListener('click', () => userAction(box, index));
});

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCodition = winningConditions[i];
        const a = options[winCodition[0]];
        const b = options[winCodition[1]];
        const c = options[winCodition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        console.log('alguem ganhou');
        isGameActive = false;
        if (playerOneTurn == false) {
            document.getElementById('turn').innerHTML =
                playerOneName + ' Ganhou';

            playerOnePoints += 1;
            document.getElementById('score').innerHTML =
                '' +
                playerOneName +
                ': ' +
                playerOnePoints +
                ' / ' +
                playerTwoName +
                ': ' +
                playerTwoPoints +
                '';

            $('.buttonContinue').removeClass('hide');
        } else if (playerTwoTurn == false) {
            document.getElementById('turn').innerHTML =
                playerTwoName + ' Ganhou';
            playerTwoPoints += 1;
            document.getElementById('score').innerHTML =
                '' +
                playerOneName +
                ': ' +
                playerOnePoints +
                ' / ' +
                playerTwoName +
                ': ' +
                playerTwoPoints +
                '';
            $('.buttonContinue').removeClass('hide');
        }
        return;
    }

    if (!options.includes('')) {
        document.getElementById('turn').innerHTML ='Deu velha';
        $('.buttonContinue').removeClass('hide');
    }
}

const updateBoard = (index) => {
    if (playerOneTurn == true) {
        options[index] = 'X';
    } else if (playerTwoTurn == true) {
        options[index] = 'O';
    }
};

nextGame = () => {
    options = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    $('.buttonContinue').addClass('hide');

    boxs.forEach((ra) => {
        document.getElementById('1').innerText = '1';
        document.getElementById('2').innerText = '2';
        document.getElementById('3').innerText = '3';
        document.getElementById('4').innerText = '4';
        document.getElementById('5').innerText = '5';
        document.getElementById('6').innerText = '6';
        document.getElementById('7').innerText = '7';
        document.getElementById('8').innerText = '8';
        document.getElementById('9').innerText = '9';
        ra.classList.remove('X');
        ra.classList.remove('O');
    });
    correctionInfos();
};
