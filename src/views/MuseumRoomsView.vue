<template>
    <div class="view-museum">
      <!-- Header -->
      <Header title="Détails du musée"></Header>
  
      <!-- Main content -->
      <section class="museum-details">
        <MuseumCard></MuseumCard>
        <!-- You can add more content here later -->
      </section>
  
      <!-- Footer -->
      <Footer></Footer>
    </div>
  </template>
  
  <script setup>
  // Import the components you plan to use
  import Header from '@/components/common/AppHeader.vue'
  import Footer from '@/components/common/AppFooter.vue'
  import MuseumCard from '@/components/specific/MuseumCard.vue'
  import MemoryDetail from '@/components/specific/MemoryDetail.vue'
  
  // Empty for now; you can add props, state, or Pinia stores later
  </script>
  
  <style scoped>
  .view-museum {
    padding: 20px;
  }
  
  .museum-details {
    margin-top: 20px;
  }
  </style>
  