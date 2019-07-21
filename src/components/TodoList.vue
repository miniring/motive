<template>
  <div>
    <ul id="todo-list">
      <li v-for="todo in activeTodoList" 
        :key="todo.id">
        <todo-item 
          :todo="todo"
        />
      </li>
    </ul>
    <div style="margin-top: 15px;">
      <el-input placeholder="할 일 추가하기" v-model="textInput" @keydown.native.enter="addTodo">
        <template slot="append">
          <span @click="addTodo">추가</span>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '../store'
import { TodoList, TodoState, Todo } from '../types'
import { value, state, computed, watch, onMounted, onCreated } from 'vue-function-api'
import TodoItem from './TodoItem.vue'
import { Message } from 'element-ui'


function useTodo() {
  const todoList = computed(() => store.state.TodoModule.todoList)
  const activeTodoList = computed(() => todoList.value.filter(todo => !todo.isCompleted))
  const textInput = value('')

  const validate = () => {
    if (activeTodoList.value.length >= 5) {
      Message({
        type: 'warning',
        message: '오늘 할 일은 5개 이상 추가할 수 없습니다.'
      })
      return false
    }
    return true
  }

  const addTodo = async () => {
    if (!validate()) {
      return
    }

    await store.dispatch('TodoModule/addTodo', {
      text: textInput.value,
      description: '',
      ordering: activeTodoList.value.length + 1
    })
    textInput.value = ''
  }

  onCreated(() => {
    store.dispatch('TodoModule/getTodoList')
  })

  return  {
    activeTodoList,
    textInput,
    addTodo
  }
}

export default {
  components: { TodoItem },
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
