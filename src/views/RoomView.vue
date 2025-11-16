<template>
    <div class="memory-room">
  
      <!-- Go Back Button -->
      <button class="back-btn" @click="goBack">← Back</button>
  
      <!-- Centered Swiper -->
      <MemorySwiper />
  
    </div>
  </template>
  
  <script>
  import MemorySwiper from '@/components/specific/MemorySwiper.vue';
  
  export default {
    name: 'MemoryRoom',
    components: { MemorySwiper },
  
    methods: {
      goBack() {
        this.$router.back(); // navigate to previous page
      }
    }
  };
  </script>
  
  <style scoped>
  .memory-room {
    /* Full viewport height */
    min-height: 100vh;
  
    /* Background: gradient */
    background: linear-gradient(135deg, #ffecd2, #fcb69f);
  
    /* Center swiper */
    display: flex;
    justify-content: center;
    align-items: center;
  
    /* Enough padding so button doesn’t overlap content */
    padding: 20px;
  
    position: relative;
  }
  
  /* Back Button */
  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
  
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(6px);
  
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
  
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    color: #333;
  
  }
  
  .back-btn:hover {
    background: rgba(255, 255, 255, 1);
  }
  </style>
  