import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MuseumRoomsView from "../views/MuseumRoomsView.vue";
import RoomView from "../views/RoomView.vue";
import ModalView from "@/views/ModalView.vue";


// Définition des routes de l'application
const routes = [
  { path: "/", name: "home", component: HomeView }, // Accueil
  { path: "/MuseumRooms", name: "MuseumRooms", component: MuseumRoomsView }, // Liste des salles
  { path: "/Room/:id", name: "Room", component: RoomView }, // Vue d'une salle spécifique
  { path: "/Modal/:id/:memoryId?", name: "Modal", component: ModalView }, // Vue modale pour un élément spécifique
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Utilisation de l'historique HTML5
  routes, // Définition des routes
});

export default router;
