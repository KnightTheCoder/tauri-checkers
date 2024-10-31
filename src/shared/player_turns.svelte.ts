let isWhiteNext = $state(true);

function nextPlayer() {
  isWhiteNext = !isWhiteNext;
}

let nextPlayerName_derived = $derived(() => {
  return isWhiteNext ? 'white' : 'black';
});

function getNextPlayerName() {
  return nextPlayerName_derived();
}

function resetTurns() {
  isWhiteNext = true;
}

export { nextPlayer, getNextPlayerName, resetTurns };
