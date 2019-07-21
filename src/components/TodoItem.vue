<template>
  <div>
    <template v-if="!editing">
      <el-checkbox 
        v-model="checkValue"
        @change="checkChange">
      </el-checkbox>
      <span class="todo-name"
        @click="editing = true">
        {{ todo.text }}
      </span>
    </template>
    <template v-else>
      <el-input 
        style="width:350px;"
        ref="input"
        v-model="textInput"
        @keydown.native.enter="updateTodo"
        v-focus="editing">
      </el-input>
      <el-button-group>
        <el-button @click="updateTodo">수정</el-button>
        <el-button @click="editing = false">취소</el-button>
        <el-button @click="deleteTodo">삭제</el-button>
      </el-button-group>
    </template>
  </div>
  
</template>

<script lang="ts">
import { store } from '../store'
import { Todo } from '../types'
import { value, computed, watch, onMounted, onCreated } from 'vue-function-api'

export default {
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          context.$refs.input.focus()
        })
      }
    }
  },
  setup(props, {emit}) {
    const todo = props.todo
    const editing = value(false)
    const textInput = value(todo.text)
    const checkValue = value(todo.isCompleted)

    const updateTodo = () => {
      store.dispatch('TodoModule/updateTodo', {...todo, text: textInput.value})
      editing.value = false
    }
    
    const checkChange = (val) => {
      const date = new Date()
      const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      store.dispatch('TodoModule/updateTodo', {...todo, isCompleted: val, completedAt: dateString})
    }

    const deleteTodo = () => {
      store.dispatch('TodoModule/deleteTodo', todo.id)
    }

    return {
      editing,
      textInput,
      checkValue,
      updateTodo,
      checkChange,
      deleteTodo
    }
  }
}
</script>

<style scoped>
.todo-name {
  margin-left: -22px;
  margin-top: -2px;
}

</style>
