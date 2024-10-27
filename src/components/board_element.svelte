<script lang="ts">
  let props = $props();
</script>

<div class="col {!props.is_background ? 'col-foreground' : ''}">
  <!-- {player} -->
  {props.positions}
</div>

<style>
  .col {
    margin: 2px;
    background-color: #f6f6f6;
    height: 80px;
    width: 80px;
  }

  .col:hover {
    background-color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }

  .col-foreground {
    background-color: #3632184d;
  }

  .col-foreground:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
