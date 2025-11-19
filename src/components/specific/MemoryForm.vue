<template>
  <section>
    <div class="form">
      <div class="formContenus">
        <!-- Titre principal du formulaire -->
        <BaseButton variant="cinquieme" @click="goBack"><-</BaseButton>
        <h1>Décrivez votre mémoire</h1>

        <!-- Champ : titre de la mémoire -->
        <div class="form-group titre">
          <label for="titre">Titre</label><br>
          <input type="text" id="titre">
        </div>

        <!-- Zone pour ajouter une image -->
        <div class="image-upload">
          <!-- Zone cliquable (soit + soit l'image affichée) -->
          <label class="image-circle" @click="triggerFileInput">
            <!-- Affiche le + si aucune image n'est sélectionnée -->
            <span v-if="!image" class="plus">+</span>
            <!-- Texte incitant à ajouter une image -->
            <span v-if="!image" class="text">Ajouter une image</span>
            <!-- Affiche l’aperçu si une image a été choisie -->
            <img v-if="image" :src="image" class="preview-image">
          </label>

          <!-- Input réel, caché → utilisé pour sélectionner l’image -->
          <input type="file" ref="fileInput" accept="image/*" @change="onImageSelected" style="display: none;">
        </div>

        <!-- Champs : date + tags (affichés côte à côte) -->
        <div class="dateTags">
          <div class="form-group date">
            <label for="date">Date</label><br>
            <input type="text" id="titre">
          </div>

          <div class="form-group tags">
            <label for="tags">Tags</label><br>
            <input type="text" id="tags">
          </div>
        </div>

        <!-- Champ : courte description -->
        <div class="form-group description">
          <label for="description">Courte description</label><br>
          <input type="text" id="description">
        </div>

        <!-- Champ : légende -->
        <div class="form-group legende">
          <label for="legende">Légende</label><br>
          <input type="text" id="legende">
        </div>

        <!-- Bouton pour terminer et retourner à la salle -->
        <BaseButton variant="secondary" @click="goBack">
          Terminer
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import BaseButton from '../common/BaseButton.vue';
import { mapStores } from 'pinia'
import { useMemoryStore } from '../../stores/useMemoryStore.js'

export default {
  name: "MuseumRoomsView",
  components: {
    AppHeader,
    BaseButton,
  },

  computed: {
    // Connexion au store Pinia
    ...mapStores(useMemoryStore),
  },

  data() {
    return {
      // Permet d’afficher l’aperçu de l’image
      image: null
    };
  },

  methods: {
    // Retour à la salle associée à la mémoire
    goBack() {
      this.$router.push({ name: 'Room', params: { id: this.$route.params.id } })
    },

    // Ouvre le sélecteur de fichiers
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    // Quand l’utilisateur choisit une image → on crée un aperçu
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          // Stocke l’image encodée en base64
          this.image = reader.result;
        };

        // Conversion de l'image en base64
        reader.readAsDataURL(file);
      }
    },

    // Autre fonction de retour (non utilisée)
    retour(roomId) {
      this.$router.push(`/Room/${this.$route.params.id}`)
    },
  }
};
</script>


<style>
/* Mise en page générale de la section */
section {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Conteneur principal du formulaire */
.form {
  background: rgb(43, 148, 143);
  width: fit-content;   
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 15px 40px 40px 40px;
  border-radius: 15px;
}

/* Bloc pour l’upload d’image */
.image-upload {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

/* Zone cliquable pour ajouter ou afficher une image */
.image-circle {
  width: 100%;
  height: 15vh;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  background-color: #f3f3f3;
  position: relative;
  color: black;
  font-size: 20px;
}

/* Icône + affichée avant l’ajout d’image */
.plus {
  font-size: 40px;
  color: #777;
}

/* Image d’aperçu */
.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Date + tags côte à côte */
.dateTags {
  display: flex;
}

/* Styles généraux des groupes du formulaire */
.form-group {
  margin-top: 20px;
  font-size: 1.2em;
}

/* Style pour tous les inputs */
input {
  width: 100%;
  height: 4vh;
  border-radius: 4px;
  border: none;
  padding: 5px;
}

/* Ajuste la marge du premier champ */
.titre {
  margin-top: 0;
}

/* Décalage pour le champ Tags */
.tags {
  margin-left: 20px;
}

/* Input description plus haut */
#description {
  height: 10vh;
}

/* Input légende un peu plus haut */
#legende {
  height: 6vh;
  margin-bottom: 30px;
}

@media (max-width: 650px) {
  .form {
    padding: 20px 15px;

  }
  .image-circle {
    height: 20vh; 
  }
}
</style>
