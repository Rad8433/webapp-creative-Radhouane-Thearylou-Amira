<template>
  <section>
    <div class="form">

      <!-- FORMULAIRE -->
      <form >

        <BaseButton variant="cinquieme" @click="goBack"> <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="#fff"></path>
            </g>
          </svg> </BaseButton>
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
        <BaseButton variant="secondary" @click="handleSubmit">
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
        { value: "#amis", label: "#amis" },
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
section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background: rgb(43, 148, 143);
  width: 100%;
  /* prend toute la largeur dispo */
  max-width: 650px;
  /* mais pas plus large que ça sur desktop */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: black;
  padding: 20px 40px 40px;
  border-radius: 15px;
  box-sizing: border-box;
}

/* Titre */
.form h1 {
  font-size: 1.8rem;
  text-align: center;
  margin: 0 0 1rem;
}

/* FORMULAIRE */
form {
  width: 100%;
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
  min-height: 160px;
  /* pour éviter que ce soit trop petit sur mobile */
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

/* Form grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-top: 20px;
  font-size: 1.1em;
}

.titre {
  margin-top: 0;
}

/* Inputs génériques */
.form-group input[type="text"],
.form-group input[type="date"] {
  width: 100%;
  padding: 0.4em 0.6em;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #f3f3f3;
  color: black;
  font: inherit;
  box-sizing: border-box;
}

#legende {
  height: 6vh;
  min-height: 60px;
  margin-bottom: 30px;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}

/* Select styling like input */
.select-wrapper {
  position: relative;
  width: 100%;
}

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

/* Bouton retour + bouton submit bien alignés */
form>.cinquieme {
  margin-bottom: 10px;
}

form>.cinquieme svg {
  display: block;
}

/* TABLETTE (≈ 1024px et moins) */
@media (max-width: 1024px) {
  .form {
    padding: 20px 24px 32px;
    max-width: 540px;
  }

  .form h1 {
    font-size: 1.6rem;
  }

  .form-grid {
    gap: 16px;
  }
}

/* MOBILE (≈ 650px et moins) */
@media (max-width: 650px) {
  section {
    padding: 1.5rem 1rem;
  }

  .form {
    padding: 16px 14px 24px;
    border-radius: 12px;
  }

  .form h1 {
    font-size: 1.4rem;
  }

  .form-group {
    font-size: 1rem;
  }

  .image-circle {
    height: 200px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    /* la date et le tag passent l’un sous l’autre */
    gap: 15px;
  }

  #legende {
    margin-bottom: 20px;
  }
}

/* Très petit mobile (genre < 400px) */
@media (max-width: 400px) {
  .form {
    padding: 12px 10px 20px;
  }

  .image-circle {
    height: 180px;
  }
}
</style>
