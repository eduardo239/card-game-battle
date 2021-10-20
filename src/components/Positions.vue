<template>
  <h4>MAPA</h4>
  <div class="board">
    <div v-for="(position, i) in positions" :key="i">
      <div
        style="position: relative"
        :class="
          `position ${
            position === 'FIGHT'
              ? 'fight'
              : position === 'TRAP'
              ? 'trap'
              : position === 'GIFT'
              ? 'gift'
              : position === 'BOSS'
              ? 'boss'
              : position === 'START'
              ? 'start'
              : ''
          } ${i == current ? 'current ' : ''} ${current > i ? 'passed' : ''}`
        "
      >
        {{ current > i ? '...' : position }}
        <span class="absolute top-left card-item-id">{{ i + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Positions',
  props: ['positions', 'current']
};
</script>

<style>
.board {
  z-index: 1;
  position: relative;
  max-height: 500px;
  overflow-y: scroll;

  display: flex;
  gap: 0.25rem;
  overflow-x: scroll;
  overflow-y: hidden;

  padding: 4px;
  border: 2px solid black;
}
.position {
  height: 100px;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.current {
  outline: 2px dashed #2b2b2b;
}

.position.start {
  background: #c0f5ff;
  color: #000;
}

.position.fight {
  background: #ffcdf3;
  color: #000;
}

.position.gift {
  background: #beffbe;
  color: #000;
}

.position.trap {
  background: #fbffc4;
  color: #000;
}

.position.boss {
  background: black;
  color: #fff;
}

.passed {
  background: #161616 !important;
  color: #919191 !important;
}
</style>
