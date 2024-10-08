<template>
  <form @submit.prevent="handleSignIn"
    class="max-w-[500px] mx-auto my-20 w-full h-fit p-10 border justify-center flex-col space-y-5 rounded-lg">

    <base-spinner :is-loading="isLoading" text="Signing in!"></base-spinner>

    <h1 class="text-4xl mb-5 font-bold">Sign In</h1>
    <div class="flex flex-col gap-y-2">
      <label for="email" class="text-lg">Email</label>
      <input v-model="data.email.value" type="email" placeholder="Email"
        class="border-2 active:border-blue-500 focus:border-blue-500 rounded-md px-3 py-2 outline-none" required />
      <p v-if="!data.email.isValid" class="text-xs italic text-red-600">
        {{ data.email.errorMsg }}
      </p>
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="password" class="text-lg">Password</label>
      <input v-model="data.password.value" type="password" placeholder="Password"
        class="border-2 active:border-blue-500 focus:border-blue-500 rounded-md px-3 py-2 outline-none" required />
      <p v-if="!data.password.isValid" class="text-xs italic text-red-600">
        {{ data.password.errorMsg }}
      </p>
    </div>
    <div>
      <button :disabled="isLoading" type="submit"
        class="border rounded-md px-5 py-1.5 mx-auto w-full bg-blue-700 text-white hover:bg-blue-500">
        Sign In
      </button>
      <p class="text-right underline hover:no-underline mt-2">
        If you dont have an account.
        <router-link to="/signup" class="text-blue-800 underline hover:text-blue-600 font-bold">Sign Up</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'
import { useUserStore } from '@/stores/user'
import BaseSpinner from '@/components/BaseSpinner.vue'
import { useToast } from 'vue-toastification'


const isLoading = ref(false)
const data = ref({
  email: {
    value: '',
    isValid: false,
    errorMsg: ''
  },
  password: {
    value: '',
    isValid: false,
    errorMsg: ''
  }
})
const router = useRouter()
const toast = useToast()
const userStore = useUserStore()

async function handleSignIn() {
  data.value.email.isValid = true
  data.value.password.isValid = true
  if (data.value.email.value === '' || !data.value.email.value.includes('@')) {
    data.value.email.isValid = false
    data.value.email.errorMsg = 'enter a valid email address'
  }
  if (data.value.password.value === '') {
    data.value.password.isValid = false
    data.value.password.errorMsg = 'enter a valid password'
  }
  if (data.value.password.value.length < 6) {
    data.value.password.isValid = false
    data.value.password.errorMsg = 'password should be more than 6 characters'
  }
  isLoading.value = true
  try {
    const user = await authService.login(data.value.email.value, data.value.password.value)
    await userStore.setUser(user)
    if (userStore.userData.role === "admin") {
      router.push('/admin_dashboard')
    } else {
      router.push('/')
    }
    isLoading.value = false
    toast.info("Login Successful!");
  } catch (error) {
    console.error('Sign in error:', error)
    isLoading.value = false
    toast.error("Error Logging");
  }
}
</script>
