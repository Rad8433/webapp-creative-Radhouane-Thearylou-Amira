<template>
  <header class="app-header">
    <!-- Title (default or custom) -->
    <h1 class="app-header__title">
      <slot name="title">
        {{ title }}
      </slot>
    </h1>

    <!-- Right side (settings button by default, customizable) -->
    <div class="app-header__right">
      <slot name="right">
        <BaseButton variant="icon">
          <img src="@/assets/cog.svg" alt="Paramètres" class="app-header__cog" />
        </BaseButton>
      </slot>
    </div>
  </header>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
  name: "AppHeader",
  components: { BaseButton },
  props: {
    title: {
      type: String,
      default: "Musée",
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.8rem 0.9rem;
}

.app-header__title {
  font-family: "Georgia", serif;
  font-size: 2rem;
  color: #ffffff;
}

.app-header__right img,
.app-header__cog {
  width: 32px;
  height: 32px;
}
</style>
