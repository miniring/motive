<template>
  <div class="todo">
    <el-card class="important">
      {{ active[0] && active[0].text }}
    </el-card>
    <todo-list></todo-list>    
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

