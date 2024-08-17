import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth.service';

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
 
  const userData = ref({role: localStorage.getItem('userRole') || null, name: null});

  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => userData.value?.role === 'admin');
 
  async function setUser(newUser) {
    user.value = newUser;

    if (newUser) {
      userData.value = await authService.getUserData(newUser.uid);
      localStorage.setItem('userRole', userData.value.role);
    } else {
      localStorage.removeItem('userRole');
      userData.value = null;
    }
  }

  return { user, userData, isLoggedIn, isAdmin, setUser };
});