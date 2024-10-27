<script lang="ts">
  import { onMount } from 'svelte';
  import BoardElement from '../components/board_element.svelte';

  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

  let board: BoardElementType[][] = $state(new Array(8));

  function draw_board() {
    let is_background = true;
    board.fill([]);

    for (let i = 0; i < 8; i++) {
      is_background = !is_background;

      for (let j = 0; j < 8; j++) {
        is_background = !is_background;

        board[i][j] = {
          is_background: !is_background,
          player: 'white'
        };
      }
    }
  }

  onMount(() => {
    draw_board();
  });
</script>

<h1>Tauri checkers</h1>

<main class="container">
  {#each board as row, i}
    <div class="row">
      {#each row as col, j}
        <BoardElement
          {...col}
          positions={[i, j]}
        />
      {/each}
    </div>
  {/each}
</main>

<style>
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .container {
    height: auto;
    width: fit-content;
    margin: 0 auto;
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border: 10px double #f6f6f6;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  h1 {
    font-weight: bold;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
