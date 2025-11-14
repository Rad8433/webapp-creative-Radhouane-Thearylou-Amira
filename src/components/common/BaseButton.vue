<template>
  <button
    class="base-button"
    :class="variant"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    variant: {
      type: String,
      default: "primary", // primary, ghost, icon
    }
  }
};
</script>

<style scoped>
.base-button {
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
  font-family: inherit;
  font-size: 1rem;
}

/* --- PRIMARY BUTTON (Commencer) --- */
.primary {
  background: #000;
  color: #fff;
  padding: 0.9rem 2.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.primary:hover {
  background: #111;
}

/* --- ICON BUTTON (Cogwheel) --- */
.icon {
  background: rgba(0, 0, 0, 0);
  padding: 0.45rem;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon:hover {
  background: rgba(0, 0, 0, 0.7);
}

.icon img {
  width: 24px;
  height: 24px;
}
</style>
