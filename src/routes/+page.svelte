<script lang="ts">
  import { onMount } from 'svelte';
  import BoardElement from '../components/board_element.svelte';
  import { getBoardStatus, draw_board } from '../shared/board_logic.svelte';
  import { getNextPlayerName, resetTurns } from '../shared/player_turns.svelte';
  import { movePiece, resetAll } from '../shared/piece_movement.svelte';
  import GameBoard from '../components/game_board.svelte';

  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

  let board = getBoardStatus();

  function reset_game() {
    draw_board();
    resetAll();
    resetTurns();
  }

  onMount(() => {
    reset_game();
  });
</script>

<h1>Tauri checkers</h1>

<h2>Next player: {getNextPlayerName()}</h2>

<button
  style="margin: 0 auto; display: block"
  onclick={reset_game}
>
  End Game
</button>

<main class="container">
  <GameBoard />
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
