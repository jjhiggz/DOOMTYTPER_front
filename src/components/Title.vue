<template>
  <div class="nes-container" v-if="render">
    <span class='logo'>
      <img class='logo-left' src='https://fontmeme.com/permalink/200512/4d1552af6c506fd05f5d823e5fecc3c1.png'>
      <img class='logo-right' src='https://fontmeme.com/permalink/200512/0ae7eb099280ce7eccf2997b22cdf27b.png'>
    </span>
    <h3 id='motto'>for your fight to 150wpm is eternal</h3>
  </div>
</template>

<script>
export default {
  props: {
    render: Boolean,
  }
}
</script>

<style scoped>
  .nes-container{
    background-image:url('https://media.giphy.com/media/3o6gE3Eh4CHsz0vsyI/giphy.gif');
    border-width: 10px;
    border-color: red;
    color:white
  }
  span{
    font-size:60px;
  }
  #motto{
    padding-bottom:0px;
    margin-bottom:0px;
    font-size:1em;
  }

  img .logo-left .logo-right{

    width:20%;
    transform:scale(200%);
    background-color:black; 
  }
  .logo-left, .logo-right, #motto{
    padding-right:20px;
    animation: pulse1 5s infinite;
  }
  .logo{
    animation: pulse 5s infinite;
  }

  @keyframes pulse1{
    0% {
      transform:scale(1)
    }
    50% {
      transform:scale(1.04)
    }
  }


</style>