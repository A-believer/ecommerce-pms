import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomePage from '@/views/HomePage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import SignInPage from '@/views/SignInPage.vue'
import CartPage from '@/views/CartPage.vue'
import ProductsPage from '@/views/ProductsPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const routes = [
  { path: '/', component: HomePage, name: "Home" },
  { path: '/signup', component: SignUpPage, name: "Sign Up" },
  { path: '/signin', component: SignInPage, name: "Sign In" },
  { path: '/cart', component: CartPage , name: "Cart"},
  { path: '/products', component: ProductsPage, name: "Product" },
  { path: '/products/:id', component: ProductDetailPage, name: "Product Detail" },
  { path: '/checkout', component: CheckoutPage, meta: { requiresAuth: true }, name: "Checkout" },
  {
    path: '/admin_dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }, name: "Admin Dashboard"
  },
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/signin')
  } else if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next('/admin_dashboard')
  } else {
    next()
  }
})

export default router
