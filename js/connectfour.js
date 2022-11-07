var discs = Array;
var player1 = "discRed";
var player2 = "discGreen";
var isPlayer1 = true;

function bodyOnLoad() {

    discs = document.getElementsByClassName("disc");

    for (var i = 0; i < discs.length; i++) {
        
        discs[i].addEventListener("mouseover", hoverOverDisc);
        discs[i].addEventListener("mouseout", hoverOutDisc);
        discs[i].addEventListener("click", selectDisc);
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

function getLowestDisc(disc) {

    var column = disc.id.charAt(4);
    var row = 8;
    var lowestDisc = null;

    for (var i = 0; i < discs.length; i++) {

        var discColumn = parseInt(discs[i].id.charAt(4));
        var discRow = parseInt(discs[i].id.charAt(5));

        if (discColumn == column && discRow < row && !isSelected(discs[i])) {

            row = discRow;
            lowestDisc = discs[i];
        }
    }

    return lowestDisc;
}

function hoverOverDisc() {

    if (isSelected(this)) {

        return;
    }

    var colour = getColour();
    var disc = getLowestDisc(this);
    
    if (disc) {
    
        disc.classList.add(colour + "Hover");
    }
}

function hoverOutDisc() {

    if (isSelected(this)) {

        return;
    }

    var colour = getColour();
    var disc = getLowestDisc(this);

    if (disc) {
    
        disc.classList.remove(colour + "Hover");
    }
}

function selectDisc() {

    if (isSelected(this)) {

        return;
    }

    var colour = getColour();
    var disc = getLowestDisc(this);

    if (disc) {
    
        disc.classList.remove(colour + "Hover");
        disc.classList.add(colour);
        isPlayer1 = !isPlayer1;
    }
}