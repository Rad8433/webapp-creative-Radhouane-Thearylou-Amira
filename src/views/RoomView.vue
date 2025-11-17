<template>
  <div class="room">
    <div class="memory-room">
      <!-- Go Back Button -->
      <button class="back-btn" @click="goBack">← Back</button>
      
      <!-- OptionBar with Search, Date, and Tag filters (no Room or Sort option) -->
      <OptionBar 
        v-model:search="filters.search" 
        v-model:date="filters.date" 
        v-model:tag="filters.tag" 
        :tag-options="tagOptions"
        :showRoom="false"  
        :showSort="false"   
      />

      <!-- Centered Swiper -->
      <MemorySwiper :filters="filters" />
    </div>

    <!-- Add Button -->
    <div class="bouton">
      <BaseButton variant="primary" @click="ajout">
        +
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue';
import MemorySwiper from '@/components/specific/MemorySwiper.vue';
import OptionBar from "@/components/layout/OptionBar.vue";

export default {
  name: 'MemoryRoom',
  components: { MemorySwiper, BaseButton, OptionBar },
  data() {
    return {
      filters: {
        search: "",
        tag: "all",
        date: "all",  // Add a filter for date
      },
      tagOptions: [
        { value: "#vacances", label: "#vacances" },
        { value: "#aventure", label: "#aventure" },
        { value: "#urbain", label: "#urbain" },
        { value: "#humour", label: "#humour" },
        { value: "#food", label: "#food" },
        { value: "#rêve", label: "#rêve" },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    ajout() {
      this.$router.push({ name: 'Modal' });
    }
  }
};
</script>

<style scoped>
    .room{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: linear-gradient(135deg, #ffecd2, #fcb69f);
    }

 .memory-room {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;   
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  position: relative;
  gap: 20px; 
}

    .back-btn {
        position: absolute;
        top: 0px;
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

    .bouton {
        width: 60px;
    }

</style>
  