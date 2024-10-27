<script lang="ts">
  let { col }: { col: BoardElementType } = $props();
</script>

<div
  class="col"
  class:col-foreground={!col.is_background}
>
  <span>
    <div
      class:player={col.player}
      class:white={col.player == 'white'}
      class:black={col.player == 'black'}
    ></div>
    <!-- {col.position.x},
    {col.position.y} -->
  </span>
</div>

<style>
  .col {
    margin: 2px;
    background-color: #f6f6f6;
    color: black;
    height: 80px;
    width: 80px;
    line-height: 120px;
    user-select: none;
    -webkit-user-select: none;
  }

  .col-foreground {
    background-color: #966919;
    color: white;
  }

  .player {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin: 10px auto;
    box-shadow: 0px 0px 10px #ffffff;
  }

  .white {
    background-color: #ffffffc0;
  }

  .black {
    background-color: #242424;
  }
</style>
