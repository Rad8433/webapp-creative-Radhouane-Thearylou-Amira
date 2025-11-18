<template>
  <div class="optionbar">
    <!-- Recherche (Search) -->
    <div class="optionbar__item optionbar__item--search">
      <span class="optionbar__icon">
        <!-- simple loupe -->
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#3a3a3a" stroke-width="2" fill="none" />
          <line x1="16" y1="16" x2="21" y2="21" stroke="#3a3a3a" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>

      <input type="text" :value="search" @input="$emit('update:search', $event.target.value)" placeholder="Recherche" />
      <span class="optionbar__underline"></span>
    </div>

    <!-- Room (Dropdown for selecting room) -->
    <div v-if="showRoom" class="optionbar__item">
      <div class="optionbar__select-wrapper">
        <select :value="room" @change="$emit('update:room', $event.target.value)">
          <option value="all">Toutes les salles</option>
          <option v-for="r in roomOptions" :key="r.value" :value="r.value">
            {{ r.label }}
          </option>
        </select>
        <span class="optionbar__chevron">▾</span>
      </div>
      <span class="optionbar__underline"></span>
    </div>

    <!-- Tag (Dropdown for selecting tags) -->
    <div class="optionbar__item">
      <div class="optionbar__select-wrapper">
        <select :value="tag" @change="$emit('update:tag', $event.target.value)">
          <option value="all">Tous les tags</option>
          <option v-for="t in tagOptions" :key="t.value" :value="t.value">
            {{ t.label }}
          </option>
        </select>
        <span class="optionbar__chevron">▾</span>
      </div>
      <span class="optionbar__underline"></span>
    </div>

    <!-- Date (Dropdown for selecting date) -->
    <div v-if="showDate" class="optionbar__item">
      <div class="optionbar__select-wrapper">
        <select :value="date" @change="$emit('update:date', $event.target.value)">
          <option value="all" disabled>Date</option>
          <option value="recent">Récent</option>
          <option value="old">Ancien</option>
        </select>
        <span class="optionbar__chevron">▾</span>
      </div>
      <span class="optionbar__underline"></span>
    </div>

    <!-- Mémoires (Sorting by memory count) -->
    <div v-if="showSort" class="optionbar__item optionbar__item--sort">
      <div class="optionbar__select-wrapper">
        <select :value="sort" @change="$emit('update:sort', $event.target.value)">
          <option value="asc">Mémoires ↑ (croissant)</option>
          <option value="desc">Mémoires ↓ (décroissant)</option>
        </select>
        <span class="optionbar__chevron">▾</span>
      </div>
      <span class="optionbar__underline"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionBar",
  props: {
    search: {
      type: String,
      default: "",
    },
    room: {
      type: String,
      default: "all",
    },
    tag: {
      type: String,
      default: "all",
    },
    sort: {
      type: String,
      default: "asc",
    },
    date: {
      type: String,
      default: "all",
    },
    roomOptions: {
      type: Array,
      default: () => [],
    },
    tagOptions: {
      type: Array,
      default: () => [],
    },
    showRoom: {
      type: Boolean,
      default: true,
    },
    showSort: {
      type: Boolean,
      default: true,
    },
    showDate: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:search", "update:room", "update:tag", "update:sort", "update:date"],
};
</script>
<style scoped>
.optionbar {
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  padding: 0.8rem 0;
  background-color: tra;
  color: #3a3a3a;
  font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-size: 0.95rem;
}

.optionbar__item {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;
}

.optionbar__item--search {
  max-width: 260px;
}

.optionbar__icon {
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
}

.optionbar__item input,
.optionbar__item select {
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  width: 100%;
  padding: 0;
  padding-bottom: 0.3rem;
}

.optionbar__item input {
  cursor: text;
}

.optionbar__item select {
  appearance: none;
  cursor: pointer;
}

.optionbar__select-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.optionbar__chevron {
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.optionbar__underline {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(58, 58, 58, 0.4);
}

@media (max-width: 900px) {
  .optionbar {
    flex-wrap: wrap;
    gap: 1.2rem;
  }
}
</style>
