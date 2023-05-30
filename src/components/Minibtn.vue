<template>
  <div class="game__block">
    <button class="mini__btn" v-for="item in minigame" :class="{ 'active': item.minibtn, 'complete': flag }" @click.prevent="change(item)"
      :disabled="flag" :key="item.id"></button>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MiniBtn',
  methods: {
    change: function (item) {
      this.$store.dispatch('change',item);
    }
    
  },
  computed:{
    ...mapGetters(['flag', 'minigame']),
  },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mini__btn {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
  border: none;
  background: #e2e8f0;
}


.mini__btn:hover {
  background: #94a3b8;
}

.active {
  background: #fdba74;
}

.mini__btn:hover {
  background: #94a3b8;
}

.complete {
  background: #fcd34d;
  ;
  cursor: unset;
}

.complete:hover {
  background: #fcd34d;
  ;
}


.game__block {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
  