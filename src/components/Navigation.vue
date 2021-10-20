<template>
  <ul class="menu-list">
    <li>
      <router-link class="button" to="/">Início</router-link>
    </li>
    <li>
      <router-link class="button" to="/1">Herói</router-link>
    </li>
    <li>
      <router-link class="button" to="/2">Monstros</router-link>
    </li>
    <li>
      <router-link class="button" to="/3">Mapas</router-link>
    </li>
    <li>
      <router-link class="button" to="/4">Jogar</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navigation'
};
</script>

<style>
.menu-list {
  display: flex;
}
.menu-list li {
  margin-left: 10px;
  color: #3a51bb;
}
.router-link-active {
  outline: 3px solid rgba(58, 82, 187, 0.301);
}
</style>
