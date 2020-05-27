<template>
    <div class="nes-container game-choice-container with-title is-centered id-dark">
        <p class="title" id="title">LeaderBoardChoices</p>
        <nav
          id="mylist"
          class="list nes-list is-circle"
          v-if="renderChoices"
        >
          <p 
            :key="game.id"
            v-for="game in games"
            class="game-name"
            @click="handleClick($event, game)"
          >
            {{game.name}}
          </p> 
          
        </nav>
        <LeaderBoard
          :scores="scores"
          :game="gameID"
          v-if="renderBoard"
          @backToChoices="backToChoices"
        />

    </div>
</template>

<script>
import LeaderBoard from './LeaderBoard'
import { orderBy } from 'lodash'
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'http://doomtyper-backend.herokuapp.com'
export default {
  name:'LeaderBoardChoices',
  components: {
    LeaderBoard
  },
  props: {
    games: {
      type:Array
    },

  },
  data(){
    return {
      gameID: 0,
      renderBoard: false,
      scores:[]
    }
  },
  computed: {
    renderChoices(){
      return !this.renderBoard
    }
  },
  watch: {
    gameID: function(){
      this.fetchScores()
    }
  },
  methods:{
    handleClick(event, gameObject){
      this.gameID = gameObject.id
      this.fetchScores()
    },
    fetchScores(){
      fetch(`${url}/scores/${this.gameID}`)
        .then(response => response.text())
        .then(result => this.sortScores(result))
        .catch(error => console.log('error', error));
    },
    sortScores(scores){
      scores = orderBy(JSON.parse(scores), ['accuracy','wpm']).reverse() 
      if( scores.length > 20 ){
        this.scores = scores.slice( 0, 20 )
      }
      else(
        this.scores = scores.slice(0, scores.length)
      )
      
      this.renderBoard = true
    },
    backToChoices(){
      this.renderBoard = false
    }

  }
  
}
</script>

<style scoped lang="scss">
  .nes-container{
    background-image: url('https://i.ytimg.com/vi/5z9NzHoF4qg/maxresdefault.jpg');
    color:white;
    border-color: white;
    background-repeat: repeat;
    background-position: center center;
  }
  nav{
    height: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
  }
  p{
    color:aqua;
    background-color:black;
  }
  #title{
    background-color:black;
    color:aqua;
  }
  p:hover{
    transform: scale(1.1);
    color:orangered;
  }
  button{
    background-color:red;
    color:white;
  }
</style>