<template>
    <div class="xl:w-[70%] w-[90%] mx-auto flex flex-col gap-y-2 py-10">
        <h2 class="text-xl underline underline-offset-2 font-black">Cart Items</h2>
        <div class="text-center py-10" v-if="productStore.cart.length === 0">Your cart is empty</div>
        <div v-else class="space-y-5 text-gray-600">
            <div v-for="item in productStore.cart" :key="item.id"
                class="border border-[#ddd] md:py-4 py-2 md:px-5 px-2.5 rounded-[8px] grid md:grid-cols-3 grid-cols-2 items-center justify-between relative">
                <div>
                    <h3 class="text-lg font-bold">{{ item.name }}</h3>
                    <div class="md:hidden flex items-center gap-x-2 transition-all duration-500">
                        <button title="decrease quantity" @click="productStore.decreaseCartQuantity(item)"
                            :disabled="item.quantity === 1"
                            class="p-1 bg-white w-fit h-fit rounded-md shadow-lg hover:translate-x-[1px] hover:translate-y-[1px]">
                            <remove-icon></remove-icon>
                        </button>
                        <span>{{ item.quantity }}</span>
                        <button title="increase quantity" @click="productStore.addToCart(item)"
                            class="p-1 bg-white w-fit h-fit rounded-md shadow-lg hover:translate-x-[1px] hover:translate-y-[1px]">
                            <add-icon color="fill-gray-500 w-4 h-4"></add-icon>
                        </button>
                    </div>
                    <p class="font-medium text-sm">Price: <span class="text-lg font-bold">₦{{ new
                            Intl.NumberFormat().format(item.price) }}</span></p>
                </div>

                <div class="md:flex hidden items-center gap-x-2 transition-all duration-500">
                    <button title="decrease quantity" @click="productStore.decreaseCartQuantity(item)"
                        :disabled="item.quantity === 1"
                        class="p-1 bg-white w-fit h-fit rounded-md shadow-lg hover:translate-x-[1px] hover:translate-y-[1px]">
                        <remove-icon></remove-icon>
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button title="increase quantity" @click="productStore.addToCart(item)"
                        class="p-1 bg-white w-fit h-fit rounded-md shadow-lg hover:translate-x-[1px] hover:translate-y-[1px]">
                        <add-icon color="fill-gray-500 w-4 h-4"></add-icon>
                    </button>
                </div>
                <p class="font-medium text-sm">Subtotal: <span class="text-lg font-bold">₦ {{ new
                        Intl.NumberFormat().format(item.price *
                        item.quantity) }}</span></p>
                <button title="remove product" @click="productStore.removeFromCart(item.id)"
                    class="absolute right-1 top-1 p-[3px] bg-white w-fit h-fit rounded-md shadow-lg hover:translate-x-[1px] hover:translate-y-[1px]">
                    <close-icon color="fill-gray-600 hover:fill-gray-400 w-4 h-4"></close-icon>
                </button>
            </div>
            <div class="mt-10 flex flex-col gap-y-3 mr-0 items-end">
                <h3 class="font-medium text-sm">
                    Total:
                    <span class="text-2xl font-bold">₦ {{ new Intl.NumberFormat().format(productStore?.cartTotal)
                        }}</span>
                </h3>
                <button @click="checkout"
                    class="bg-blue-700 px-5 py-3 rounded-lg text-white hover:bg-blue-500 transition-all duration-600 w-fit">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import CloseIcon from '@/components/svgs/CloseIcon.vue'
import AddIcon from '@/components/svgs/AddIcon.vue'
import RemoveIcon from '@/components/svgs/RemoveIcon.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const productStore = useProductStore()
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()
function checkout() {
    if (userStore.user) {
   toast.success('Order completed Successfully!')
    router.push('/products')
    productStore.clearCart()     
    } else {
        router.push('/signin')
        toast.error("You are not logged in!")
    }
    
}
</script>
