<template>
    <div class="transition-opacity duration-1000 relative w-full h-full">
            <div v-for="(image, index) in images" :key="index"
                :class="`${currentSlide === index ? 'block' : 'hidden'} h-full w-full`">
                <img :src="currentSlide === index && image" alt="" class="w-full h-full object-cover">
            </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import img1 from "/home-bg.jpg"
import img2 from "/home-bg2.jpg"
import img3 from "/home-bg3.jpg"
import img4 from "/home-bg4.jpg"
import img5 from "/home-bg5.jpg"
import img6 from "/home-bg6.jpg"


const images = ref([
    img1,
    img3,
    img4,
    img5,
    img6,
    img2,
])

const currentSlide = ref(0);

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.value.length;
};


let slideInterval;

onMounted(() => {
    slideInterval = setInterval(nextSlide, 7000); // Change slide every 10 seconds
});

onUnmounted(() => {
    clearInterval(slideInterval);
});
</script>

<style lang="scss" scoped></style>