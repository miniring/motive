import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'todo' }
    },
    {
      path: '/todo',
      name: 'todo',
      component: () =>
        import('./views/Todo.vue')
    },
    {
      path: '/habbit',
      name: 'habbit',
      component: () =>
        import('./views/Habbit.vue')
    },
    {
      path: '/mission',
      name: 'mission',
      component: () =>
        import('./views/Mission.vue')
    },
    {
      path: '/value',
      name: 'value',
      component: () =>
        import('./views/Value.vue')
    }
  ]
})
