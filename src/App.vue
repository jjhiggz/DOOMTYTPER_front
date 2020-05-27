<template>
  <div
  id="app"
  class='nes-container
  nav-brand
  is-centered'>
    <Title
      :render="renders.title"
    />
    <SignIn
      :render="renders.signIn" 
      @updateToken="login"
      v-if="!loggedIn"
    />
    <GameNav 
      @setNav="setNav"
      :render="renders.gameNav"
      :username="username"
      v-if="loggedIn"     
    />
    <YourStatsChoices
      v-if="navItem === 'Your Stats' && loggedIn===true "
      :games="games"
    />
    <LeaderBoardChoices
      v-if="navItem === 'Leader Board'  && loggedIn===true "  
      :games="games"
    />
    <GameChoices
      :render="renders.gameNav"
      :games="games"
      @selectGame="selectGame"
      v-if="navItem === 'Select A Game'  && loggedIn===true "     
      />
    <div
    class="in-game-stats"
    v-if="loggedIn"     
    >
      <Timer
        :gameActive="gameProps.gameActive"
        :render="renders.game"
        :duration="gameProps.duration"
        @endGame="endGame"
      />
      <StatCard
        :value="correctedCompletedWordCount"
        :title="'Word Count'"
        :render="renders.inGameStats"
      />
      <StatCard
        :value="accuracy"
        :title="'Acc'"
        :render="renders.inGameStats"
      />
    </div>
    <div class="post-game-stats"
      v-if="renders.postGameStats"
      @keyup="submitGameStats">
      <StatCard
        :value="wpm"
        :title="'WPM'"
        :render="renders.postGameStats"
      />
      <StatCard
        :value="correctedCompletedWordCount"
        :title="'Word Count'"
        :render="renders.postGameStats"
      />
      <StatCard
        :value="accuracy"
        :title="'Acc'"
        :render="renders.postGameStats"
      />
    </div>
    <Game
      :render="renders.game"
      :gameProps="gameProps"
      @updateCompleteWords="updateCompleteWords"
      @startGame="startGame"
    />

    <button
      v-if="renders.postGameStats"
      class="return-button"
      @click="submitGameStats"
    >
    Submit
    </button>
  </div>
</template>

<script>

import SignIn from './components/SignIn.vue'
import Title from './components/Title.vue'
import StatCard from './components/StatCard.vue'
import GameNav from './components/GameNav.vue'
import Timer from './components/Timer.vue'
import YourStatsChoices from './menuOptions/YourStatsChoices.vue'
import LeaderBoardChoices from './menuOptions/LeaderBoardChoices.vue'
import GameChoices from './menuOptions/GameChoices.vue'
import Game from './gameComponents/Game.vue'
import { round, flatten } from 'lodash'
import { Player } from 'tone'
import gameMusicURL from './assets/inGameMusic.mp3'
const url = 'http://localhost:9000'


export default {
  name: 'App',
  data(){
    return {
      renders: {
        title: true,
        signIn: true,
        gameNav: true,
        timer: true, //default false
        gameChoices: true,
        game: false, //default false
        leaderBoardChoices: true,
        inGameStats: false,
        postGameStats:false,
      },
      gameProps:  {
        gameName: '',
        gameId: 0,
        gameActive: false,
        gameWords: [],
        completedWords:[],
        duration:45,
      },
      token:'',
      username:'',
      games: [],
      navItem: ''
    }
  },
  components: {
    SignIn,
    Title,
    GameNav,
    Timer,
    GameChoices,
    Game,
    StatCard,
    YourStatsChoices,
    LeaderBoardChoices,
  },
  mounted: function(){
      this.$nextTick(function(){
      fetch(`${url}/games`)
        .then(response => response.json())
        .then(games => this.populateGames(games))
      })
      this.$nextTick(function(){
        if(localStorage.getItem('token')!== null){
          this.token = localStorage.getItem('token')
          this.username = localStorage.getItem('username')
        }
      })
  },
  created(){
    this.player = new Player(
      gameMusicURL
    ).toMaster()
  ;
  },
  computed: {
    loggedIn(){
      return this.token.length !== 0 ? true : false
    },
    correctWords(){
      return this.gameProps.completedWords.filter(word => word.correct === true)
    },
    incorrectWords(){
      return this.gameProps.completedWords.filter(word => word.correct === false)
    },
    correctWordCount(){
      return +this.correctWords.length
    },
    incorrectWordCount(){
      return +this.incorrectWords.length
    },
    completedWordCount(){
      return this.correctWordCount + this.incorrectWordCount
    },
    accuracy(){
      return this.completedWordCount != 0 ? 
      +round((this.correctWordCount/this.completedWordCount*100), 1).toFixed(1)|| 100 :
      +100.0
    },
    wpm(){
      return +round((this.correctedCompletedWordCount*60/this.gameProps.duration),1).toFixed(1)
    },
    renderMainMenuButton(){
      return !this.renders.postGameStats && this.loggedIn 
    },
    correctedCompletedWordCount(){
      const kebabCaseCorrected = flatten(this.correctWords.map(word => word.word.split('-')))
      const snakeCaseCorrected = flatten(kebabCaseCorrected.map(word => word.split('_')))
      const camelCaseCorrected = flatten(snakeCaseCorrected.map(word => word.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')))
      
      return camelCaseCorrected.length
    },
  },
  methods: {
    populateGames(games){
      let allGames = []
      games.forEach(game => {
        allGames.push(game)
      })
      this.games = allGames
    },
    selectGame({name, id, words}){
      this.gameProps = {
        ...this.gameProps,
        gameName: name,
        gameId: id
      }
      this.extractWords(words)
      this.openGame()
    },
    extractWords: function(jsonWords){
      const words = JSON.parse(jsonWords)
      this.gameProps.gameWords = words
    },
    updateCompleteWords: function(newWord){
      this.gameProps.completedWords = [...this.gameProps.completedWords, newWord]
    },
    startGame: function(){
      this.gameProps.gameActive = true
      this.renders.inGameStats = true
      this.player.start()
    },
    endGame(){
      this.gameProps.gameActive = false
      this.renders.game = false
      this.renders.inGameStats = false
      this.renders.timer = false
      this.postScore()
      this.renders.postGameStats = true
      // this.resetGameProps()
      this.player.stop()
    },
    postScore(){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${JSON.parse(this.token).token}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "score":{
          "game_id":this.gameProps.gameId,
          "time_complete": this.gameProps.duration,
          "words_correct": this.correctedCompletedWordCount,
          "accuracy": this.accuracy,
          "wpm": this.wpm,
          }});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${url}/scores`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },
    openGame(){
      this.renders = { 
        title: true,
        signIn: false,
        gameNav: false,
        timer: true, //default false
        gameChoices: false,
        game: true, //default false
        LeaderBoardChoices: false,
        inGameStats: true,
        postGameStats:false,
      }
    },
    goToMainMenu(){
      this.resetGameProps()
      this.player.stop()
      this.renders = {
        title: true,
        signIn: false,
        gameNav: true,
        timer: false, //default false
        gameChoices: true,
        game: false, //default false
        leaderBoardChoices: false,
        inGameStats: false,
        postGameStats:false,
      }
    },
    submitGameStats(){
      this.goToMainMenu()
      this.player.stop()
      this.resetGameProps()
    },
    resetGameProps(){
      this.gameProps = {
        gameName: '',
        gameId: 0, 
        gameActive: false,
        gameWords: [],
        completedWords:[],
        duration:45,
      }
    },
    setNav(string){
      return {
        "Your Stats": () => this.navItem = 'Your Stats',
        "Logout": () => this.logout(),
        "Select a Game": () => this.navItem ='Select A Game',
        "Leader Board": () => this.navItem = 'Leader Board',
      }[string]()
    },
    login( token, username){
      this.token = token
      this.username = username
    },
    logout(){
      this.resetGameProps()
      this.token = ''
      localStorage.setItem('token','')
      localStorage.setItem('username','')
    }
  }
}
</script>

<style >
  @import "../node_modules/nes.css/css/nes.css";
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); 
  /* Press Start 2P */
  #app{
    min-height:100vh;
    background-color:black;
  }
  h1{
  font-size: 100px;
  }
  .hide{
    display:none;
  }
  .in-game-stats{
    display: flex;
    justify-content: space-evenly;
  }
  .post-game-stats{
    display: flex;
    justify-content: space-evenly;
  }
  .return-button{
    margin:10px;
  }
</style>
