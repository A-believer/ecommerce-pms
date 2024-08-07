import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth.service';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const role = ref(null);

  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => role.value === 'admin');

  async function setUser(newUser) {
    user.value = newUser;
    if (newUser) {
      role.value = await authService.getUserRole(newUser.uid);
    } else {
      role.value = null;
    }
  }

  return { user, role, isLoggedIn, isAdmin, setUser };
});