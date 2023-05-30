import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        minigame: [
            { minibtn: false },
            { minibtn: false },
            { minibtn: false },
            { minibtn: false },
            { minibtn: false },
            { minibtn: false }
        ],
        intro: '把所有按鈕變成橘色便能過關！',
        score: 0,
        flag: false,
        hint:'',
    },
    // 操作行為
    actions: {
        // 重新開始
        restartgame(context) {
            // 將所有按鈕變成false
            context.commit('FALSE');
            // 改變介紹的文字
            context.commit('INTRO', '把所有按鈕變成橘色便能過關！');
            // 勝利條件改成未達到
            context.commit('FLAG', false);
            // 計數歸零
            context.commit('SCORE', 0);
        },
        // 按遊戲鈕
        change(context, status) {
            // 取陣列長
            let btnleng = this.state.minigame.length;
            // 取該元素索引
            let val = this.state.minigame.indexOf(status);
            // 改遊戲鈕state狀態
            context.commit('CHANGEBTN', { val, btnleng });
            // 計數，走一步+1
            context.dispatch('calculate');
        },
        // 計步數
        calculate(context) {
            // 目前state總步數+1個新步數
            let num = this.state.score + 1;
            context.commit('SCORE', num);
            // 判斷勝利條件
            // 計目前元素皆為true的陣列長度
            let calary = this.state.minigame.filter(el => el.minibtn === true);
            // 如果 true 陣列長度與原陣列長度相等，是的話結束遊戲並顯示總步數；不是的話計目前走了幾步
            calary.length === this.state.minigame.length ? context.commit('FINISH', num) : context.commit('INTRO', `目前走了${num}步`);
        },
        // 增加難度
        morehard(context) {
            // 重啟遊戲
            context.dispatch('restartgame');
            // 計算目前陣列的長度
            let hardnum = this.state.minigame.length;
            // 從該長度取對應數量的數字
            let block = Math.trunc(hardnum / 3);
            context.commit('GAMETOZERO', block)

        },
        // 難度控制
        hardcontrol(context, status) {
            // console.log(hardinput)
            // 轉純數字
            let num = parseInt(status);
            // 數字大於3時改變數量
            if (num >= 3 && num <=15) {
                // 新陣列
                let ary = [];
                // 照數字填進同數量的物件
                context.commit('HINT', ``)
                for (let i = 0; i < num; i++) {
                    ary.push({ minibtn: false })
                    // 傳到state.minigame 物件
                    context.commit('MINIGAME', ary)
                    // 重啟遊戲
                    context.dispatch('restartgame');
                }
            }else {
                context.commit('HINT', `請輸入大於3且小於15的數字`)
            }
        }
    },
    // 實際操作狀態
    mutations: {
        GAMETOZERO(state, payload) {
            // 新增一個空陣列
            let ary = [];
            // 依block(障礙)數量設置相應數量的障礙
            for (let i = 0; i < payload; i++) {
                // 對空陣列推入隨機數字
                ary.push(Math.floor(Math.random() * state.minigame.length))
            }
            // console.log(ary);
            // 空陣列元素的值對應原陣列的索引位置，改為true
            ary.map(el => state.minigame[el].minibtn = true);
        },
        SCORE(state, payload) {
            state.score = payload
        },
        INTRO(state, payload) {
            state.intro = payload
        },
        FLAG(state, payload) {
            state.flag = payload;
        },
        CHANGEBTN(state, { val, btnleng }) {
            // 點一下變相反
            state.minigame[val].minibtn = !state.minigame[val].minibtn;
            // 如果該元素位置不是第一個，那前一個都改變狀態
            if (val > 0) {
                state.minigame[val - 1].minibtn = !state.minigame[val - 1].minibtn;
            }

            // 如果該元素位置不是最後一個，那後一個都改變狀態
            if (val < btnleng - 1) {
                state.minigame[val + 1].minibtn = !state.minigame[val + 1].minibtn;
            }

        },
        FALSE(state) {
            state.minigame.forEach(item => item.minibtn = false);
        },
        MINIGAME(state, payload){
            state.minigame = payload
        },
        // 遊戲結束
        FINISH(state,payload) {
            // 敘述顯示結束遊戲
            state.intro =  `恭喜過關，總共花了${payload}步`
            // 有達成勝利條件
            state.flag = true
        },
        HINT(state,payload){
            state.hint = payload
        }
    },
    getters:{
        minigame: state => state.minigame,
        flag: state => state.flag,
        intro: state => state.intro,
        hint: state => state.hint
    }
})