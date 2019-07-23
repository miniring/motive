import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import gql from 'graphql-tag'
import { TodoState, Todo } from '../types'
import { apolloClient } from '../apollo'
import { RootState } from './index'

const todoListQuery = gql`
  {
    todoList {
      id
      text
      description
      isCompleted
      ordering
      completedAt
    }
  }
`

const addTodoMutation = gql`
  mutation addTodo($text: String!, $description: String, $ordering: Int) {
    addTodo(text: $text, description: $description, ordering: $ordering) {
      id
      text
      isCompleted
      ordering
    }
  }
`
const updateTodoMutation = gql`
  mutation updateTodo(
    $id: ID!
    $text: String!
    $description: String!
    $isCompleted: Boolean!
    $ordering: Int!
    $completedAt: String
  ) {
    updateTodo(
      id: $id
      text: $text
      description: $description
      isCompleted: $isCompleted
      ordering: $ordering
      completedAt: $completedAt
    ) {
      id
      text
      description
      isCompleted
      ordering
      completedAt
    }
  }
`

const deleteTodoMutation = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      text
      description
      isCompleted
      ordering
    }
  }
`

const state: TodoState = {
  todoList: []
}

const getters: GetterTree<TodoState, RootState> = {
  all(state) {
    return state.todoList
  },
  active(state) {
    const todoList = state.todoList.filter(todo => !todo.isCompleted)
    todoList.sort((a, b) => {
      if (a.ordering > b.ordering) {
        return 1
      }

      if (a.ordering < b.ordering) {
        return -1
      }
      return 0
    })
    return todoList
  },
  completed(state) {
    return state.todoList.filter(todo => todo.isCompleted)
  }
}

const mutations: MutationTree<TodoState> = {
  updateTodoList(state, todoList) {
    state.todoList = todoList
  },
  addTodo(state, todo) {
    state.todoList.push(todo)
  },
  deleteTodo(state, todo) {
    const index = state.todoList.findIndex(item => item.id === todo.id)
    state.todoList.splice(index, 1)
  },
  updateTodo(state, todo) {
    const index = state.todoList.findIndex(item => item.id === todo.id)
    state.todoList.splice(index, 1, todo)
  }
}

const actions: ActionTree<TodoState, RootState> = {
  async getTodoList({ commit }) {
    const { data } = await apolloClient.query({ query: todoListQuery })
    commit('updateTodoList', data.todoList)
  },
  async addTodo({ commit }, { ...todo }) {
    const { data } = await apolloClient.mutate({
      mutation: addTodoMutation,
      variables: { ...todo }
    })
    if (data.addTodo) {
      commit('addTodo', data.addTodo)
    }
    return data.addTodo
  },
  async updateTodo({ commit }, { ...todo }) {
    const { data } = await apolloClient.mutate({
      mutation: updateTodoMutation,
      variables: { ...todo }
    })
    commit('updateTodo', data.updateTodo)
  },
  async deleteTodo({ commit }, todoId: number) {
    const { data } = await apolloClient.mutate({
      mutation: deleteTodoMutation,
      variables: { id: todoId }
    })

    commit('deleteTodo', data.deleteTodo)
  }
}

export const TodoModule: Module<TodoState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
