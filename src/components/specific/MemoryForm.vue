<template>
  <section>
    <div class="form">

      <!-- FORMULAIRE -->
      <form @submit.prevent="handleSubmit">

        <BaseButton variant="cinquieme" @click="goBack"> <- </BaseButton>
        <h1>Décrivez votre mémoire</h1>

        <!-- Champ : titre -->
        <div class="form-group titre">
          <label for="titre">Titre *</label>
          <input type="text" id="titre" v-model="form.title" placeholder="Titre de la mémoire" />
          <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </div>

        <!-- Zone pour ajouter une image -->
        <div class="image-upload">
          <label class="image-circle" @click="triggerFileInput">
            <span v-if="!image" class="plus">+</span>
            <span v-if="!image" class="text">Ajouter une image</span>
            <img v-if="image" :src="image" class="preview-image" />
            <span v-if="errors.image" class="error">{{ errors.image }}</span>
          </label>
          <input type="file" ref="fileInput" accept="image/*" @change="onHandleImage" style="display: none;" />
        </div>

        <!-- Grid: date + tags -->
        <div class="form-grid">
          <div class="form-group date">
            <label for="date">Date *</label>
            <input id="date" type="date" v-model="form.date" :max="new Date().toISOString().slice(0, 10)" />
            <span v-if="errors.date" class="error">{{ errors.date }}</span>
          </div>

          <div class="form-group tags">
            <label for="tags">Tags *</label>
            <div class="select-wrapper">
              <select id="tag-select" v-model="form.tags">
                <option value="">-- Sélectionnez un tag --</option>
                <option v-for="option in tagOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <span class="select-arrow">▾</span>
            </div>
            <span v-if="errors.tags" class="error">{{ errors.tags }}</span>
          </div>
        </div>

        <!-- Champ : légende -->
        <div class="form-group legende">
          <label for="legende">Légende *</label>
          <input type="text" id="legende" v-model="form.caption" placeholder="Une courte légende" />
          <span v-if="errors.caption" class="error">{{ errors.caption }}</span>
        </div>

        <!-- Bouton soumission -->
        <BaseButton variant="secondary" type="submit">
          Ajouter
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

  components: { AppHeader, BaseButton },

  computed: { ...mapStores(useMemoryStore) },

  data() {
    return {
      tagOptions: [
        { value: "#plage", label: "#plage" },
        { value: "#montagne", label: "#montagne" },
        { value: "#culture", label: "#culture" },
        { value: "#nature", label: "#nature" },
        { value: "#nuit", label: "#nuit" },
        { value: "#famille", label: "#famille" },
        { value: "#friends", label: "#friends" },
        { value: "#exploration", label: "#exploration" },
      ],
      errors: {},
      form: { title: "", tags: "", caption: "", date: "" },
      image: null,
    };
  },

  methods: {
    validateForm() {
      this.errors = {};
      if (!this.form.title.trim()) this.errors.title = "Le titre est obligatoire.";
      if (!this.form.date) this.errors.date = "La date est obligatoire.";
      if (!this.form.tags.trim()) this.errors.tags = "Les tags sont obligatoires.";
      if (!this.form.caption.trim()) this.errors.caption = "La légende est obligatoire.";
      if (!this.image) this.errors.image = "Veuillez sélectionner une image (max 2 Mo).";
      return Object.keys(this.errors).length === 0;
    },

    handleSubmit() {
      if (!this.validateForm()) return console.log("Formulaire invalide");
      this.saveMemory();
    },

    goBack() { this.$router.push({ name: 'Room', params: { id: this.$route.params.id } }); },

    triggerFileInput() { this.$refs.fileInput.click(); },

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
        reader.onload = () => { this.image = reader.result; };
        reader.readAsDataURL(file);
      }
    },

    saveMemory() {
      const tagsArray = this.form.tags ? [this.form.tags.trim()] : [];
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
section { display: flex; justify-content: center; align-items: center; }

.form {
  background: rgb(43, 148, 143);
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 15px 40px 40px;
  border-radius: 15px;
}

/* Image upload */
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

.plus { font-size: 40px; color: #777; }
.preview-image { width: 100%; height: 100%; object-fit: cover; }

/* Form grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group { margin-top: 20px; font-size: 1.2em; }
.titre { margin-top: 0; }
#legende { height: 6vh; margin-bottom: 30px; }
.error { color: red; font-size: 0.9em; margin-top: 4px; }

/* Select styling like input */
.select-wrapper { position: relative; width: 100%; }
select#tag-select {
  border: none;
  outline: none;
  background-color: #f3f3f3;
  color: black;
  font: inherit;
  width: 100%;
  padding: 0.4em 0.6em;
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  box-sizing: border-box;
}
.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #555;
}

/* Responsive grid */
@media (max-width: 650px) {
  .form { padding: 20px 15px; }
  .image-circle { height: 20vh; }
  .form-grid { grid-template-columns: 1fr; gap: 15px; }
}
</style>
