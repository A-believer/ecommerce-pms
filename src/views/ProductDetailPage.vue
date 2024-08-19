<template>
    <section class="md:w-[70%] w-[90%] mx-auto  py-10  mt-10">
        <base-spinner :is-loading="isLoading" text="Getting product!!"></base-spinner>
        <div v-if="!isLoading" class="flex md:flex-row flex-col items-center justify-between gap-y-5 gap-x-20">
            <img :src="product?.image" alt="" class="w-[300px] h-auto flex-2" />
            <div class="space-y-5 flex-1">
                <p class="text-2xl font-black text-gray-500 hover:text-gray-700">{{ product?.name }}</p>
                <p class="text-lg hover:underline transition-all duration-700">{{ product?.description }}</p>
                <p class="text-xl font-bold text-blue-600">₦ {{ new Intl.NumberFormat().format(product?.price) }}</p>
                <button title="Add to cart" :disabled="isLoading" @click="addToCart(product)"
                    class="flex items-center gap-x-2 font-medium text-white bg-blue-700 hover:bg-blue-500 py-3 px-4 rounded-md transition-all dura">
                    <add-cart-icon color="fill-white"></add-cart-icon>
                    <span>Add to cart</span>
                </button>
            </div>
        </div>


    </section>
</template>

<script setup>
import { productService } from '@/services/product.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseSpinner from '@/components/BaseSpinner.vue';
import { useProductStore } from '@/stores/product';
import { useToast } from 'vue-toastification';
import AddCartIcon from '@/components/svgs/AddCartIcon.vue';

const route = useRoute()
const product = ref(null)
const isLoading = ref(false)
const productStore = useProductStore()
const toast = useToast()

async function getDetails() {
    isLoading.value = true
    try {
        console.log(route.params.id)
        const data = await productService.getProductById(route.params.id)
        if (data) {
            product.value = data
            isLoading.value = false
        }
    } catch (error) {
        console.error(error)
        isLoading.value = false
    }
}

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


getDetails()

</script>