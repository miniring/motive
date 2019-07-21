<template>
  <div id="todo">
    <el-card class="important">
      {{ active[0] ? active[0].text : '작업을 추가하세요.'}}
    </el-card>
    <todo-list></todo-list>
    <el-timeline :reverse="false" style="margin-top:20px;text-align:left;">
      <el-timeline-item
        v-for="(todo, index) in completed"
        :key="index"
        :timestamp="todo.completedAt">
        {{todo.text}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import {createNamespacedHelpers} from 'vuex'

const {mapGetters} = createNamespacedHelpers('TodoModule')

export default {
  components: {
    'todo-list': () => import('../components/TodoList.vue')
  },
  computed: {
    ...mapGetters(['active', 'completed'])
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

