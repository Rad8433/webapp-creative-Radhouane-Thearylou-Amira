<template>
  <section>
    <div class="form" :style="{ backgroundColor: formBackground }">
      <div class="formContenus">
        <!-- Header buttons -->
        <div class="boutonDetail">
          <BaseButton variant="cinquieme" @click="goBack">
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="#fff" />
            </svg>
          </BaseButton>
          <div class="coteBouton">
            <BaseButton variant="cinquieme" @click="toggleEdit">
              {{ isEditing ? "💾" : "🖍️" }}
            </BaseButton>
            <BaseButton variant="cinquieme" @click="deleteMemoryPrompt">
              🗑️
            </BaseButton>
          </div>
        </div>
        <h1>Détails de la mémoire</h1>
        <!-- Title -->
        <div class="form-group titre">
          <label>Titre :</label>
          <input v-if="isEditing" v-model="editableMemory.title" class="readonly" />
          <p v-else class="readonly">{{ editableMemory.title }}</p>
        </div>
        <!-- Image upload -->
        <div class="image-upload">
          <div v-if="editableMemory?.image" class="image-click-area" :class="{ editable: isEditing }"
            @click="isEditing && triggerFileInput()">
            <img :src="editableMemory.image" class="preview-image" />
          </div>
          <div v-else class="image readonly" :class="{ editable: isEditing }" @click="isEditing && triggerFileInput()">
            <span class="plus">+</span>
            <span class="text">Ajouter une image</span>
          </div>
          <input v-if="isEditing" type="file" ref="fileInput" accept="image/*" @change="onImageSelected"
            style="display: none" />
        </div>
        <!-- Date & Tags -->
        <div class="dateTags">
          <div class="form-group date">
            <label>Date :</label>
            <input v-if="isEditing" type="date" v-model="editableMemory.date" class="readonly" />
            <p v-else class="readonly">{{ editableMemory.date }}</p>
          </div>
          <div class="form-group tags">
            <label>Tag :</label>
            <div v-if="isEditing" class="select-wrapper">
              <select v-model="selectedTag" id="tag-select">
                <option value="">-- Sélectionnez un tag --</option>
                <option v-for="option in tagOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <span class="select-arrow">▾</span>
            </div>
            <p v-else class="readonly">
              {{ editableMemory.tags?.join(", ") || "Aucun tag" }}
            </p>
          </div>
        </div>
        <!-- Caption -->
        <div class="form-group legende">
          <label>Légende :</label>
          <input v-if="isEditing" v-model="editableMemory.caption" class="readonly" />
          <p v-else class="readonly">{{ editableMemory.caption }}</p>
        </div>
        <!-- Memory number -->
        <div class="form-group">
          <label>Numéro de mémoire :</label>
          <p class="readonly">{{ editableMemory.memoryNumber }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "../common/BaseButton.vue";
import { useMemoryStore } from "../../stores/useMemoryStore.js";
export default {
  name: "MemoryDetail",
  components: { BaseButton },

  data() {
    return {
      editableMemory: null,
      isEditing: false,
      selectedTag: "",
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
      memoryStore: useMemoryStore(),
    };
  },

  computed: {
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
      return colors[roomId] || "#ffffff";
    },
  },

  // Quand la page charge on récupère la mémoire correspondante
  created() {
    const id = this.$route.params.memoryId;
    const memory = this.memoryStore.memories.find((m) => m.id === id);

    // Si elle existe pas on retourne à la salle
    if (!memory) {
      this.$router.replace({
        name: "Room",
        params: { id: this.$route.params.id },
      });
      return;
    }

    this.editableMemory = { ...memory };
    this.selectedTag = memory.tags?.[0] || "";
  },

  methods: {
    goBack() {
      this.$router.push({
        name: "Room",
        params: { id: this.$route.params.id },
      });
    },
    toggleEdit() {
      if (this.isEditing) this.saveMemory();
      this.isEditing = !this.isEditing;
    },
    triggerFileInput() {
      this.$refs.fileInput?.click();
    },
    onImageSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Image trop grande, elle doit faire moins de 2 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.editableMemory.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    saveMemory() {
      this.memoryStore.updateMemory(this.editableMemory.id, {
        title: this.editableMemory.title,
        caption: this.editableMemory.caption,
        date: this.editableMemory.date,
        image: this.editableMemory.image,
        tags: this.selectedTag,
      });
    },
    deleteMemoryPrompt() {
      if (confirm("Voulez-vous vraiment supprimer cette mémoire ?")) {
        this.memoryStore.deleteMemory(this.editableMemory.id);
        this.goBack();
      }
    },
  },
};
</script>
<style>
.form {
  /* pas de background ici, il est géré via :style="formBackground" */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: white;
  padding: 20px 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;
}

/* Contenu interne en grille simple (une colonne par défaut) */
.formContenus {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  width: 100%;
}

/* Ligne du haut : boutons */
.boutonDetail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.coteBouton {
  display: flex;
  gap: 0.5rem;
}

/* Titre principal */
.formContenus h1 {
  margin: 0.5rem 0 0.5rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
}

/* Groupes de formulaire */
.form-group {
  margin-top: 10px;
  width: 100%;
}

/* Labels des champs */
.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

/* Valeurs / inputs */
.readonly {
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 8px;
  border-radius: 6px;
  min-height: 3.5vh;
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  color: white;
  box-sizing: border-box;
}

input.readonly {
  font: inherit;
}

/* IMAGE */
.image-upload {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}

.image-click-area.editable:hover,
.image.editable:hover {
  opacity: 0.85;
  cursor: pointer;
}

.preview-image,
.image {
  width: 100%;
  max-width: 100%;
  height: 260px;
  border-radius: 15px;
  object-fit: cover;
}

.image {
  background: #f3f3f3;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.plus {
  font-size: 32px;
  margin-bottom: 4px;
}

/* DATE + TAGS EN GRID */
.dateTags {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
}

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

/* ───────── TABLETTE ───────── */
@media (max-width: 1024px) {
  .form {
    padding: 18px 20px;
    max-width: 95%;
  }

  .formContenus h1 {
    font-size: 1.6rem;
  }
}

/* ───────── MOBILE ───────── */
@media (max-width: 650px) {
  .form {
    padding: 16px 14px;
    border-radius: 12px;
    max-width: 100%;
  }

  .formContenus h1 {
    font-size: 1.4rem;
    text-align: center;
  }

  .preview-image,
  .image {
    height: 200px;
  }

  .dateTags {
    grid-template-columns: 1fr;
  }
}

/* Très petit mobile */
@media (max-width: 400px) {
  .form {
    padding: 12px 10px;
  }

  .preview-image,
  .image {
    height: 180px;
  }
}
</style>
