<template>
    <div class="view-museum">
      <!-- Header -->
      <Header title="Détails du musée" />
  
      <!-- Main content -->
      <section class="museum-details">
        <MuseumCard />
        <!-- You can add more content here later -->
      </section>
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script setup>
  // Import the components you plan to use
  import Header from '@/components/common/Header.vue'
  import Footer from '@/components/common/Footer.vue'
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
  