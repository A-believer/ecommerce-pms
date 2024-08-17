<template>
    <section class="xl:w-[70%] w-[90%] mx-auto flex flex-col gap-y-2 py-10">
        <base-spinner :is-loading="isLoading" text="Loading products!"></base-spinner>
        <div v-if="!isLoading">
          <div class="flex flex-col gap-y-5">
            <p class="text-xl underline underline-offset-2 font-black sm:text-left text-center">Our Products</p>
            <div class="sm:self-end flex sm:items-center sm:flex-row flex-col gap-x-4">
                <p class="sm:self-end">Filter By:</p>
                <div class="flex flex-col gap-y-2 text-sm">
                    <p class="text-xs font-bold italic">Category</p>
                    <select class="text-gray-500 w-fit py-1 pl-2 pr-3 outline-none rounded-md cursor-pointer"
                        name="category" id="category" v-model="category">
                        <option class="mx-3 py-2" value="All">All</option>
                        <option class="mx-3 py-2" value="Samsung">Samsung</option>
                        <option class="mx-3 py-2" value="iPhone">iPhone</option>
                        <option class="mx-3 py-2" value="Xiaomi">Xiaomi</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-2 text-sm">
                    <p class="text-xs font-bold italic">Price Range</p>
                    <select name="price-range" id="price-range" v-model="priceRange"
                        class="text-gray-500 w-fit py-1 pl-2 pr-3 outline-none rounded-md cursor-pointer">
                        <option class="mx-3 py-2" value="All Prices">All Prices</option>
                        <option class="mx-3 py-2" value="Below ₦200,000">Below ₦200,000</option>
                        <option class="mx-3 py-2" value="₦200,000-₦299,999">₦200,000 - ₦299,999</option>
                        <option class="mx-3 py-2" value="₦300,000-₦399,999">₦300,000 - ₦399,999</option>
                        <option class="mx-3 py-2" value="₦400,000-₦499,999">₦400,000 - ₦499,999</option>
                        <option class="mx-3 py-2" value="₦500,000-₦599,999">₦500,000 - ₦599,999</option>
                        <option class="mx-3 py-2" value="₦600,000-₦699,999">₦600,000 - ₦699,999</option>
                        <option class="mx-3 py-2" value="₦700,000-₦799,999">₦700,000 - ₦799,999</option>
                        <option class="mx-3 py-2" value="₦800,000-₦899,999">₦800,000 - ₦899,999</option>
                        <option class="mx-3 py-2" value="Above ₦900,000">Above ₦900,000</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="grid xl:grid-cols-4 xl:gap-x-6 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-2 mt-5 w-full" v-if="filteredProduct?.length > 0">
            <product-card :products="filteredProduct"></product-card>
        </div>
        <p v-else class="py-10 text-center text-2xl font-medium italic text-gray-500">
            No product found...
        </p>  
        </div>
        
    </section>
</template>

<script setup>
import { productService } from '@/services/product.service'
import { computed, onMounted, ref } from 'vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ProductCard from '@/components/ProductCard.vue'

const products = ref(null)
const isLoading = ref(false)
const category = ref('All')
const priceRange = ref('All Prices')
const filteredProduct = computed(() => {
    return filterByCategory(filterByPrice(products.value))
})

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

function filterByPrice(product) {
    let data = []
    if (priceRange.value === 'Below ₦200,000') {
        data = product.filter((prod) => prod.price < 200000)
    } else if (priceRange.value === '₦200,000-₦299,999') {
        data = product.filter((prod) => prod.price >= 200000 && prod.price <= 299999)
    } else if (priceRange.value === '₦300,000-₦399,999') {
        data = product.filter((prod) => prod.price >= 300000 && prod.price <= 399999)
    } else if (priceRange.value === '₦400,000-₦499,999') {
        data = product.filter((prod) => prod.price >= 400000 && prod.price <= 499999)
    } else if (priceRange.value === '₦500,000-₦599,999') {
        data = product.filter((prod) => prod.price >= 500000 && prod.price <= 599999)
    } else if (priceRange.value === '₦600,000-₦699,999') {
        data = product.filter((prod) => prod.price >= 600000 && prod.price <= 699999)
    } else if (priceRange.value === '₦700,000-₦799,999') {
        data = product.filter((prod) => prod.price >= 700000 && prod.price <= 799999)
    } else if (priceRange.value === '₦800,000-₦899,999') {
        data = product.filter((prod) => prod.price >= 800000 && prod.price <= 899999)
    } else if (priceRange.value === 'Above ₦900,000') {
        data = product.filter((prod) => prod.price >= 900000)
    } else {
        data = product
    }
    return data
}

function filterByCategory(product) {
    let data = []
    if (category.value === 'Samsung') {
        data = product.filter((prod) => prod.category === 'Samsung')
    } else if (category.value === 'iPhone') {
        data = product.filter((prod) => prod.category === 'iPhone')
    } else if (category.value === 'Xiaomi') {
        data = product.filter((prod) => prod.category === 'Xiaomi')
    } else {
        data = product
    }
    return data
}

onMounted(() => {
    getProducts()
})
</script>
