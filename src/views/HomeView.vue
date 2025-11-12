<template>
    <div>
      <Header title="Accueil" />
      <OptionBar />
      <MuseumGrid />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/common/Header.vue'
  import OptionBar from '@/components/layout/OptionBar.vue'
  import MuseumGrid from '@/components/specific/MuseumGrid.vue'
  import Footer from '@/components/common/Footer.vue'
  </script>
  
  <style scoped>
  /* optional layout styles */
  </style>