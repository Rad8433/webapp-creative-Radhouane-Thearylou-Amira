//Importation de Vue et établissement des routes
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MuseumRoomsView from '../views/MuseumRoomsView.vue'
import RoomView from '../views/RoomView.vue'
import ModalView from '@/views/ModalView.vue'

//Création des chemins de navigation
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/MuseumRooms',
    name: 'MuseumRooms',
    component: MuseumRoomsView
  },
  {
    path: '/Room/:id',
    name: 'Room',
    component: RoomView
  },
  {
    path: '/Modal/:id',
    name: 'Modal',
    component: ModalView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
