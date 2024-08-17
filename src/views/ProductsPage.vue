<template>
    <section class="w-[70%] mx-auto flex flex-col gap-y-2 py-10 ">
        <base-spinner :is-loading="isLoading" text="Loading products!"></base-spinner>
        <p class="text-xl underline underline-offset-2 font-black">Product Catalogue</p>
        <div class="grid grid-cols-4 gap-y-10 mt-5 w-full">
            <product-card :products="products"></product-card>
        </div>
    </section>
</template>

<script setup>
import { productService } from '@/services/product.service';
import { onMounted, ref } from 'vue';
import BaseSpinner from '@/components/BaseSpinner.vue';
import ProductCard from '@/components/ProductCard.vue';

const products = ref(null)
const isLoading = ref(false)

async function getProducts() {
    isLoading.value = true
    try {
        const data = await productService.getAllProducts()
        products.value = data
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

onMounted(() => {
    getProducts()
})
</script>