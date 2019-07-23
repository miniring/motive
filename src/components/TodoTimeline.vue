<template>
  <el-timeline :reverse="false" style="margin-top:20px;text-align:left;">
    <el-timeline-item
      v-for="(todo, index) in completed"
      :key="index"
      :timestamp="todo.completedAt"
    >
      <el-checkbox
        :value="todo.isCompleted"
        @change="updateTodo(todo)">
        {{ todo.text }}
      </el-checkbox>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex'
import { value, onCreated } from 'vue-function-api'
import { Todo } from '../types'
import { store } from '../store'

const { mapGetters } = createNamespacedHelpers('TodoModule')

export default {
  computed: {
    ...mapGetters(['completed', 'active'])
  },
  setup() {
    const updateTodo = (todo: Todo) => {
      store.dispatch('TodoModule/updateTodo', {
        ...todo,
        isCompleted: false,
        ordering: store.getters['TodoModule/active'].length + 1
      })
    }

    return {
      updateTodo
    }
  }
}
</script>

<style>
</style>
