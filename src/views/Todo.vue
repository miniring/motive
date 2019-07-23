<template>
  <div id="todo">
    <el-card class="important">{{ active[0] ? active[0].text : '작업을 추가하세요.'}}</el-card>
    <todo-list></todo-list>
    <todo-timeline></todo-timeline>
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('TodoModule')

export default {
  components: {
    'todo-list': () => import('../components/TodoList.vue'),
    'todo-timeline': () => import('../components/TodoTimeline.vue')
  },
  computed: {
    ...mapGetters(['active'])
  }
}
</script>

<style scoped>
.important {
  width: 350px;
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>

