<template>
    <div class="max-w-md mx-auto p-4 text-xs leading-3">
        <form @submit.prevent="submitForm" class="space-y-4">
            <base-spinner :is-loading="isLoading" text="Adding product!"></base-spinner>
            <div class="flex flex-col gap-y-2">
                <label for="name" class="text-sm font-medium">Product Name</label>
                <input v-model="data.name" type="text" id="name"
                    class="px-2 py-2 w-full border border-gray-500 rounded-md" required />
                <p v-if="error.name" class="text-red-500 text-sm">{{ error.name }}</p>
            </div>

            <div class="flex flex-col gap-y-2">
                <label for="description" class="text-sm font-medium">Description</label>
                <textarea rows="4" v-model="data.description" id="description"
                    class="px-2 py-2 w-full border border-gray-500 rounded-md resize-none" required></textarea>
                <p v-if="error.description" class="text-red-500 text-sm">{{ error.description }}</p>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex flex-col gap-y-2">
                    <label for="price" class="text-sm font-medium">Price</label>
                    <input v-model="data.price" type="number" id="price"
                        class="px-2 py-2 w-full border border-gray-500 rounded-md" required />
                    <p v-if="error.price" class="text-red-500 text-sm">{{ error.price }}</p>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label for="stock" class="text-sm font-medium">Stock Quantity</label>
                    <input v-model="data.stock" type="number" id="stock"
                        class="px-2 py-2 w-full border border-gray-500 rounded-md" required />
                    <p v-if="error.stock" class="text-red-500 text-sm">{{ error.stock }}</p>
                </div>
            </div>

            <div class="flex flex-col gap-y-2">
                <label for="category" class="text-sm font-medium">Category</label>
                <select id="category" name="category" v-model="data.category"
                    class="px-2 py-2 w-full border border-gray-500 rounded-md">
                    <option value="">Select a category</option>
                    <option value="Samsung">Samsung</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Xiaomi">Xiaomi</option>
                </select>
                <p v-if="error.category" class="text-red-500 text-sm">{{ error.category }}</p>
            </div>

            <div class="flex flex-col gap-y-2">
                <label for="image" class="text-sm font-medium">Product Image</label>
                <input @change="handleImageUpload" :value="data.image" type="file" id="image"
                    class="px-2 py-2 w-full border border-gray-500 rounded-md" accept="image/*" required />
                <p v-if="error.image" class="text-red-500 text-sm">{{ error.image }}</p>
            </div>

            <button :disabled="isLoading" type="submit"
                class="bg-blue-500 disabled:bg-gray-600 text-white px-4 py-2 rounded">
                Add Product
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { productService } from '@/services/product.service'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';
import BaseSpinner from './BaseSpinner.vue';

const toast = useToast()
const router = useRouter()
const isLoading = ref(false)
const data = ref({
  name: '',
  description: '',
  price: '',
  category: 'Samsung',
  stock: '',
  image: null
})

const error = ref({
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  image: ''
})

const validateForm = () => {
  error.value = {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  }
  let valid = true

  if (!data.value.name) {
    error.value.name = 'Name is required'
    valid = false
  }

  if (!data.value.description) {
    error.value.description = 'Description is required'
    valid = false
  }

  if (!data.value.price || isNaN(data.value.price) || data.value.price <= 0) {
    error.value.price = 'Valid price is required'
    valid = false
  }

  if (data.value.category === "") {
    error.value.category = 'Category is required'
    valid = false
  }

  if (!data.value.stock || isNaN(data.value.stock) || data.value.stock < 0) {
    error.value.stock = 'Valid stock quantity is required'
    valid = false
  }

  if (!data.value.image) {
    error.value.image = 'Image is required'
    valid = false
  }

  return valid
}

const handleImageUpload = (e) => {
  data.value.image = e.target.files[0]
}

const generateCustomId = async () => {
  const docs = await productService.getAllProducts()
  return `product_${docs.length + 1}`
}

const submitForm = async () => {
  if (!validateForm()) {
    return toast.error('fill the invalid fields')
  }
  isLoading.value = true
  try {
    const imageUrl = await productService.uploadProductImage(data.value.image)
    const productId = await generateCustomId()
    await productService.addProduct(productId, {
      id: productId,
      name: data.value.name,
      description: data.value.description,
      price: data.value.price,
      category: data.value.category,
      stock: data.value.stock,
      image: imageUrl
    })
    isLoading.value = false
    router.push("/admin_dashboard")
    resetForm()
    toast.success('product added successfully!')
  } catch (error) {
    console.error(error)
    isLoading.value = false

  }
}

const resetForm = () => {
  data.value = {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  }
}
</script>
