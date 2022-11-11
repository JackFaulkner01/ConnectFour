var board = [[0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]];
var player1 = "discRed";
var player2 = "discGreen";
var isPlayer1 = true;
var isUser = true;
var ai;
var gameOver = false;

function bodyOnLoad() {
    var temps = document.getElementsByClassName("disc");
    var tempColumn, tempRow;
    
    ai = document.getElementById("ai");

    for (var i = 0; i < temps.length; i++) {
        tempColumn = parseInt(temps[i].id.charAt(4)) - 1;
        tempRow = parseInt(temps[i].id.charAt(5)) - 1;
        board[tempRow][tempColumn] = new Disc(temps[i]);

        temps[i].addEventListener("mouseover", hoverOverDisc);
        temps[i].addEventListener("mouseout", hoverOutDisc);
        temps[i].addEventListener("click", selectDisc);
    }
}

function hoverOverDisc() {
    if (gameOver || !isUser) {
        return;
    }

    var disc = getLowestDisc(this);
    
    if (disc) {
        disc.addClass(getColour() + "Hover");
    }
}

function hoverOutDisc() {
    if (gameOver || !isUser) {
        return;
    }

    var disc = getLowestDisc(this);

    if (disc) {
        disc.removeClass(getColour() + "Hover");
    }
}

function selectDisc() {
    if (gameOver || !isUser) {
        return;
    }

    var disc = getLowestDisc(this);

    if (disc) {
        disc.removeClass(getColour() + "Hover");
        disc.addClass(getColour());

        if (checkWon()) {
            showWon();
        }

        isPlayer1 = !isPlayer1;

        switch (ai.selectedIndex) {
            case 0:
                randomAI();
                break;
            case 1:
                minMaxAI();
                break;
        }

        isPlayer1 = !isPlayer1;
    }
}

class Disc {
    constructor(disc) {
        this.disc = disc;
    }

    isSelected() {
        return this.disc.classList.contains(player1) || this.disc.classList.contains(player2);
    }

    getColumn() {
        return this.disc.id.charAt(4) - 1;
    }

    getRow() {
        return this.disc.id.charAt(5) - 1;
    }

    addClass(cssClass) {
        this.disc.classList.add(cssClass);
    }

    removeClass(cssClass) {
        this.disc.classList.remove(cssClass);
    }

    hasClass(cssClass) {
        return this.disc.classList.contains(cssClass);
    }
  }

function getColour() {
    if (isPlayer1) {
        return player1;
    }

    return player2;
}

function getNotColour() {
    if (isPlayer1) {
        return player2;
    }

    return player1;
}

function getLowestDisc(disc) {
    var column = parseInt(disc.id.charAt(4)) - 1;
    var lowestDisc = null;

    for (var i = 0; i < 6; i++) {
        if (!board[i][column].isSelected()) {
            lowestDisc = board[i][column];
            break;
        }
    }

    return lowestDisc;
}

function checkWon() {
    for (var column = 0; column < 7; column++) {
        for (var row = 0; row < 6; row++) {
            if (checkDiscWon(board[row][column])) {
                return true;
            }
        }
    }

    return false;
}

function checkDiscWon(disc) {
    var allSteps = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    if (disc.hasClass(getColour())) {
        for (var i = 0; i < allSteps.length; i++) {
            if (scan(disc, allSteps[i])) {
                return true;
            }
        }
    }

    return false;
}

function scan(disc, step) {
    var column = disc.getColumn();
    var row = disc.getRow();
    var count = 1;

    while (true) {
        column += step[0];
        row += step[1];

        if (column < 0 || column > 6 || row < 0 || row > 5) {
            return false;
        }
        
        if (board[row][column].hasClass(getColour())) {
            count++;

            if (count == 4) {
                return true;
            }
        } else {
            return false;
        }
    }
}

function showWon() {
    gameOver = true;

    // for (var column = 0; column < 7; column++) {
    //     for (var row = 0; row < 6; row++) {
    //         board[row][column].removeClass(getNotColour());
    //         board[row][column].addClass(getColour());
    //     }
    // }
}

function randomAI() {
    if (gameOver) {
        return;
    }

    var random, disc;
    var valid = false;

    while (!valid) {
        random = Math.floor(Math.random() * 7);
        disc = getLowestDisc(board[5][random].disc);

        if (disc) {
            disc.addClass(getColour());
            valid = true;
            
            if (checkWon()) {
                showWon();
            }
        }
    }
}

function minMaxAI() {
    if (gameOver) {
        return;
    }

    var disc;
    var player = isPlayer1;

    for (var column = 0; column < 7; column++) {
        disc = getLowestDisc(board[5][column]);
        
        if (!disc) {
            continue;
        }

        disc.addClass(getColour());
        minMaxSearch(disc, 0, 1);
        disc.removeClass(getColour());
        isPlayer1 = player;
    }
}

function minMaxSearch(disc, score, depth) {
    if (depth == 0) {
        return score;
    }

    var current;
    var bestScore = 0;
    
    isPlayer1 = !isPlayer1;
    var player = isPlayer1;

    for (var column = 0; column < 7; column++) {
        current = getLowestDisc(board[5][column]);
        current.addClass(getColour());
        
        if (checkWon()) {
            if (bestScore < score + 10) {
                bestScore = score + 10;
            }
        }

        current.removeClass(getColour());
        isPlayer1 = player;
    }

    return bestScore;
}
