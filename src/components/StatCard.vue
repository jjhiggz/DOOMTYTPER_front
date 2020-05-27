<template>
  <div class="stat-card nes-container" v-if="render">
    <div class="stat-title">{{title}}</div>
    <div class="equals">=</div>
    <div class="stat-value">{{value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title:{
      type: String 
    },
    value:{
      type: Number
    },
    render:{
      type: Boolean
    }
  }
}
</script>

<style scoped>
  .stat-card{
    display: flex;
    width:250px;
    align-items: center;
    font-weight: bold;
    justify-content: space-around;
    border-color:white;
    margin:10px;
    padding:5px
  }
  .stat-title{
    color:white;
    font-weight: bold;
    text-shadow: firebrick 4px 2px;
    width:100px; 
  }
  .equals{
    color:white;
    font-weight: bold;
    font-size:20px;
    text-shadow: firebrick 4px 2px;
    padding-left: 0;
  }
  .stat-value{
    color:red;
    color:white;
    text-shadow: firebrick 4px 2px;
    font-size:20px
  }
</style>