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
  canGoBackwards: boolean
) {
  if (movement.from == null) {
    if (player == getNextPlayerName()) {
      movement.from = { player, position };
    }

    return;
  }

  if (movement.to == null) {
    if (player) {
      movement.from = { player, position };
      return;
    }

    movement.to = { player, position };

    if (movement.from == null) return;

    let moveDistance: PositionType = {
      x: movement.from.position.x - movement.to.position.x,
      y: movement.from.position.y - movement.to.position.y
    };

    if (abs(moveDistance.x) > 1 || abs(moveDistance.y) > 1) {
      resetTo();
      console.log(movement.from, movement.to);
    }

    issueMovement(canGoBackwards);
    resetAll();

    return;
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
