openNav = () => {
  document.getElementById("myNav").style.width = "100%";
}

closeNav = () => {
  document.getElementById("myNav").style.width = "0%";
}

setPlace = (x, y, place) => {
   if (place.match(player) && x == compX && y == compY) {
    return false;
  } 
  else if (gridArray[x][y].src.match(computer) && place.match(computer)) {
    gridArray[x][y].src = computer_locked;
    return true;
  }

  else if (gridArray[x][y].src.match(player) && place.match(player) && x != compX && y != compY) {
    gridArray[x][y].src = player_locked;
    return true;
  }

  else if (gridArray[x][y].src.match(computer_locked) || gridArray[x][y].src.match(player_locked) && place.match(computer)) {
    return false;
  }

  else if (gridArray[x][y].src.match(player_locked) || gridArray[x][y].src.match(computer_locked) && place.match(player)) {
    return false;
  }
  else if (place.match(computer)) {
    gridArray[x][y].src = computer;
    return true;
  }
  else {
    gridArray[x][y].src = player;
    return true;

  }
}

function rollOpponentChoice() {

  let placeX = Math.floor(Math.random() * 3);
  let placeY = Math.floor(Math.random() * 3);
  compX = placeX;
  compY = placeY;
  console.log(placeX + ", " + placeY);

  return setPlace(placeX, placeY, computer);

}

function checkWinner(x, y, currentPlayer, currentPlayerLocked) {
  let col = 0;
  let row = 0;
  let diag = 0;
  let rdiag = 0;
  let winner = false;
  for (let i = 0; i < 3; i++) {
    (gridArray[x][i].src.match(currentPlayer) || gridArray[x][i].src.match(currentPlayerLocked)) ? col++ : "";
    (gridArray[i][y].src.match(currentPlayer) || gridArray[i][y].src.match(currentPlayerLocked)) ? row++ : "";
    (gridArray[i][i].src.match(currentPlayer) || gridArray[i][i].src.match(currentPlayerLocked)) ? diag++ : "";
    (gridArray[i][1 - i + 1].src.match(currentPlayer) || gridArray[i][1 - i + 1].src.match(currentPlayerLocked)) ? rdiag++ : "";
    /* console.log("col = " + col);
    console.log("row = " + row);
    console.log("diag = " + diag);
    console.log("rdiag = " + rdiag); */
  }
  (row === 3 || col === 3 || diag === 3 || rdiag === 3) ? winner = true : "";

  console.log(currentPlayer + ": " + winner);
  return winner;
}

function playX() {
  playAsX.style.display = 'none';
  playAsO.style.display = 'none';

  player = "images/x.png";
  computer = "images/o.png";
  computer_locked = "images/o_locked.png";
  player_locked = "images/x_locked.png";
}

function playO() {
  playAsX.style.display = 'none';
  playAsO.style.display = 'none';

  player = "images/o.png";
  computer = "images/x.png";
  computer_locked = "images/x_locked.png";
  player_locked = "images/o_locked.png";
}

function seriesWinSequence(x, y, who) {

  if (setPlace(x, y, who)) {

    if (player === "") {
      messageBoard.innerHTML = "You have to pick a symbol to play as.";
    }

    if (checkWinner(x, y, player, player_locked)) {
      initialize();

      messageBoard.innerHTML = "You win! Game restarted! Pick a symbol to play as!";
      openNav();
      console.log("you won!");
    }

    else {

      temp = false;
      while (!temp) {
        temp = rollOpponentChoice();

        console.log("opponent turn");
      }
      
      if (checkWinner(compX, compY, computer, computer_locked)) {
        initialize();

        messageBoard.innerHTML = "You lose! Game restarted! Pick a symbol to play as!";
        openNav();
        console.log("you lose");
      }
    }
  }
}