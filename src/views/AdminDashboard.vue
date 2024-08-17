<template>
    <section class="w-[70%] mx-auto flex flex-col gap-y-2 py-10 ">
        <base-spinner :is-loading="isLoading" text="Loading products!"></base-spinner>

        <base-dialog :show="isAddModalOpen" title="Add New Product" @close="isAddModalOpen = false">
            <add-product></add-product>
        </base-dialog>
        <base-dialog :show="isEditModalOpen" title="Edit Product" @close="closeEditModal">
            <edit-product :product="selectedProduct"></edit-product>
        </base-dialog>
        <div class="flex items-center justify-between">
            <p class="text-xl underline underline-offset-2 font-black">Product Catalogue</p>

            <button @click="isAddModalOpen = !isAddModalOpen"
                class="self-end flex items-center gap-x-2 border px-4 py-2 bg-blue-600 hover:bg-blue-300 text-white rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="fill-white w-5 h-5 stroke-[2px]">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                <span>Add Product</span>
            </button>
        </div>

        <div class="grid grid-cols-4 gap-y-10 mt-5 w-full">
            <admin-product-card :products="products" @handleEdit="openEditModal"></admin-product-card>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseDialog from '@/components/BaseDialog.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import AddProduct from '@/components/AddProduct.vue'
import EditProduct from '@/components/EditProduct.vue'
import AdminProductCard from '@/components/AdminProductCard.vue'
import { productService } from '@/services/product.service'

const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const products = ref(null)
const isLoading = ref(false)
const selectedProduct = ref(null)

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

function openEditModal(product) {
    selectedProduct.value = product
    isEditModalOpen.value = true
}

function closeEditModal() {
    isEditModalOpen.value = false
    selectedProduct.value = null
}

onMounted(() => {
  getProducts()
})
</script>
