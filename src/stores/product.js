/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

export const useProductStore = defineStore('product', () => {
  const toast = useToast()
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
  const cartTotal = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )
  const cartItemCount = computed(() => cart.value.reduce((count, item) => count + item.quantity, 0))

  watch(
    cart,
    (newCart) => {
      localStorage.setItem('cart', JSON.stringify(newCart))
    },
    { deep: true }
  )

  function addToCart(product) {
    const existingItem = cart.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
      toast.success("+1")
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  function decreaseCartQuantity(product) {
    const existingItem = cart.value.find((item) => item.id === product.id)
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1
      toast.info("-1")
    } else {
      removeFromCart(product.id)
    }
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter((item) => item.id !== productId)
    toast.info("Removed Successfully!")
  }

  function clearCart() {
    cart.value = []
  }

  return {
    cart,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    cartItemCount,
    decreaseCartQuantity
  }
})
