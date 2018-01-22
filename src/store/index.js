import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    searchObject: {},
    searchResults: [],
    loading: false
  },
  mutations: {
    setSearchObject (state, payload) {
      state.searchObject = payload
    },
    setSearchResults (state, payload) {
      console.log('mutation', payload)
      state.searchResults.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setSearchObject ({commit}, payload) {
      payload = {
        "zipCode": "89147",
        "delivery":	true,
        "type":	"Pizza",
        "price":	"1"
      }
      commit('setLoading', true)
      commit('setSearchObject', payload)
      commit('setSearchResults', ["test","test"])
      // axios.post('/restaurant', payload)
      //   .then(function (response) {
      //     commit('setSearchResults', response.data.businesses)
      //     commit('setLoading', false)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //     commit('setLoading', false)
      //   })
    },
    setSearchResults ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setSearchResults', payload)
      commit('setLoading', false)
    }
  },
  getters: {
    searchObject (state) {
      return state.searchObject
    },
    searchResults (state) {
      return state.searchResults
    }
  }
})
