<script lang="ts">
  import { getBoardStatus } from '../shared/board_logic.svelte';
  import BoardElement from './board_element.svelte';
  import { movePiece } from '../shared/piece_movement.svelte';

  let board = getBoardStatus();
</script>

{#each board as row, i}
  <div class="row">
    {#each row as col, j}
      <BoardElement
        {col}
        {movePiece}
      />
    {/each}
  </div>
{/each}

<style>
  .row {
    display: flex;
    justify-content: center;
  }
</style>
