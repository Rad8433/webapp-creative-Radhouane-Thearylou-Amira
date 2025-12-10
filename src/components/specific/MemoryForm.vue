<template>
  <section>
    <div class="form" :style="{ backgroundColor: formBackground }">
      <form>
        <!-- Bouton de retour d'une page-->
        <BaseButton variant="cinquieme" type="button" @click="goBack">
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Fleche du retoure en arriere d'une page.">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
              fill="#fff" />
          </svg>
        </BaseButton>
        <h1>Décrivez votre mémoire</h1>
        <!-- Titre de la carte -->
        <div class="form-group titre">
          <label for="titre">Titre *</label>
          <input type="text" id="titre" v-model="form.title" placeholder="Titre de la mémoire" maxlength="30" />
          <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </div>
        <!-- Ajout de l'image pour la carte-->
        <div class="image-upload">
          <label class="image-circle"  tabindex="0" @click="triggerFileInput" @keyup.enter="triggerFileInput">
            <span v-if="!image" class="plus">+</span>
            <span v-if="!image" class="text">Ajouter une image</span>
            <img v-if="image" :src="image" class="preview-image" alt="Image selectionné pour la carte memoire." loading="lazy"/>
          </label>
          <input type="file" ref="fileInput" accept="image/*" @change="onHandleImage" style="display: none" />
          <span v-if="errors.image" class="error">{{ errors.image }}</span>
        </div>
        <!-- Choix d'une date -->
        <div class="form-grid">
          <div class="form-group date">
            <label for="date">Date *</label>
            <input id="date" type="date" v-model="form.date" :max="new Date().toISOString().slice(0, 10)" />
            <span v-if="errors.date" class="error">{{ errors.date }}</span>
          </div>
          <!-- Choix d'un tag -->
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
        <!-- Légende de la carte avec le "caption"-->
        <div class="form-group legende">
          <label for="legende">Légende *</label>
          <input type="text" id="legende" v-model="form.caption" placeholder="Une courte légende"  maxlength="60"  />
          <span v-if="errors.caption" class="error">{{ errors.caption }}</span>
        </div>
        <!-- Bouton pour ajouter une carte au swiper -->
        <BaseButton variant="secondary" type="button" @click="handleSubmit">
          Ajouter
        </BaseButton>
      </form>
    </div>
  </section>
</template>
<script>
import BaseButton from "../common/BaseButton.vue";
import { mapStores } from "pinia";
import { useMemoryStore } from "@/stores/useMemoryStore";
/* Composant MemoryForm pour ajouter une nouvelle mémoire */
export default {
  name: "MemoryForm",
  components: { BaseButton },
  /* Intégration du store de mémoires */
  computed: {
    ...mapStores(useMemoryStore),
    /* Détermine la couleur de fond du formulaire en fonction de la salle */
    formBackground() {
      const roomId = this.$route.params.id;
      const colors = {
        "room-1": "#5fbcb2",
        "room-2": "#d96a4d",
        "room-3": "#b3b3b3",
        "room-4": "#7fbf9c",
        "room-5": "#c9b56a",
        "room-6": "#5f8fab",
      };
      return colors[roomId] || "#ffffff";/* Valeur par défaut si l'ID de la salle n'est pas trouvé */
    },
  },
  data() {
    return {
      /* Options de tags prédéfinies */
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
    /* Validation du formulaire avant soumission */
    validateForm() {
      this.errors = {};
      if (!this.form.title.trim())
        this.errors.title = "Le titre est obligatoire.";
      if (!this.form.date) this.errors.date = "La date est obligatoire.";
      if (!this.form.tags.trim())
        this.errors.tags = "Les tags sont obligatoires.";
      if (!this.form.caption.trim())
        this.errors.caption = "La légende est obligatoire.";
      if (!this.image) this.errors.image = "Veuillez sélectionner une image.";
      return Object.keys(this.errors).length === 0;
    },
    /* Soumission du formulaire pour créer une nouvelle mémoire */
    handleSubmit() {
      if (!this.validateForm()) return;
      this.memoryStore.createMemory({
        roomId: this.$route.params.id,
        ...this.form,
        image: this.image,
      });
      /* Retour à la page de la salle après ajout */
      this.goBack();
    },
    /* Navigation vers la précédente page */
    goBack() {
      this.$router.push({
        name: "Room",
        params: { id: this.$route.params.id },
      });
    },
    /* Gestion de du téléversement de l'image */
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    /* Lecture et validation de l'image sélectionnée */
    onHandleImage(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        this.errors.image = "Image trop grande, max 2 Mo.";
        this.image = null;
        return;
      }
      /* Lecture de l'image en tant que Data URL */
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      /* Lecture du fichier */
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>

/*Gérer l’accessibilité au clavier de la navigation.*/ 
/* Style pour la mise au point accessible */
#tag-select:focus-visible {
  outline: 3px solid #0245ff;
  outline-offset: 4px;
  border-radius: 8px;
}

/* Style pour la mise au point accessible */
.image-circle:focus-visible {
  outline: solid 3px #0245ff;  
  outline-offset: 4px;         
  border-radius: 6px;
}

/* Style du formulaire */
.form {
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: black;
  padding: 20px 40px 40px;
  border-radius: 15px;
  box-sizing: border-box;
  transition: background-color 0.5s ease;
}

/* Titre du formulaire */
.form h1 {
  font-size: 1.8rem;
  text-align: center;
  margin: 0 0 1rem;
}

/* IMAGE UPLOAD */
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

/* Cercle cliquable pour l’ajout d’image */
.image-circle {
  width: 100%;
  height: 15vh;
  min-height: 160px;
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

/* Texte du placeholder */
.plus {
  font-size: 40px;
  color: #777;
}

/* Texte sous le placeholder */
.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-group input,
.form-group span {
  width: 100%;   
  box-sizing: border-box; 
}

/* Errors */
.error {
  color: rgb(102, 0, 0);
  white-space: normal; 
  font-weight: bolder;
  word-wrap: break-word; 
  max-width: 100%; 
}
</style>
