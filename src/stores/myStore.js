import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({ count: 33 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})