<template>
  <div class="optionbar" :class="`optionbar--${variant}`">
    <!-- Recherche de room par la barre de recherche. -->
    <div class="optionbar__item optionbar__item--search">
      <!-- Icon de la barre de reherche. -->
      <span class="optionbar__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none" />
          <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>
      <!-- Input de recherche avec liaison bidirectionnelle via des événements émis. -->
      <input type="text" :value="search" @input="$emit('update:search', $event.target.value)" placeholder="Recherche" />
      <!-- Ligne de soulignement sous l’input -->
      <span class="optionbar__underline"></span>
    </div>

    <!-- Filtrage par le choix du type de salle.-->
    <div v-if="showRoom" class="optionbar__item">
      <div class="optionbar__select-wrapper">
        <select :value="room" @change="$emit('update:room', $event.target.value)">
          <option value="all">Toutes les salles</option>
          <option v-for="r in roomOptions" :key="r.value" :value="r.value">
            {{ r.label }}
          </option>
        </select>
        <!-- Chevron pour indiquer le menu déroulant -->
        <span class="optionbar__chevron">▾</span>
      </div>
      <!-- Ligne de soulignement sous l’input -->
      <span class="optionbar__underline"></span>
    </div>

    <!-- Filtrage par le choix de tags.-->
    <div v-if="tagOptions.length > 0" class="optionbar__item">
      <div class="optionbar__select-wrapper"> <select :value="tag" @change="$emit('update:tag', $event.target.value)">
          <option value="all">Tous les tags</option>
          <option v-for="t in tagOptions" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select> <span class="optionbar__chevron">▾</span> </div> <span class="optionbar__underline"></span>
    </div>

    <!-- Ordre d'apparition par les dates des cards ajoutes dans la salle.-->
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

    <!-- Tri des salles par ordre croissant ou décroissant.-->
    <div v-if="showSort" class="optionbar__item optionbar__item--sort">
      <div class="optionbar__select-wrapper"> <select :value="sort" @change="$emit('update:sort', $event.target.value)">
          <option value="asc">Mémoires ↑ (croissant)</option>
          <option value="desc">Mémoires ↓ (décroissant)</option>
        </select> <span class="optionbar__chevron">▾</span> </div> <span class="optionbar__underline"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OptionBar", props: {
      search: { 
        type: String, 
        default: "" // La valeur de la barre de recherche.
      }, 
      room: {
        type: String,
        default: "all" // La salle sélectionnée pour le filtrage.
      }, 
      tag: { 
        type: String, 
        default: "all" // Le tag sélectionné pour le filtrage.
      }, 
      sort: { 
        type: String, 
        default: "asc" // L’ordre de tri sélectionné.
      }, 
      date: { 
        type: String,
        default: "all" // Le filtre de date sélectionné.
      }, 
      roomOptions: { 
        type: Array, default: () => [] // Options disponibles pour le filtrage par salle.
      }, 
      tagOptions: { 
        type: Array, default: () => [] // Options disponibles pour le filtrage par tag.
      },
      showRoom: { 
        type: Boolean, 
        default: true // Contrôle l’affichage du filtre par salle.
      }, 
      showSort: { 
        type: Boolean, 
        default: true // Contrôle l’affichage du filtre de tri.
      }, 
      showDate: { 
        type: Boolean,
        default: true // Contrôle l’affichage du filtre de date.
      }, 
      variant: { 
        type: String, 
        default: "dark" // Style général de la barre d’options.
      }
    }, emits: ["update:search", "update:room", "update:tag",
      "update:sort", "update:date"] // Événements émis pour la liaison bidirectionnelle des props.
  }; 
</script>

<style scoped>
/* Style de la barre d’options */
  .optionbar {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 3rem;
    padding: 0.8rem 0;
    background-color: transparent;
    font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 0.95rem;
  }

/* Variante claire pour la barre d’options */
  .optionbar--light {
    color: white;
  }
/* Styles spécifiques pour la variante light */
  .optionbar--light .optionbar__underline {
    background-color: rgba(255, 255, 255, 0.4);
  }
/* Styles des placeholders dans la variante light */
  .optionbar--light ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
/* Styles des inputs dans la variante light */
  .optionbar--light select {
    color: #222;
  }
/* Styles des options dans la variante light */
  .optionbar--light select option {
    color: #222;
  }
/* Styles des éléments de la barre d’options */
  .optionbar__item {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 180px;
    flex-grow: 1;
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