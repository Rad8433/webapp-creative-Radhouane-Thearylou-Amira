<template>
    <div class="menu">
      {{ msg }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        msg: 'Bonjour!'
      }
    }
  }
  </script>
  
  <style>
  .menu {
    background: blue;
    color: white;
    padding: 10px;
    text-align: center;
  }
  </style>
  