<template>
  <section class="xl:w-[70%] w-[90%] mx-auto flex flex-col gap-y-2 py-10">
    <base-spinner :is-loading="isLoading" text="Loading products!"></base-spinner>

    <base-dialog :show="isAddModalOpen" title="Add New Product" @close="isAddModalOpen = false">
      <add-product></add-product>
    </base-dialog>
    <base-dialog :show="isEditModalOpen" title="Edit Product" @close="closeEditModal">
      <edit-product :product="selectedProduct"></edit-product>
    </base-dialog>
    <div class="flex items-center sm:flex-row flex-col gap-y-5 justify-between">
      <p class="text-xl underline underline-offset-2 font-black">Product Catalogue</p>

      <button @click="isAddModalOpen = true"
        class="self-end flex items-center gap-x-2 border px-4 py-2 bg-blue-600 hover:bg-blue-300 text-white rounded-md">
        <add-icon color="fill-white h-6 h-6"></add-icon>
        <span>Add Product</span>
      </button>
    </div>

    <div class="grid xl:grid-cols-4 xl:gap-x-6 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-2 mt-5 w-full">
      <admin-product-card :products="products" @handleEdit="openEditModal"
        @handleDelete="deleteProduct"></admin-product-card>
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
import AddIcon from '@/components/svgs/AddIcon.vue'

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

async function deleteProduct(id) {
  try {
    await productService.deleteProduct(id)
    getProducts()
  } catch (error) {
    console.error('error deleting product', error)
  }
}

onMounted(() => {
  getProducts()
})
</script>
