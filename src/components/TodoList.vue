<template>
  <div>
    <ApolloQuery :query="require('../graphql/TodoList.gql')">
      <template v-slot="{ result: { data } }">
        <div v-if="data">
          <div v-for="todo in data.todoList" :key="todo.id">
            {{ todo.text }}
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script lang="ts">
import { value, computed, watch, onMounted } from 'vue-function-api'
export default {
  setup() {
    console.log('todo')
  }
}
</script>

<style scoped></style>
