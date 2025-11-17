<template>
  <div class="filters-bar">
    <!-- Recherche -->
    <div class="filter-item filter-search">
      <span class="icon-loupe">🔍</span>
      <input
        type="text"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        placeholder="Recherche"
      />
      <span class="underline"></span>
    </div>

    <!-- Date -->
    <div class="filter-item">
      <button type="button">
        <span>{{ dateLabel }}</span>
        <span class="chevron">▾</span>
      </button>
      <span class="underline"></span>
      <!-- tu pourras remplacer ça par un vrai datepicker -->
    </div>

    <!-- Salles -->
    <div class="filter-item">
      <select
        :value="room"
        @change="$emit('update:room', $event.target.value)"
      >
        <option value="all">Toutes les salles</option>
        <option
          v-for="r in roomOptions"
          :key="r.value"
          :value="r.value"
        >
          {{ r.label }}
        </option>
      </select>
      <span class="underline"></span>
    </div>

    <!-- Tags -->
    <div class="filter-item">
      <select
        :value="tag"
        @change="$emit('update:tag', $event.target.value)"
      >
        <option value="all">Toutes les tags</option>
        <option
          v-for="t in tagOptions"
          :key="t.value"
          :value="t.value"
        >
          {{ t.label }}
        </option>
      </select>
      <span class="underline"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MuseumFilters",
  props: {
    search: { type: String, default: "" },
    dateLabel: { type: String, default: "Date" },
    room: { type: String, default: "all" },
    tag: { type: String, default: "all" },
    roomOptions: {
      type: Array,
      default: () => [], // [{ value:'vacances', label:'Salle Vacances' }, ...]
    },
    tagOptions: {
      type: Array,
      default: () => [], // [{ value:'mer', label:'#mer' }, ...]
    },
  },
  emits: ["update:search", "update:room", "update:tag"],
};
</script>

<style scoped>
.filters-bar {
  background-color: #25646a; /* fond vert/bleuté comme la capture */
  padding: 1.2rem 2.5rem;
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  color: #f5f5f5;
  font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

.filter-item {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;
}

.filter-item input,
.filter-item select,
.filter-item button {
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 400;
  width: 100%;
  padding: 0;
  padding-bottom: 0.25rem;
  cursor: pointer;
}

.filter-item input {
  cursor: text;
}

.filter-item select {
  appearance: none;
}

/* Loupe */
.filter-search {
  max-width: 260px;
}

.icon-loupe {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* Chevron */
.chevron {
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

/* Ligne sous chaque champ */
.underline {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
}

/* petit responsive */
@media (max-width: 900px) {
  .filters-bar {
    flex-wrap: wrap;
    row-gap: 1rem;
  }
}
</style>

