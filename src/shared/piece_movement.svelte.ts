import { getNextPlayerName } from './player_turns.svelte';

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

function resetAll() {
  movement.from = null;
  movement.to = null;
}

function getMovementStatus() {
  return $state.snapshot(movement);
}

export { getMovementStatus, movePiece, resetAll };
