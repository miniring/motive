import Vuex from 'vuex'
import Vue from 'vue'
import { TodoState } from '../types'
import { TodoModule } from './TodoStore'

Vue.use(Vuex)

export interface RootState {
  TodoModule: TodoState
}

export const store = new Vuex.Store({
  modules: {
    TodoModule
  }
})
