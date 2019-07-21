import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import gql from 'graphql-tag'
import { TodoState, Todo } from '../types'
import { apolloClient } from '../apollo'
import { RootState } from './index'


const todoListQuery = gql`{
  todoList {
    id
    text
    description
    isCompleted
    ordering
  }
}`

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
  mutation updateTodo($id: ID!, $text: String!, $description: String!, $isCompleted: Boolean!, $ordering: Int!) {
    updateTodo(id: $id, text: $text, description: $description, isCompleted: $isCompleted, ordering: $ordering) {
      id
      text
      description
      isCompleted
      ordering
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
    return state.todoList.filter(todo => !todo.isCompleted)
  }
}

const mutations: MutationTree<TodoState> = {
  getTodoList(state, todoList) {
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
    const { data } = await apolloClient.query({query: todoListQuery})
    commit('getTodoList', data.todoList)
  },
  async addTodo({ commit }, {text, description, ordering}) {
    const { data } = await apolloClient.mutate({
      mutation: addTodoMutation,
      variables: {text, description, ordering}
    })
    if (data.addTodo) {
      commit('addTodo', data.addTodo)
    }
    return data.addTodo
  },
  async updateTodo({ commit }, todo: Todo) {
    const { data } = await apolloClient.mutate({
      mutation: updateTodoMutation,
      variables: {id: todo.id, text: todo.text, description: todo.description, isCompleted: todo.isCompleted, ordering: todo.ordering}
    })
    commit('updateTodo', data.updateTodo)
  },
  async deleteTodo({ commit }, todoId: number) {
    const { data } = await apolloClient.mutate({
      mutation: deleteTodoMutation,
      variables: {id: todoId}
    })

    commit('deleteTodo', data.deleteTodo)
  }
}

export const TodoModule: Module<TodoState, RootState> = {
  state, getters, mutations, actions, namespaced: true
}