<template>
  <div v-if="!isActive('/')">
    <div
      class="sm:flex hidden items-center bg-white md:px-3 px-1.5 md:py-2 py-1 rounded-md border-2 focus:border-2 focus:border-blue-500 active:border-2 active:border-blue-500 text-sm">
      <input type="text" id="search" v-model="searchQuery" @input="fetchProducts" placeholder="search product name"
        class="border-none outline-none ring-none bg-transparent" />
      <button>
        <search-icon></search-icon>
      </button>
    </div>

    <div v-if="searchQuery"
      class="absolute top-20 bg-white md:w-[400px] right-0 md:h-fit rounded-md border border-gray-500 shadow-xl">
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
              <span class="text-xs font-thin">{{ product.description.slice(0, 50) + "..." }}</span>
            </p>

          </div>

          <button @click="goToProduct(product.id)" class="hover:underline text-sm font-medium">See more</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { productService } from '@/services/product.service'
import SearchIcon from './svgs/SearchIcon.vue'
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const searchProducts = ref([])
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const searchQuery = ref('')
const isActive = (path) => {
  return route.path === path
}

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
    searchQuery.value =  ""
}
</script>
