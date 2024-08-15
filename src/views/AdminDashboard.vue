<template>
    <section class="w-[60%] mx-auto flex flex-col gap-y-2 mt-10">
        <base-dialog :show="isAddModalOpen" title="Add New Product" @close="isAddModalOpen = false">
            <add-product></add-product>
        </base-dialog>
        <p class="text-xl underline underline-offset-2 font-black">Product Catalogue</p>

        <button @click="isAddModalOpen = !isAddModalOpen"
            class="self-end flex items-center gap-x-2 border px-4 py-2 bg-blue-300 hover:bg-white text-gray-700 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="fill-gray-700 w-5 h-5">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            <span>Add</span>
        </button>
        <div>
            <admin-product-card :products="products"></admin-product-card>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseDialog from '@/components/BaseDialog.vue'
import AddProduct from '@/components/AddProduct.vue'
import AdminProductCard from '@/components/AdminProductCard.vue'
import { productService } from '@/services/product.service'

const isAddModalOpen = ref(false)
const products = ref(null)

async function getProducts() {
    const data = await productService.getAllProducts()
    products.value = data
    console.log(products.value?.name)
}

onMounted(() => {
    getProducts()
})

</script>
