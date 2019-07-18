<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
  components: {
    'todo-list': () => import('../components/TodoList.vue')
  }
}
</script>
