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
          <img
            v-if="editableMemory.image"
            :src="editableMemory.image"
            class="preview-image"
          />
          <div v-else class="image readonly">
            <span class="plus">+</span>
            <span class="text">Pas d'image</span>
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
import AppHeader from "@/components/common/AppHeader.vue";
import BaseButton from "../common/BaseButton.vue";
import { mapStores } from "pinia";
import { useMemoryStore } from "../../stores/useMemoryStore.js";

export default {
  name: "MemoryDetail",

  components: {
    AppHeader,
    BaseButton,
  },

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
    if (id) {
      const memory = this.memoryStore.memories.find((m) => m.id === id);
      if (memory) {
        this.editableMemory = { ...memory };
        this.tagsString = memory.tags?.join(", ") || "";
      }
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

    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.editableMemory.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },

    saveMemory() {
      if (!this.editableMemory) return;

      // Convert tags string to array
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
  box-sizing: border-box;
}

.formContenus h1 {
  font-size: 1.6em;
  margin-bottom: 15px;
}

.boutonDetail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group {
  margin-top: 15px;
  font-size: 0.95em;
  width: 100%;
}

label {
  font-size: 0.85em;
  margin-bottom: 3px;
  display: block;
}



.readonly {
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 8px;
  border-radius: 6px;
  min-height: 3.5vh;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.95em;
}

.image-upload {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}

.image,
.preview-image {
  width: 100%;
  max-width: 600px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  color: black;
  font-size: 18px;
}

.plus {
  font-size: 40px;
  color: #777;
}

.dateTags {
  display: flex;
  gap: 15px;
  width: 100%;
}

.legende {
  min-height: auto;
  margin-bottom: 10px;
}

@media (max-width: 650px) {
  .form {
    padding: 15px 15px;
  }

  .image,
  .preview-image {
    max-width: 90%;
    height: 180px;
  }
}
</style>
