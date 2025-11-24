<template>
  <section>
    <div class="form">
      <div class="formContenus">

        <BaseButton variant="cinquieme" @click="goBack"> <- </BaseButton>
        <h1>Décrivez votre mémoire</h1>

        <!-- FORMULAIRE -->
         <!-- Le submit ecoute juste l'evenement du bouton terminer en ignorant tout les autre evenement du composant bouton et prevent empecher le rechargement de la page <: -->
        <form @submit.prevent="saveMemory">
          
          <!-- Champ : titre -->
          <div class="form-group titre">
            <label for="titre">Titre</label><br>
            <input type="text" id="titre" v-model="form.title">
          </div>

          <!-- Zone pour ajouter une image -->
          <div class="image-upload">
            <label class="image-circle" @click="triggerFileInput">
              <span v-if="!image" class="plus">+</span>
              <span v-if="!image" class="text">Ajouter une image</span>
              <img v-if="image" :src="image" class="preview-image">
            </label>

            <input type="file"
                   ref="fileInput"
                   accept="image/*"
                   @change="onImageSelected"
                   style="display: none;">
          </div>

          <!-- Champs : date + tags -->
          <div class="dateTags">
            <div class="form-group date">
              <label for="date">Date</label><br>
              <input id="date" type="date" v-model="form.date" :max="new Date().toISOString().slice(0, 10)" />
            </div>

            <div class="form-group tags">
              <label for="tags">Tags</label><br>
              <input type="text" id="tags" v-model="form.tags">
            </div>
          </div>
          <!-- Champ : légende -->
          <div class="form-group legende">
            <label for="legende">Légende</label><br>
            <input type="text" id="legende" v-model="form.caption">
          </div>

          <!-- Bouton soumission -->
          <BaseButton variant="secondary" type="submit">
            Terminer
          </BaseButton>

        </form>

      </div>
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
    goBack() {
      this.$router.push({ name: 'Room', params: { id: this.$route.params.id } });
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
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
