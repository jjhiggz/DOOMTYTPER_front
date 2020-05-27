<template>
    <div v-bind:class="{'ten-sec': this.tenSecsLeft}" v-if="render">
      <div class="property nes-container">
        <p>{{timeLeft}}</p>
      </div>
    </div>
</template>

<script>

export default {
  name:'Timer',
    props: {
      render: {
        type:Boolean
      },
      gameActive:{
        type:Boolean
      },
      duration:{
        type:Number
      }
  },
  data(){
    return {
      timerStartTime: this.duration,
      timeLeft: 0,
      interval: undefined,
    }
  },
  watch: {
    gameActive: function( newGameActive, oldGameActive ){
      if(newGameActive === false &&
        oldGameActive === true ){
        clearInterval(this.interval)
        this.interval = undefined
        this.timeLeft = this.timerStartTime
        }
      if(
        newGameActive === true &&
        oldGameActive === false 
        // &&
        // this.render === true
        ) 
        this.startGame()
    }
  },
  methods: {
    decrementTimeLeft: function(){
      this.timeLeft = this.timeLeft - 1
      this.timeLeft === 0 && (
        clearInterval(this.interval),
        this.interval = undefined,
        // this.timeLeft = this.timerStartTime,
        this.$emit('endGame')
      )
    },
    startGame: function(){
      this.timeLeft = this.duration
      if(!this.interval){
        this.interval = setInterval(
          this.decrementTimeLeft
        , 1000)
      }
    },
  },
  computed: {
    timerActive: function(){
      return ( this.interval ? true : false )
    },
    tenSecsLeft: function(){
      return (this.timeLeft <= 10 ? true : false)
    },
    oddNumberCurrentTime: function(){
      return (this.timeLeft%2 !== 0 ? true : false )
    },
  }
  
}
</script>

<style scoped>
  .timer-container{
  color:white;
  border-color: red;
  }
  .property{
    font-size: 4em;

  }
  .ten-sec p{
    color:red;
    transform:scale(1.3)
  }
  p{
    color:green;
  }
</style>