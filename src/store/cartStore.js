import { defineStore } from "pinia";


export const useCartStore= defineStore('cart', {
    state: () => ({
        products: {}
    }),
    getters: {},
    actions: {
        add(payload) {
            console.log(payload);
        }
    }
});