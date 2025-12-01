<!-- Le composant AppFooter sera affiché dans toutes les pages, en bas du site -->
<template> <!-- Footer affichant le crédit de l'équipe du projet -->
  <footer class="app-footer">
    <p>Fait par l'équipe voyageur® 2025</p>
  </footer>
</template>
<script>export default
  { // Nom du composant pour l'identifier dans l'application 
    name: "AppFooter",
  }; </script>
<style scoped>
.app-footer {
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
  color: #7a7a7a;
  user-select: none;
}
</style>
