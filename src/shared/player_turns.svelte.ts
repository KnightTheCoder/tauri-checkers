let isWhiteNext = $state(true);

function nextPlayer() {
  isWhiteNext = !isWhiteNext;
}

let nextPlayerName_derived = $derived(() => {
  return isWhiteNext ? 'white' : 'black';
});

function nextPlayerName() {
  return nextPlayerName_derived();
}

export { nextPlayer, nextPlayerName };
