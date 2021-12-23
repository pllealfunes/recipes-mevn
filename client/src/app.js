import Cart from '@/common/cart.js';

export const axios = require('axios').create({
    baseURL: process.env.VUE_APP_API_URL ?? 'http://localhost:8080/',
    responseType: 'json',
    withCredentials: true
})

export const cart = new Cart();