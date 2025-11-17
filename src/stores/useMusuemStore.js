// On importe la méthode defineStore depuis le module `pinia` 
import { defineStore } from 'pinia';

// On défnit un store appelé "museum" 
// (ou autre nom adapté à votre projet)
export const useMuseumStore = defineStore('museum', {
    /* 
    1️⃣ STATE - Les données 
    (comme data() dans un composant classique Vue)
    */
    state: () => ({
        rooms: [],
        currentRoomId: null,
        roomName: [],
        theme: []
    }),

    /* 
    2️⃣ GETTERS - Données calculées 
    (comme computed dans un composant classique Vue)
    */
    getters: {
        currentRoom: (state) => {
            /* find() recherche dans l'array des salles (state.rooms)
            la salle courante (state.currentRoomId) */
            return state.rooms.find(room => room.id === state.currentRoomId);
        },

        totalMemories: (state) => {
            /* reduce() additionne le nombre de memories accumulées jusqu'à présent
            dans toutes les salles au nombre de memories de la salle actuelle */
            return state.rooms.reduce((sum, room) =>
                sum + room.memories.length, 0
            );
        }
    },

    /*
    3️⃣ ACTIONS - Fonctions qui modifient le state
    (comme methods dans un composant classique Vue)
    */
    actions: {
        updateItem(id, updates) {
            const index = this.rooma.findIndex(room => room.id === id);
            if (index !== -1) {
                this.rooms[index] = { ...this.rooms[index], ...updates };
            }
        }, /* modifie l'item actuel à afficher (storé dans this.currentItem) 
    en lui spécifiant le id */
        setCurrentRoom(id) {
            this.currentRoomId = this.currentRoom(id);
        }
    }
});