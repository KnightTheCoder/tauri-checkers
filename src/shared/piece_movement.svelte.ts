import { getNextPlayerName, nextPlayer } from './player_turns.svelte';
import { getBoardStatus } from './board_logic.svelte';

let board = getBoardStatus();

let movement: MovementType = $state({
  from: null,
  to: null
});

function movePiece(player: string, position: PositionType, isKing: boolean) {
  let nextPlayer = getNextPlayerName();

  if (movement.from == null) {
    if (player == nextPlayer) {
      movement.from = { player, position, isKing };
    }

    return;
  }

  if (movement.to == null) {
    if (player) {
      movement.from = { player, position, isKing };
      return;
    }

    movement.to = { player, position, isKing };

    if (movement.from == null) return;

    let moveDistance: PositionType = {
      x: movement.from.position.x - movement.to.position.x,
      y: movement.from.position.y - movement.to.position.y
    };

    // X is vertical axis, only 1 directional movement is checked
    if (movement.from.isKing) {
      issueMovement();
    } else if (
      (moveDistance.x == 1 && nextPlayer == 'white') ||
      (moveDistance.x == -1 && nextPlayer == 'black')
    ) {
      issueMovement();
    }

    resetAll();
  }
}

function issueMovement() {
  let movement = getMovementStatus();
  let from = movement.from;
  let to = movement.to;

  let nextPlayerName = getNextPlayerName();

  if (!from || !to) return;

  let reachedEnd = from.isKing;

  if (
    (to.position.x == 0 && nextPlayerName == 'white') ||
    (to.position.x == 7 && nextPlayerName == 'black')
  ) {
    reachedEnd = true;
  }

  board[from.position.x][from.position.y] = {
    is_background: false,
    player: '',
    position: from.position,
    isKing: from.isKing
  };

  board[to.position.x][to.position.y] = {
    is_background: false,
    player: from.player,
    position: to.position,
    isKing: reachedEnd
  };

  nextPlayer();
}

function resetAll() {
  movement.from = null;
  movement.to = null;
}

function getMovementStatus() {
  return $state.snapshot(movement);
}

export { getMovementStatus, movePiece, resetAll };
