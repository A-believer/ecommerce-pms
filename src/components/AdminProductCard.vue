<template>
    <div v-for="(product, index) in props.products" :key="index"
        class="bg-white -hover:translate-x-[2px] hover:translate-y-[2px] shadow-xl w-[220px] rounded-lg text-gray-500 px-3 py-2 transition-all duration-300">
        <base-dialog :show="isEditModalOpen" title="Add New Product" @close="isEditModalOpen = false">
            <add-product></add-product>
        </base-dialog>
        <div class="flex gap-x-2 mb-2">
            <img class="w-auto h-auto object-contain" :src="product?.image" :alt="product?.name" />
            <div class="flex flex-col gap-y-2">
                <button title="Edit" @click="emits('handleEdit')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                        class="w-7 h-7 fill-gray-500 hover:fill-black">
                        <path
                            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                    </svg>
                </button>
                <button title="Delete" @click="emits('handleDelete')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 fill-red-500 hover:fill-red-400"
                        viewBox="0 -960 960 960">
                        <path
                            d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                    </svg>
                </button>
            </div>
        </div>

        <router-link :to="`products/${product?.id}`" class="w-fit ">
            <p class="font-medium hover:underline">{{ product?.name }}</p>
            <p class="text-lg font-bold text-blue-600">
                ₦ {{ new Intl.NumberFormat().format(product?.price) }}
            </p>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
    products: {
        type: Array,
        require: true
    }
})
const emits = defineEmits(['handleEdit', 'handleDelete'])
const isEditModalOpen = ref(false)
</script>
