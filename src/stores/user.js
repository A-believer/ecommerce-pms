import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth.service';

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const role = ref(localStorage.getItem('userRole') || null);

  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => role.value === 'admin');
 
  async function setUser(newUser) {
    user.value = newUser;
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
      role.value = await authService.getUserRole(newUser.uid);
      localStorage.setItem('userRole', role.value);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      role.value = null;
    }
  }

  return { user, role, isLoggedIn, isAdmin, setUser };
});