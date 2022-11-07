let discs = Array;
let player1 = "discRed";
let player2 = "discGreen";
let isPlayer1 = true;

function bodyOnLoad() {

    discs = document.getElementsByClassName("disc");

    for (var i = 0; i < discs.length; i++) {
        
        discs[i].addEventListener("mouseover", mouseOverDisc);
        discs[i].addEventListener("mouseout", mouseOutDisc);
        discs[i].addEventListener("click", clickDisc);
    }
}

function mouseOverDisc() {

    let colour = player2;

    if (isPlayer1) {

        colour = player1;
    }

    this.classList.add(colour);
}

function mouseOutDisc() {

    let colour = player2;

    if (isPlayer1) {

        colour = player1;
    }

    this.classList.remove(colour);
}

function clickDisc() {

    isPlayer1 = !isPlayer1;
}