<template>
  <div class="nes-container game-choice-container with-title is-centered id-dark">
      <h2>Coming Soon</h2>
      <!-- <p class="title" id="title">YOU'RE STATS</p>
      <nav id="mylist" class="list nes-list is-circle">
        <p 
          :key="game.id"
          v-for="game in games"
          class="game-name"
          @click="handleClick($event, game)"
        >
          {{game.name}}
        </p> 
      </nav> -->
  </div>
</template>

<script>
export default {
  name:'YourStatsChoices',
  props: {
  games: {
      type:Array
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
  h2{
    background-color:red;
  }
  nav{
    height: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
  }
  p{
    color:yellow;
    background-color:black;
  }
  #title{
    background-color:black;
    color:yellow;
  }
  p:hover{
    transform: scale(1.1);
    color:orangered;
  }
</style>