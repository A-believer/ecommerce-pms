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
    <main class="bg-[#eeeeee] min-h-screen relative max-w-">
        <the-header></the-header>
     <div class="max-w-[1440px] w-full mx-auto">
        <router-view></router-view>
     </div>
            
        
    </main>
</template>