<template>
  <div class="scores">

    <table class="nes-table is-bordered is-centered">
    <thead>
      <tr>
        <th>Username</th>
        <th>Accuracy</th>
        <th>WPM</th>

      </tr>
    </thead>
    <tbody
      :key="score.id"
      v-for="score in scores"
      class="score"
    >
      <tr>
        <td>{{score.user.username}}</td>
        <td>{{score.accuracy}}</td>
        <td>{{score.wpm}}</td>
      </tr>
    </tbody>
  </table>
  <button
    @click="backToChoices"
  >
  ---
  </button>
  </div>

</template>

<script>
export default {
  name:'LeaderBoard',
  props: {
    game:{
      type:Number
    },
    scores:{
      type:Array
    }
  },
  methods: {
    backToChoices(){
      this.$emit("backToChoices")
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
  th{
    color:black;
  }
  td{
    color:black;
  }
  .scores{
    display: flex;
    justify-content:center;
    flex-direction: row;
  }
  button{
    background-color:red;
    color:white;
  }
</style>