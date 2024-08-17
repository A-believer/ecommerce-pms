<template>
    <div v-for="(product, index) in props.products" :key="index"
        class="bg-white -hover:translate-x-[2px] hover:translate-y-[2px] shadow-xl w-[220px] rounded-lg text-gray-500 px-3 py-2 transition-all duration-300">
        <div class="flex gap-x-2 mb-2">
            <img class="w-auto h-auto object-contain" :src="product?.image" :alt="product?.name" />
            <div class="flex flex-col gap-y-2">
                <button title="Edit product" @click="emits('handleEdit', product)">
                    <edit-icon></edit-icon>
                </button>
                <button title="Delete product" @click="emits('handleDelete', product?.id)">
                    <delete-icon></delete-icon>
                </button>
            </div>
        </div>

        <router-link :to="`products/${product?.id}`" class="w-fit ">
            <p class="font-medium hover:underline">{{ product?.name }}</p>
            <p class="text-lg font-bold text-blue-600">
                ₦ {{ new Intl.NumberFormat().format(product?.price) }}
            </p>
            <p class="text-sm mb-2">Quantity: {{ product?.stock }}</p>
        </router-link>
    </div>
</template>

<script setup>
import EditIcon from './svgs/EditIcon.vue';
import DeleteIcon from './svgs/DeleteIcon.vue';

const props = defineProps({
    products: {
        type: Array,
        require: true
    }
})

const emits = defineEmits(['handleEdit', 'handleDelete'])
</script>
