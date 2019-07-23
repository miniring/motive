<template>
  <div>
    <template v-if="!editing">
      <el-checkbox v-model="checkValue" @change="checkChange" />
      <span class="todo-name" @click="editing = true">{{ todo.text }}</span>
    </template>
    <template v-else>
      <el-form ref="form" label-width="80px" @submit.native.prevent="updateTodo">
        <el-form-item label="제목">
          <el-input
              style="width:350px;"
              ref="input"
              v-model="textInput"
              @keydown.native.enter="updateTodo"
            />
        </el-form-item>
        <el-form-item label="내용">
          <el-input v-model="description" type="textarea" rows="5" />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button @click="updateTodo">수정</el-button>
            <el-button @click="editing = false">취소</el-button>
            <el-button @click="deleteTodo">삭제</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script lang="ts">
import { store } from '../store'
import { Todo } from '../types'
import { value, onCreated } from 'vue-function-api'

interface props {
  todo: Todo
}

export default {
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  },
  setup({todo}: props) {
    const editing = value(false)
    const textInput = value(todo.text)
    const description = value(todo.description)
    const checkValue = value(todo.isCompleted)

    const updateTodo = () => {
      store.dispatch('TodoModule/updateTodo', {
        ...todo,
        text: textInput.value,
        description: description.value
      })
      editing.value = false
    }

    const checkChange = (val: Boolean) => {
      const date = new Date()
      const dateString = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
      store.dispatch('TodoModule/updateTodo', {
        ...todo,
        isCompleted: val,
        completedAt: dateString
      })
    }

    const deleteTodo = () => {
      store.dispatch('TodoModule/deleteTodo', todo.id)
    }

    return {
      editing,
      textInput,
      description,
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
