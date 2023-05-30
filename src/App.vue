<template>
  <div id="app">
    <div class="game">
      <div>
        <div class="game_title">按鈕小遊戲</div>
        <div class="game_intro">{{ intro }}</div>
      </div>
      <div is="MiniBtn"></div>
      <div class="control__block">
          <div is="HardControl"></div>
        <div is="GameBtn" @click.native="morehard">變難</div>
        <div is="GameBtn" @click.native="restartgame()">重新開始</div>
      </div>

    </div>
  </div>
</template>

<script>
import GameBtn from './components/Gamebtn.vue'
import MiniBtn from './components/Minibtn.vue'
import HardControl from './components/Hardcontrol.vue'

import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
    morehard:function(){
      this.$store.dispatch('morehard');
    },
    restartgame: function () {
      this.$store.dispatch('restartgame');
    }
  },
  computed:{
    ...mapGetters(['minigame', 'intro']),
  },
  components: {
    GameBtn,MiniBtn,HardControl,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none; 
}

.control__block {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
}

#app {
  background: #e7e5e4;
  height: 100vh;
  display: flex;
  align-items: center;
}

.game {
  text-align: center;
  align-items: center;
  padding: 30px 0;
  width: 100%;
  background: white;
}


.game_title {
  font-weight: 900;
  font-size: 1.8rem;
  background: salmon;
  color: white;
  padding: 10px 10px;
  border-radius: 40px;
  text-align: center;
  margin: 0 auto 60px;
  width: 200px;
}

.game_intro {
  text-align: center;
  margin-bottom: 40px;
}
</style>
