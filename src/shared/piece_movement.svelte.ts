import { abs } from './utils';
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
    if (abs(moveDistance.x) == 1 && abs(moveDistance.y) == 1) {
      if (movement.from.isKing) {
        issueMovement();
      } else if (
        (moveDistance.x == 1 && nextPlayer == 'white') ||
        (moveDistance.x == -1 && nextPlayer == 'black')
      ) {
        issueMovement();
      }
    } else if (abs(moveDistance.x) == 2 && abs(moveDistance.y) == 2) {
      let foundPlayer = isPlayerPresent();

      if (!foundPlayer) {
        resetAll();
        return;
      }

      if (movement.from.isKing) {
        issueMovement(foundPlayer);
      } else if (
        (moveDistance.x == 2 && nextPlayer == 'white') ||
        (moveDistance.x == -2 && nextPlayer == 'black')
      ) {
        issueMovement(foundPlayer);
      }
    }

    resetAll();
  }
}

function resetAll() {
  movement.from = null;
  movement.to = null;
}

function getMovementStatus() {
  return $state.snapshot(movement);
}

function issueMovement(playerLocation: PositionType | undefined = undefined) {
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
    isKing: false
  };

  board[to.position.x][to.position.y] = {
    is_background: false,
    player: from.player,
    position: to.position,
    isKing: reachedEnd
  };

  if (playerLocation) {
    board[playerLocation.x][playerLocation.y] = {
      is_background: false,
      player: '',
      position: playerLocation,
      isKing: false
    };
  }

  nextPlayer();
}

function isPlayerPresent(): PositionType | undefined {
  let x = 0;
  let y = 0;

  if (!movement.from || !movement.to) return;

  if (movement.from.position.x > movement.to.position.x) {
    x = movement.to.position.x + 1;
  } else {
    x = movement.to.position.x - 1;
  }

  if (movement.from.position.y > movement.to.position.y) {
    y = movement.to.position.y + 1;
  } else {
    y = movement.to.position.y - 1;
  }

  return { x, y };
}

export { getMovementStatus, movePiece, resetAll };
