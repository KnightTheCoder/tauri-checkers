<script lang="ts">
  import { onMount } from 'svelte';
  import BoardElement from '../components/board_element.svelte';
  import { nextPlayerName } from '../shared/player_turns.svelte';

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
          position: { x: i, y: j }
        };
      }
    }
  }

  onMount(() => {
    draw_board();
  });
</script>

<h1>Tauri checkers</h1>

<h2>Next player: {nextPlayerName()}</h2>

<main class="container">
  {#each board as row, i}
    <div class="row">
      {#each row as col, j}
        <BoardElement {col} />
      {/each}
    </div>
  {/each}
</main>

<style>
  :root {
    color: #0f0f0f;
    background-color: #f6f6f6;

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

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
