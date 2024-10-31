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

function getBoardStatus(): BoardElementType[][] {
  return board;
}

export { getBoardStatus, draw_board };
