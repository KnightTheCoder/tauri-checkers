<script lang="ts">
  import { onMount } from 'svelte';
  import BoardElement from '../components/board_element.svelte';
  import {
    getNextPlayerName,
    nextPlayer,
    resetTurns
  } from '../shared/player_turns.svelte';
  import {
    getMovementStatus,
    movePiece,
    resetAll
  } from '../shared/piece_movement.svelte';

  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

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

  function reset_game() {
    draw_board();
    resetAll();
    resetTurns();
  }

  onMount(() => {
    reset_game();
  });

  function issueMovement() {
    let movement = getMovementStatus();
    let from = movement.from;
    let to = movement.to;

    let nextPlayerName = getNextPlayerName();

    if (!from || !to) return;

    let reachedEnd = from?.isKing;

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
</script>

<h1>Tauri checkers</h1>

<h2>Next player: {getNextPlayerName()}</h2>

<button
  style="margin: 0 auto; display: block"
  onclick={reset_game}
  >End Game
</button>

<main class="container">
  {#each board as row, i}
    <div class="row">
      {#each row as col, j}
        <BoardElement
          {col}
          {movePiece}
          {issueMovement}
        />
      {/each}
    </div>
  {/each}
</main>

<style>
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    user-select: none;
    -webkit-user-select: none;
  }

  .container {
    height: auto;
    width: fit-content;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border: 10px solid #000;
    border-radius: 20px;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  h1,
  h2 {
    text-align: center;
  }

  button {
    color: #f6f6f6;
    background-color: #2f2f2f;
    border-radius: 20px;
  }
</style>
