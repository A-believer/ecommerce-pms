<template>
    <section class="relative overflow-hidden md:h-[calc(100vh-70px)]  h-[calc(100vh-56px)]">
        <slide-image></slide-image>
        <div class="absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center flex-col gap-y-4 py-10">
            <div class="flex flex-col gap-y-2 text-center">
                <p class="md:text-6xl text-5xl text-blue-500 font-black italic">Buy-A-Phone</p>
                <p class="text-white text-sm md:tracking-[0.4em] tracking-[0.2em]">Quality Phones, Affordable Prices</p>
            </div>
            <div class="relative md:w-[60%] w-[80%] space-y-2">
                <div
                    class="w-full bg-white md:px-4 px-2.5 md:py-2 py-1 rounded-md border-2 focus:border-2 focus:border-blue-500 active:border-2 active:border-blue-500 text-sm">
                    <input type="text" id="search" v-model="searchQuery" @input="fetchProducts"
                        placeholder="search phone name" class="border-none outline-none ring-none bg-transparent w-full" />
                    <button class="absolute right-2">
                        <search-icon></search-icon>
                    </button>
                </div>
                <div v-if="searchQuery"
                    class="absolute bg-white  right-0 md:h-fit rounded-md border border-gray-500 shadow-xl z-[999]">
                    <p v-if="isLoading" class="py-4 text-center italic animate-pulse">Searching...</p>
                    <p class="py-4 text-center italic" v-else-if="searchProducts.length === 0">
                        No result for your search
                    </p>
                    <div v-else class="space-y-4">
                        <div @click="goToProduct(product.id)" v-for="(product, index) in searchProducts" :key="index"
                            class="border-b border-gray-500 text-gray-500 flex items-center justify-between gap-x-3 text-sm font-bold px-3 py-3">
                            <div class="flex items-center gap-x-2">
                                <img :src="product?.image" :alt="product.name" class="w-10 h-14">
                                <p class="flex flex-col gap-y-1">
                                    <span>{{ product.name }}</span>
                                    <span class="text-xs font-thin">{{ product.description.slice(0, 50) + "..."
                                        }}</span>
                                </p>

                            </div>

                            <button @click="goToProduct(product.id)" class="hover:underline text-sm font-medium">See
                                more</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section>
</template>

<script setup>
import SlideImage from '@/components/SlideImage.vue';
import { ref } from 'vue'
import { productService } from '@/services/product.service'
import SearchIcon from '@/components/svgs/SearchIcon.vue'
import { useRouter } from 'vue-router';

const searchProducts = ref([])
const router = useRouter()
const isLoading = ref(false)
const searchQuery = ref('')

async function fetchProducts() {
    isLoading.value = true
    try {
        const data = await productService.getAllProducts()
        searchProducts.value = filterProduct(data)
        console.log(searchProducts.value)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

function filterProduct(products) {
    if (searchQuery.value) {
        const searchRegex = new RegExp(
            searchQuery.value
                .split(' ')
                .map((word) => `\\b${word}`)
                .join('.*'),
            'i'
        )
        const filteredProducts = products.filter((product) => searchRegex.test(product.name))
        return filteredProducts
    }
}

function goToProduct(id) {
    router.push(`/products/${id}`)
    searchQuery.value = ""
}
</script>