import { defineStore } from "pinia";


export const useAuthStore= defineStore('auth', {
    state: () => ({
       email: "",
       accessToken: ""
    }),
    getters: {
        isLoggedIn(state){
            return state.email && state.accessToken ? true : false;
        }
    },
    actions: {
        loginUser(payload) {
            this.email = payload.email;
            this.accessToken = payload.token;
        }
    }
});