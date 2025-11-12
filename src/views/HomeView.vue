<template>
    <div>
      <Header title="Accueil" ></Header>
      <OptionBar></OptionBar>
      <MuseumGrid></MuseumGrid>
      <Footer></Footer>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/common/AppHeader.vue'
  import OptionBar from '@/components/layout/OptionBar.vue'
  import MuseumGrid from '@/components/specific/MuseumGrid.vue'
  import Footer from '@/components/common/AppFooter.vue'
  </script>
  
  <style scoped>
  /* optional layout styles */
  </style>