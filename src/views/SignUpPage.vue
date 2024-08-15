<template>
  <form @submit.prevent="handleSignUp"
    class="max-w-[500px] mx-auto my-20 w-full h-fit p-10 border justify-center flex-col space-y-5 rounded-lg">
    <base-dialog :show="isLoading" title="Loggin in..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <h1 class="text-4xl mb-5 font-bold">Sign Up</h1>
    <div class="flex flex-col gap-y-2">
      <label for="username" class="text-lg">Username</label>
      <input v-model="data.username.value" type="text" placeholder="Username"
        class="border-2 active:border-blue-500 focus:border-blue-500 rounded-md px-3 py-2" required />
      <p v-if="!data.username.isValid" class="text-xs italic text-red-600">
        {{ data.username.errorMsg }}
      </p>
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="email" class="text-lg">Email</label>
      <input v-model="data.email.value" type="email" placeholder="Email"
        class="border-2 active:border-blue-500 focus:border-blue-500 rounded-md px-3 py-2" required />
      <p v-if="!data.email.isValid" class="text-xs italic text-red-600">
        {{ data.email.errorMsg }}
      </p>
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="password" class="text-lg">Password</label>
      <input v-model="data.password.value" type="password" placeholder="Password"
        class="border-2 active:border-blue-500 focus:border-blue-500 rounded-md px-3 py-2" required />
      <p v-if="!data.password.isValid" class="text-xs italic text-red-600">
        {{ data.password.errorMsg }}
      </p>
    </div>
    <div>
      <button class="border rounded-md px-5 py-1.5 mx-auto w-full bg-blue-700 text-white hover:bg-blue-500"
        type="submit">
        Sign Up
      </button>
      <p class="text-right underline hover:no-underline mt-2">
        If you already have an account.
        <router-link to="/signin" class="text-blue-800 underline hover:text-blue-600 font-bold">Sign In</router-link>
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
import BaseDialog from '@/components/BaseDialog.vue'
import { useToast } from "vue-toastification";

const isLoading = ref(false)
const data = ref({
  username: {
    value: '',
    isValid: false,
    errorMsg: ''
  },
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

async function handleSignUp() {
  data.value.username.isValid = true
  data.value.email.isValid = true
  data.value.password.isValid = true
  if (data.value.username.value.length < 3) {
    data.value.username.isValid = false
    data.value.username.errorMsg = 'username should be more 3 characters'
  }
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
    const user = await authService.register(
      data.value.username.value,
      data.value.email.value,
      data.value.password.value
    )
    await userStore.setUser(user)
    router.push('/admin_dashboard')
    isLoading.value = false
    toast.info("Accounted Created Successful!");
  } catch (error) {
    console.error('Sign up error:', error)
    isLoading.value = false
  }
}
</script>
