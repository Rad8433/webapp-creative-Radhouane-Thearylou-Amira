<template>
  <section>
    <div class="form">
      
      <div class="formContenus">
        <AppHeader>
          <template #title>
            Salles du Musée
          </template>
        </AppHeader>
        <h1>Décrivez votre mémoire</h1>

        <div class="form-group titre">
          <label for="titre">Titre</label><br>
          <input type="text" id="titre">
        </div>
        
        <div class="image-upload">
          <label class="image-circle" @click="triggerFileInput">
            <span v-if="!image" class="plus">+</span>
            <span v-if="!image" class="text">Ajouter une image</span>
            <img v-if="image" :src="image" class="preview-image">
          </label>

          <input type="file" ref="fileInput" accept="image/*" @change="onImageSelected" style="display: none;">
        </div>
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

        <div class="form-group description">
          <label for="description">Courte description</label><br>
          <input type="text" id="description">
        </div>

        <div class="form-group legende">
          <label for="legende">Légende</label><br>
          <input type="text" id="legende">
        </div>
        <BaseButton variant="secondary" @click="retoure">
          Terminer
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script>
  import AppHeader from "@/components/common/AppHeader.vue";
  import BaseButton from '../common/BaseButton.vue';

  export default {
    name: "MuseumRoomsView",
    components: {
      AppHeader,
      BaseButton,
    },
    data() {
      return {
        image: null  // ici l'image sera stockée
      };
    },

    methods: {
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
      retoure() {
        this.$router.push({ name: 'MuseumRooms' });
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
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 40px;
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

  input{
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

  #description{
    height: 10vh;
  }

  #legende{
    height: 6vh;
    margin-bottom: 30px;
  }

</style>