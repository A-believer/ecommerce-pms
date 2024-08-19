<script setup>
import TheHeader from './components/TheHeader.vue';
import {onMounted} from "vue"
import { auth } from './firebase';
import { useUserStore } from './stores/user';
import { onAuthStateChanged } from 'firebase/auth';

const user = useUserStore()
onMounted(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            await user.setUser(firebaseUser);
        } else {
            await user.setUser(null);
        }
    });
});
</script>

<template>
    <main class="bg-[#eeeeee] relative max-w-">
        <the-header></the-header>
        <div
            class="max-w-[1520px] w-full mx-auto md:mt-[70px] mt-14 md:min-h-[calc(100vh-70px)] min-h-[calc(100vh-56px)]">
            <router-view></router-view>
        </div>


    </main>
</template>