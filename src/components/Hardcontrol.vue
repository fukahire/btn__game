<template>
  <div>
    <div class="hard__block">
      <input type="text" placeholder="請輸入數字" v-model="hardinput" @keyup.enter="hardsubmit" />
      <div is="GameBtn" @click.native="hardsubmit">調整難度</div>
    </div>
    <div class="hard__hint">
      {{ hint }}
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import GameBtn from './Gamebtn.vue'

export default {
  name: 'HardControl',
  data() {
    return {
      hardinput: '',
    }
  },
  methods: {
    hardsubmit: function () {
      let vm = this;
      this.$store.dispatch('hardcontrol', vm.hardinput);
    }
  },
  computed:{
    ...mapGetters(['hint']),
  },
  components: {
    GameBtn,
  },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hard__block {
  display: flex;
  gap: 5px;
}

input {
  border: none;
  border-radius: 10px;
  padding-left: 15px;
  background: #e5e5e5;
}

.hard__hint{
  height: 20px ;
  font-size: 1rem;
  display: block;
  margin-top: 10px;
  padding-left: 10px;
  text-align: left;
}
</style>
  