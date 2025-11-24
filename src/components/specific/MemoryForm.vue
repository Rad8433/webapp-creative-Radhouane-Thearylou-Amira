<template>
  <section>
    <div class="form">

      <!-- FORMULAIRE -->
      <form @submit.prevent="handleSubmit">

        <BaseButton variant="cinquieme" @click="goBack"> <- </BaseButton>
        <h1>Décrivez votre mémoire</h1>

        <!-- Champ : titre -->
        <div class="form-group titre">
          <label for="titre">Titre *</label><br>
          <input type="text" id="titre" v-model="form.title" placeholder="Titre de la mémoire">
          <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </div>

        <!-- Zone pour ajouter une image -->
        <div class="image-upload">
          <label class="image-circle" @click="triggerFileInput">
            <span v-if="!image" class="plus">+</span>
            <span v-if="!image" class="text">Ajouter une image</span>
            <img v-if="image" :src="image" class="preview-image">
            <span v-if="errors.image" class="error">{{ errors.image }}</span>
          </label>

          <input type="file" ref="fileInput" accept="image/*" @change="onHandleImage" style="display: none;">
        </div>

        <!-- Champs : date + tags -->
        <div class="dateTags">
          <div class="form-group date">
            <label for="date">Date *</label><br>
            <input id="date" type="date" v-model="form.date"
              :max="new Date().toISOString().slice(0, 10)" />
            <span v-if="errors.date" class="error">{{ errors.date }}</span>
          </div>

          <div class="form-group tags">
            <label for="tags">Tags *</label><br>
            <input type="text" id="tags" v-model="form.tags">
            <span v-if="errors.tags" class="error">{{ errors.tags }}</span>
          </div>
        </div>

        <!-- Champ : légende -->
        <div class="form-group legende">
          <label for="legende">Légende *</label><br>
          <input type="text" id="legende" v-model="form.caption" placeholder="Une courte légende">
          <span v-if="errors.caption" class="error">{{ errors.caption }}</span>
        </div>

        <!-- Bouton soumission -->
        <BaseButton variant="secondary" type="submit">
          Terminer
        </BaseButton>

      </form>

    </div>
  </section>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import BaseButton from '../common/BaseButton.vue';
import { mapStores } from 'pinia';
import { useMemoryStore } from '../../stores/useMemoryStore.js';

export default {
  name: "MuseumRoomsView",

  components: {
    AppHeader,
    BaseButton,
  },

  computed: {
    ...mapStores(useMemoryStore),
  },

  data() {
    return {
      errors: {},
      form: {
        title: "",
        tags: "",
        caption: "",
        date: "",
      },
      image: null
    };
  },

  methods: {
    validateForm() {
      // Réinitialiser les erreurs
      this.errors = {};

      // Vérifier le titre
      if (!this.form.title.trim()) {
        this.errors.title = "Le titre est obligatoire.";
      }

      // Vérifier la date
      if (!this.form.date) {
        this.errors.date = "La date est obligatoire.";
      }

      // Vérifier les tags
      if (!this.form.tags.trim()) {
        this.errors.tags = "Les tags sont obligatoires.";
      }

      // Vérifier la légende
      if (!this.form.caption.trim()) {
        this.errors.caption = "La légende est obligatoire.";
      }

      // Vérifier qu'il y a bien une image
      if (!this.image) {
        this.errors.image = "Veuillez sélectionner une image (max 2 Mo).";
      }

      // Retourne TRUE si aucune erreur
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      // On valide tous les champs
      const isValid = this.validateForm();

      // Si non valide : on arrête ici
      if (!isValid) {
        console.log("Formulaire invalide");
        return;
      }

      // Sinon on sauvegarde
      this.saveMemory();
    },
    goBack() {
      this.$router.push({ name: 'Room', params: { id: this.$route.params.id } });
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    onHandleImage(event) {
      const file = event.target.files[0];
      this.errors.image = null;

      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          this.errors.image = "Image trop grande, la taille du fichier doit être en dessous de 2 Mo.";
          this.image = null;
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },

    saveMemory() {
      const tagsArray = this.form.tags
        ? this.form.tags.split(",").map(t => t.trim())
        : [];

      this.memoryStore.addMemory({
        roomId: this.$route.params.id,
        title: this.form.title,
        image: this.image,
        caption: this.form.caption,
        date: this.form.date,
        tags: tagsArray,
        bgColor: "#e0e0e0",
      });

      this.goBack();
    },
  }
};
</script>

<style>
section {
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.image-upload {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

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

.plus {
  font-size: 40px;
  color: #777;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dateTags {
  display: flex;
}

.form-group {
  margin-top: 20px;
  font-size: 1.2em;
}

input {
  width: 100%;
  height: 4vh;
  border-radius: 4px;
  border: none;
  padding: 5px;
}

.titre {
  margin-top: 0;
}

.tags {
  margin-left: 20px;
}

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
