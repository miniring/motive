<template>
  <div>
    <ul id="todo-list">
      <draggable v-model="activeTodoList">
        <li v-for="todo in activeTodoList" 
          :key="todo.id">
          <todo-item :todo="todo" />
        </li>
      </draggable>
    </ul>
    <todo-add />
  </div>
</template>

<script lang="ts">
import { store } from '../store'
import { computed, onCreated } from 'vue-function-api'
import TodoItem from './TodoItem.vue'
import TodoAdd from './TodoAdd.vue'
import draggable from 'vuedraggable'


function useTodo() {
  const activeTodoList = computed(
    () => store.getters['TodoModule/active'],
    value => {
      store.commit('TodoModule/updateTodoList', value)
    }
  )
  onCreated(() => {
    store.dispatch('TodoModule/getTodoList')
  })

  return  {
    activeTodoList
  }
}

export default {
  components: { TodoItem, TodoAdd, draggable },
  setup(props) {
    return {
      ...useTodo()
    }
  }
}
</script>

<style scoped>
#todo-list li{
  min-height: 24px;
  font-size: 14px;
  color: #333;
  list-style: none;
  padding: 9px 16px 9px 5px;
  -webkit-transition: color .1s ease-in,background-color .1s ease-in;
  transition: color .1s ease-in,background-color .1s ease-in;
  line-height: 1.25;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

</style>
