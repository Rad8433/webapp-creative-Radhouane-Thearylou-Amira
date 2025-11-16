<template>
    <div class="menu">
      <MemoryForm />
    </div>
  </template>
  
  <script>
  import MemoryForm from '@/components/specific/MemoryForm.vue';

  export default {
    name: "MuseumRoomsView",
    components: {
      MemoryForm,
    },
    data() {
      return {
        msg: 'Bonjour!'
      }
    }
  }
  </script>
  
  <style>
  .menu {
  }
  </style>