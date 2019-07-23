<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="할 일 추가하기"
      v-model="textInput"
      @keyup.native.enter="addTodo">
      <template slot="append">
        <span @click="addTodo">추가</span>
      </template>
    </el-input>
  </div>
</template>

<script>
import { store } from '../store'
import { value, computed } from 'vue-function-api'
import { Message } from 'element-ui'

export default {
  setup() {
    const textInput = value('')
    const activeTodoList = computed(() => store.getters['TodoModule/active'])

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

    return {
      textInput,
      addTodo
    }
  }
}
</script>

<style>

</style>
