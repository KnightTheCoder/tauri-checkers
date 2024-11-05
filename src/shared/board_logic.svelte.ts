let board: BoardElementType[][] = $state(new Array(8));

function draw_board() {
  let is_background = true;
  let player = '';
  board.fill([]);

  for (let i = 0; i < 8; i++) {
    is_background = !is_background;

    if (i < 3) {
      player = 'black';
    } else if (i >= 5) {
      player = 'white';
    } else {
      player = '';
    }

    for (let j = 0; j < 8; j++) {
      is_background = !is_background;

      board[i][j] = {
        is_background: is_background,
        player: !is_background ? player : '',
        position: { x: i, y: j },
        isKing: false
      };
    }
  }
}

let isGameOver = $derived(() => {
  let winner = '';

  let status = {
    empty: 0,
    white: 0,
    black: 0
  };

  board.forEach((row) =>
    row.forEach((col) => {
      switch (col.player) {
        case 'white':
          status.white++;
          break;

        case 'black':
          status.black++;
          break;

        default:
          status.empty++;
          break;
      }
    })
  );

  if (status.white == 0) {
    winner = 'black';
  } else if (status.black == 0) {
    winner = 'white';
  }

  return {
    isOver: winner != '',
    winner
  };
});

function getBoardStatus(): BoardElementType[][] {
  return board;
}

function getGameStatus() {
  return isGameOver();
}

export { getBoardStatus, draw_board, getGameStatus };
