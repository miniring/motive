export interface TodoState {
  todoList: Todo[]
}

export interface Todo {
  id: string
  text: string
  description: string
  isCompleted: boolean
  ordering: number
}

export type TodoList = Todo[]