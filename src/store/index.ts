import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || '[]')
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note)

      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    updateNote(state, {id, description, date}) {
      const notes = state.notes.concat()

      const idx = notes.findIndex(t => t.id === id)
      const note = notes[idx]

      const status = new Date(date) > new Date() ? 'active' : 'outdated'

      notes[idx] = {...note, date, description, status}

      state.notes = notes
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    completeNote(state, id) {
      const idx = state.notes.findIndex(t => t.id === id)
      state.notes[idx].status = 'completed'
      localStorage.setItem('notes', JSON.stringify(state.notes))
    }
  },
  actions: {
    createNote({commit}, note) {
      commit('createNote', note)
    },
    updateNote({commit}, note) {
      commit('updateNote', note)
    },
    completeNote({commit}, id) {
      commit('completeNote', id)
    }
  },
  getters: {
    notes: s => s.notes,
    noteById: s => id => s.notes.find(t => t.id === id)
  }
})
