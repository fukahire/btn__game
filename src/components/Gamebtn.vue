<template>
    <div>
      <button class="btn"><slot>重新開始</slot></button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameBtn',
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .btn {
    background: salmon;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    color: white;
  }
  
  .btn:hover {
    background: #ef4444;
  }
  </style>
  