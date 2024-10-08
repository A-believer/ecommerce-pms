<template>
  <div class="w-full text-gray-500 text-lg border-b-2 border-gray-500 fixed left-0 top-0 bg-[#eeeeee] z-[99]">
    <base-spinner :is-loading="isLoading" text="Logging out!"></base-spinner>

    <header
      class="flex justify-between items-center max-w-[1440px] md:w-[90%] w-[95%] mx-auto md:pt-7 md:pb-3 py-5 relative">
      <router-link to="/"
        class="md:text-xl text-base italic text-blue-600 hover:underline leading-6 font-black animate-pulse">BUY-A-PHONE</router-link>
      <nav class="gap-x-5 text-lg font-medium lg:flex items-center hidden">
        <router-link to="/" :class="isActive('/') ? 'text-blue-500 underline' : 'text-gray-500'">Home</router-link>
        <router-link to="/products"
          :class="isActive('/products') ? 'text-blue-500 underline' : 'text-gray-500'">Products</router-link>
        <router-link to="/admin_dashboard" v-if="userStore.isAdmin"
          :class="isActive('/admin_dashboard') ? 'text-blue-500 underline' : 'text-gray-500'">Dashboard</router-link>
      </nav>
      <div class="flex items-center md:gap-x-4 gap-x-2">
        <search-comp></search-comp>

        <router-link to="/cart" class="flex items-center gap-x-2 relative">
          <cart-icon></cart-icon>
          <span
            class="absolute top-0 right-0 md:text-xs text-[8px] leading-none font-medium text-white bg-blue-500 rounded-full md:px-1.5 px-1 py-[1px]">{{
            productStore.cartItemCount }}</span>
        </router-link>

        <div v-if="userStore?.user" class="flex items-center gap-x-1 relative font-bold text-base">
          <button @click="isLogoutOpen = !isLogoutOpen"
            class="flex items-center gap-x-1 hover:underline decoration-blue-500">
            <span>{{ userStore?.userData?.name }}</span>
            <user-icon></user-icon>
          </button>

          <div v-if="isLogoutOpen" class="absolute bottom-0 top-10 right-0 rounded-lg">
            <button @click="logOut" class="px-5 py-4 bg-white rounded-lg hover:underline flex items-center gap-x-1">
              <logout-icon></logout-icon>
              <span>Logout</span>
            </button>

          </div>
        </div>
        <div v-else class="md:flex hidden items-center gap-x-2 text-sm">
          <router-link to="/signin"
            class="text-white hover:text-blue-500 border border-blue-500 bg-blue-500 hover:bg-transparent rounded-lg px-3 py-1.5">Login</router-link>
          <router-link to="/signup"
            class="hover:text-white text-blue-500 border border-blue-500 hover:bg-blue-500 bg-transparent rounded-lg px-3 py-1.5">Sign
            Up</router-link>
        </div>

        <div class="md:hidden flex">
          <button v-if="!isOpen" @click="isOpen = true">
            <menu-icon></menu-icon>
          </button>
          <button v-else @click="isOpen = false">
            <close-icon color="hover:fill-blue-500 fill-[#6b7280] h-6 w-6"></close-icon>
          </button>
        </div>
      </div>


      <nav v-if="isOpen"
        class="text-lg font-medium flex flex-col gap-y-5 absolute top-20 right-0 bg-white px-2 py-5 rounded-md border border-gray-500 shadow-lg ">
        <router-link to="/products"
          class="border-b hover:border-gray-500 hover:text-gray-500 hover:underline pb-2 px-8 rounded-b-lg">Products</router-link>
        <router-link v-if="userStore.userData?.role === 'admin'" to="/admin_dashboard"
          class="border-b hover:border-gray-500 hover:text-gray-500 hover:underline pb-2 px-8 rounded-b-lg">Dashboard</router-link>

        <button v-if="userStore.user" @click="logOut"
          class="pb-2 px-8 border-b hover:border-gray-500 hover:text-gray-500 rounded-b-lg hover:underline flex items-center gap-x-1">
          <logout-icon></logout-icon>
          <span>Logout</span>
        </button>
        <div v-else class="flex items-center flex-col gap-y-2 w-full text-sm">
          <router-link to="/signin"
            class="text-white hover:text-blue-500 border border-blue-500 bg-blue-500 hover:bg-transparent rounded-lg py-1.5 w-full text-center">Login</router-link>
          <router-link to="/signup"
            class="hover:text-white text-blue-500 border border-blue-500 hover:bg-blue-500 bg-transparent rounded-lg py-1.5 w-full text-center">Sign
            Up</router-link>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from "vue"
import { useUserStore } from '@/stores/user';
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import BaseSpinner from './BaseSpinner.vue';
import SearchComp from './SearchComp.vue';
import CartIcon from './svgs/CartIcon.vue';
import UserIcon from './svgs/UserIcon.vue';
import LogoutIcon from './svgs/LogoutIcon.vue';
import MenuIcon from './svgs/MenuIcon.vue';
import CloseIcon from './svgs/CloseIcon.vue';

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const productStore = useProductStore()
const isOpen = ref(false)
const isLogoutOpen = ref(false)
const isLoading = ref(false)
const isActive = (path) => {
  return route.path === path
}
async function logOut() {
  isLoading.value = true
  try {
    await authService.logout()
    await userStore.setUser(null)
    router.push("/signin")
    isLoading.value = false
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
}
</script>
