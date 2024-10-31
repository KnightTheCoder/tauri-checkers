import { getNextPlayerName } from './player_turns.svelte';
import { abs } from './utils';

let movement: MovementType = $state({
  from: null,
  to: null
});

function movePiece(
  player: string,
  position: PositionType,
  issueMovement: Function,
  isKing: boolean
) {
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

    // Don't move more than 1 in any direction
    if (abs(moveDistance.x) > 1 || abs(moveDistance.y) > 1) {
      resetTo();
    }

    // X is vertical axis, only 1 directional movement is checked
    if (movement.from.isKing) {
      issueMovement();
      resetAll();

      return;
    } else if (
      (moveDistance.x == 1 && nextPlayer == 'white') ||
      (moveDistance.x == -1 && nextPlayer == 'black')
    ) {
      issueMovement();
      resetAll();

      return;
    }

    resetTo();
  }
}

function resetFrom() {
  movement.from = null;
}

function resetTo() {
  movement.to = null;
}

function resetAll() {
  resetFrom();
  resetTo();
}

function getMovementStatus() {
  return $state.snapshot(movement);
}

export { getMovementStatus, movePiece, resetAll };
