<template>
    <div class="room">
        <div class="memory-room">

            <!-- Go Back Button -->
            <button class="back-btn" @click="goBack">← Back</button>

            <!-- Centered Swiper -->
            <MemorySwiper />


        </div>
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

    export default {
        name: 'MemoryRoom',
        components: { MemorySwiper, BaseButton },

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
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: relative;
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
  