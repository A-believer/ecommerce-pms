<template>
  <div class="w-full text-gray-500 text-lg border-b-2 border-gray-500">
    <header class="flex justify-between items-center md:w-[90%] w-[95%] mx-auto md:pt-7 md:pb-3 py-5">
      <router-link to="/" class="md:text-xl text-base italic text-blue-600 leading-6 font-bold">PMS-APP</router-link>
      <nav class="space-x-5 text-lg font-medium md:block hidden">
        <router-link to="/" :class="isActive('/') ? 'text-blue-500 underline' : 'text-gray-500'">Home</router-link>
        <router-link to="/products"
          :class="isActive('/products') ? 'text-blue-500 underline' : 'text-gray-500'">Products</router-link>
        <router-link to="/admin_dashboard" v-if="user.isAdmin"
          :class="isActive('/admin_dashboard') ? 'text-blue-500 underline' : 'text-gray-500'">Dashboard</router-link>
      </nav>
      <div class="flex items-center md:gap-x-4 gap-x-2">
        <div
          class="flex items-center bg-white md:px-3 px-1.5 md:py-2 py-1 rounded-md border-2 focus:border-2 focus:border-blue-500 active:border-2 active:border-blue-500 text-sm">
          <input type="text" id="search" v-model="search" placeholder="enter product name"
            class="border-none outline-none ring-none bg-transparent" />
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"
            class="cursor-pointer">
            <path
              d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>

        <router-link to="/cart" class="flex items-center gap-x-2 relative">
          <svg class="md:w-8 md:h-8 w-6 h-6" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960"
            width="28px" :fill="isActive('/cart') ? '#60a5fa' : '#6b7280'">
            <path
              d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
          </svg>
          <span
            class="absolute top-0 right-0 md:text-xs text-[6px] leading-none font-medium text-white bg-blue-500 rounded-full md:px-1 px-[2px] py-[1px]">0</span>
        </router-link>

        <div v-if="user?.user" class="flex items-center gap-x-1 relative font-bold">
          <button @click="isLogoutOpen = !isLogoutOpen" class="md:flex hidden">
            <span>David</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6b7280"
              class="hover:fill-blue-500">
              <path
                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg>
          </button>

          <div v-if="isLogoutOpen" class="absolute bottom-0 top-10 rounded-lg">
            <button @click="logOut" class="px-5 py-4 bg-white rounded-lg hover:underline flex items-center gap-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                class="fill-gray-500">
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
              <span>Logout</span>
            </button>

          </div>
        </div>
        <div v-else class="flex items-center gap-x-2 text-sm">
          <router-link to="/signin"
            class="text-white hover:text-blue-500 border border-blue-500 bg-blue-500 hover:bg-transparent rounded-sm px-3 py-1.5">Login</router-link>
          <router-link to="/signup"
            class="hover:text-white text-blue-500 border border-blue-500 hover:bg-blue-500 bg-transparent rounded-sm px-3 py-1.5">Sign
            Up</router-link>
        </div>
      </div>
      <nav v-if="isOpen" class="space-x-5 text-lg font-medium md:hidden flex flex-col gap-y-5">
        <router-link to="/products"
          :class="isActive('/products') ? 'text-blue-500 underline' : 'text-gray-500'">Products</router-link>
        <router-link to="/admin"
          :class="isActive('/admin') ? 'text-blue-500 underline' : 'text-gray-500'">Dashboard</router-link>
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


const route = useRoute()
const router = useRouter()

const user = useUserStore()
const isOpen = ref(false)
const isLogoutOpen = ref(false)

const isActive = (path) => {
  return route.path === path
}
async function logOut() {
  try {
    await authService.logout()
    await user.setUser(null)
    router.push("/")
  } catch (error) {
    console.error(error)
  }
}
</script>
