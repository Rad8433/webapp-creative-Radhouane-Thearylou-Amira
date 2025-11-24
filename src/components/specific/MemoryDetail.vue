<template>
  <section>
    <div class="form">
      <div class="formContenus">
        <div class="boutonDetail">
          <BaseButton variant="cinquieme" @click="goBack"> <- </BaseButton>
          <div class="coteBouton">
            <BaseButton variant="cinquieme" @click="toggleEdit">
              {{ isEditing ? "💾" : "🖍️" }}
            </BaseButton>
            <BaseButton variant="cinquieme" @click="deleteMemoryPrompt"> ❌</BaseButton>
          </div>
        </div>

        <h1>Détails de la mémoire</h1>

        <!-- Titre -->
        <div class="form-group titre">
          <label>Titre</label>
          <input v-if="isEditing" v-model="editableMemory.title" class="readonly" />
          <p v-else class="readonly">{{ editableMemory.title }}</p>
        </div>

        <!-- Image -->
        <div class="image-upload">

          <!-- CLICKABLE IMAGE WHEN EDITING -->
          <div
            v-if="editableMemory.image"
            class="image-click-area"
            :class="{ editable: isEditing }"
            @click="isEditing && triggerFileInput()"
          >
            <img :src="editableMemory.image" class="preview-image" />
          </div>

          <!-- If no image -->
          <div
            v-else
            class="image readonly"
            :class="{ editable: isEditing }"
            @click="isEditing && triggerFileInput()"
          >
            <span class="plus">+</span>
            <span class="text">Ajouter une image</span>
          </div>

          <input
            v-if="isEditing"
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="onImageSelected"
            style="display: none;"
          />
        </div>

        <!-- Date & Tags -->
        <div class="dateTags">
          <div class="form-group date">
            <label>Date</label>
            <input v-if="isEditing" type="date" v-model="editableMemory.date" class="readonly" />
            <p v-else class="readonly">{{ editableMemory.date }}</p>
          </div>

          <div class="form-group tags">
            <label>Tags</label>
            <input
              v-if="isEditing"
              v-model="tagsString"
              class="readonly"
              placeholder="Séparez les tags par une virgule"
            />
            <p v-else class="readonly">{{ editableMemory.tags?.join(", ") }}</p>
          </div>
        </div>

        <!-- Légende -->
        <div class="form-group legende">
          <label>Légende</label>
          <input v-if="isEditing" v-model="editableMemory.caption" class="readonly" />
          <p v-else class="readonly">{{ editableMemory.caption }}</p>
        </div>

        <!-- Numéro de mémoire -->
        <div class="form-group">
          <label>Numéro de mémoire</label>
          <input v-if="isEditing" v-model="editableMemory.memoryNumber" class="readonly" />
          <p v-else class="readonly">{{ editableMemory.memoryNumber }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "../common/BaseButton.vue";
import { mapStores } from "pinia";
import { useMemoryStore } from "../../stores/useMemoryStore.js";

export default {
  name: "MemoryDetail",

  components: { BaseButton },

  computed: {
    ...mapStores(useMemoryStore),
  },

  data() {
    return {
      editableMemory: null,
      isEditing: false,
      tagsString: "",
    };
  },

  created() {
    const id = this.$route.params.memoryId;
    const memory = this.memoryStore.memories.find((m) => m.id === id);

    if (memory) {
      this.editableMemory = { ...memory };
      this.tagsString = memory.tags?.join(", ") || "";
    }
  },

  methods: {
    goBack() {
      this.$router.push({ name: "Room", params: { id: this.$route.params.id } });
    },

    toggleEdit() {
      if (this.isEditing) {
        this.saveMemory();
      }
      this.isEditing = !this.isEditing;
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
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
      if (!this.editableMemory) return;

      this.editableMemory.tags = this.tagsString
        ? this.tagsString.split(",").map((t) => t.trim())
        : [];

      this.memoryStore.updateMemory(this.editableMemory.id, {
        ...this.editableMemory,
      });
    },

    deleteMemoryPrompt() {
      if (!this.editableMemory) return;

      const confirmed = window.confirm("Voulez-vous vraiment supprimer cette mémoire ?");
      if (confirmed) {
        this.memoryStore.deleteMemory(this.editableMemory.id);
        this.goBack();
      }
    },
  },
};
</script>

<style>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form {
  background: rgb(43, 148, 143);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 20px 30px;
  border-radius: 15px;
  width: fit-content;
  max-width: 90%;
}

.boutonDetail {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-group {
  margin-top: 15px;
  width: 100%;
}

.readonly {
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 8px;
  border-radius: 6px;
  min-height: 3.5vh;
  width: 100%;
  display: flex;
  align-items: center;
}

.image-upload {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}

.image-click-area.editable:hover,
.image.editable:hover {
  opacity: 0.8;
  cursor: pointer;
}

.preview-image,
.image {
  width: 100%;
  max-width: 600px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
}

.image {
  background: #f3f3f3;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dateTags {
  display: flex;
  gap: 15px;
}

@media (max-width: 650px) {
  .preview-image,
  .image {
    height: 180px;
  }
}
</style>
