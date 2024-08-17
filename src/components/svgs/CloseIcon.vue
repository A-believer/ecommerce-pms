<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" :class="`${props.color}`">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
</template>

<script setup>
const props = defineProps({
    color: String
})
</script>

