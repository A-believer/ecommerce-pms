<template>

    <div v-for="(product, index) in props.products" :key="index"
        class="bg-white -hover:translate-x-[2px] hover:translate-y-[2px] shadow-xl w-[220px] rounded-lg text-gray-500 px-3 py-2 transition-all duration-300">
        <div class="flex gap-x-2 mb-2">
            <img class="w-auto h-auto object-contain" :src="product?.image" :alt="product?.name" />
            <button :disabled="isLoading" title="Add to cart" @click="addToCart(product)" class="self-start">
                <add-cart-icon color="fill-black hover:fill-blue-600"></add-cart-icon>
            </button>
        </div>

        <router-link :to="`products/${product?.id}`" class="w-fit ">
            <p class="font-medium hover:underline">{{ product?.name }}</p>
            <p class="text-lg font-bold text-blue-600 mb-2">
                ₦ {{ new Intl.NumberFormat().format(product?.price) }}
            </p>
        </router-link>
    </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import AddCartIcon from './svgs/AddCartIcon.vue';

const productStore = useProductStore()
const isLoading = ref(false)
const toast = useToast()

const props = defineProps({
    products: {
        type: Array,
        require: true
    }
})

function addToCart(data) {
    isLoading.value = true
    try {
        productStore.addToCart(data)
        toast.success(`${data.name} added to cart`)
        isLoading.value = false
    } catch (error) {
        console.error(error)
        isLoading.value = false

    }
}
</script>
