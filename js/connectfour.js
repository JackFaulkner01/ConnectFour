var discs = [[0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]];
var player1 = "discRed";
var player2 = "discGreen";
var isPlayer1 = true;
var gameOver = false;

function bodyOnLoad() {
    var temps = document.getElementsByClassName("disc");
    var tempColumn, tempRow;

    for (var i = 0; i < temps.length; i++) {
        temps[i].addEventListener("mouseover", hoverOverDisc);
        temps[i].addEventListener("mouseout", hoverOutDisc);
        temps[i].addEventListener("click", selectDisc);
        tempColumn = parseInt(temps[i].id.charAt(4)) - 1;
        tempRow = parseInt(temps[i].id.charAt(5)) - 1;
        discs[tempRow][tempColumn] = temps[i];
    }
}

function hoverOverDisc() {
    if (gameOver || isSelected(this)) {
        return;
    }

    var colour = getColour();
    var disc = getLowestDisc(this);
    
    if (disc) {
        disc.classList.add(colour + "Hover");
    }
}

function hoverOutDisc() {
    if (gameOver || isSelected(this)) {
        return;
    }

    var colour = getColour();
    var disc = getLowestDisc(this);

    if (disc) {
        disc.classList.remove(colour + "Hover");
    }
}

function selectDisc() {
    if (gameOver || isSelected(this)) {
        return;
    }

    var colour = getColour();
    var disc = getLowestDisc(this);

    if (disc) {
        disc.classList.remove(colour + "Hover");
        disc.classList.add(colour);

        for (var column = 0; column < 7; column++) {
            for (var row = 0; row < 6; row++) {
                if (discs[row][column].classList.contains(getColour())) {
                    checkWon(discs[row][column]);
                }
            }
        }
        
        isPlayer1 = !isPlayer1;
    }
}

function isSelected(disc) {
    return disc.classList.contains(player1) || disc.classList.contains(player2);
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
    var column = disc.id.charAt(4) - 1;
    var row = 6;
    var lowestDisc = null;

    for (var i = 0; i < 6; i++) {
        if (i < row && !isSelected(discs[i][column])) {
            row = i;
            lowestDisc = discs[i][column];
            break;
        }
    }

    return lowestDisc;
}

function checkWon(disc) {
    var allSteps = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (var i = 0; i < allSteps.length; i++) {
        if (scan(disc, allSteps[i])) {
            showWon();
            gameOver = true;
            return;
        }
    }
}

function scan(disc, step) {
    var column = disc.id.charAt(4) - 1;
    var row = disc.id.charAt(5) - 1;
    var count = 1;

    while (true) {
        column += step[0];
        row += step[1];

        if (column < 0 || column > 6 || row < 0 || row > 5) {
            return false;
        }
        console.log(column + "," + row);
        if (discs[row][column].classList.contains(getColour())) {
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
    for (var column = 0; column < 7; column++) {
        for (var row = 0; row < 6; row++) {
            discs[row][column].classList.remove(getNotColour());
            discs[row][column].classList.add(getColour());
        }
    }
}
