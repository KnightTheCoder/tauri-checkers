<script lang="ts">
  let {
    col,
    movePiece,
    issueMovement
  }: { col: BoardElementType; movePiece: Function; issueMovement: Function } =
    $props();

  function clickElement() {
    if (col.is_background) return;

    movePiece(col.player, col.position, issueMovement, col.isKing);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="col"
  class:col-foreground={!col.is_background}
  onclick={clickElement}
>
  {#if !col.is_background && col.player}
    <div
      class="player"
      class:white={col.player == 'white'}
      class:black={col.player == 'black'}
    >
      <div class:king={col.isKing}></div>
    </div>
  {/if}
</div>

<style>
  .col {
    margin: 2px;
    padding: 10px;
    background-color: #f6f6f6;
    color: black;
    height: 60px;
    width: 60px;
  }

  .col-foreground {
    background-color: #483c32;
    color: white;
  }

  .player {
    width: 40px;
    height: 40px;
    border-radius: 30px;
    margin: 10px auto;
    box-shadow: 0px 0px 10px #ffffff;
  }

  .king {
    display: inline-block;
    width: 20px;
    height: 10px;
    border-radius: 5px;
    margin-top: 15px;
    background-color: gray;
  }

  .white {
    background-color: #ffffffc0;
  }

  .black {
    background-color: #242424;
  }
</style>
