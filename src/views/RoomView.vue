<template>
  <div>
    <!-- Here we render the MemoryCards component -->
    <MemoryCards :cards="cards" />
  </div>
</template>

<script>
import MemoryCards from '@/components/specific/MemoryCard.vue'; // Adjust the path if needed

export default {
  name: 'RoomView',
  components: {
    MemoryCards
  },
  data() {
    return {
      // Sample data for cards, you can dynamically modify this
      cards: [
        { title: 'Card 1', description: 'Description for card 1' },
        { title: 'Card 2', description: 'Description for card 2' },
        { title: 'Card 3', description: 'Description for card 3' },
        { title: 'Card 4', description: 'Description for card 4' },
        // Add more cards as needed
      ]
    };
  }
};
</script>

<style scoped>
/* Add any styles specific to RoomView.vue here */
</style>
