import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import HomePage from '@/views/HomePage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import SignInPage from '@/views/SignInPage.vue';
// import Dashboard from '@/views/Dashboard.vue';
// import AdminPanel from '@/views/AdminPanel.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/signup', component: SignUpPage },
  { path: '/signin', component: SignInPage },
  // { 
  //   path: '/dashboard', 
  //   component: Dashboard, 
  //   meta: { requiresAuth: true } 
  // },
  // { 
  //   path: '/admin', 
  //   component: AdminPanel, 
  //   meta: { requiresAuth: true, requiresAdmin: true } 
  // },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/signin');
  } else if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;