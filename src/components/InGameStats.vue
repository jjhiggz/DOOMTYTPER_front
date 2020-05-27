<template>
  <div>
    <Timer
      :gameActive="gameProps.gameActive"
      :render="renders.game"
      :duration="gameProps.duration"
      @endGame="emitEndGame"
    />
    <StatCard
      :value="correctWordCount"
      :title="'Word Count'"
      :render="renders.inGameStats"
    />
    <StatCard
      :value="accuracy"
      :title="'Acc'"
      :render="renders.inGameStats"
    />
  </div>
</template>

<script>
import StatCard from './StatCard.vue'
import Timer from './Timer.vue'
export default {
  components:{
    StatCard,
    Timer,
  },
  props:{
    gameProps: {
      type: Object
    },
    renders: {
      type: Object
    }
  },
  methods:{
    emitEndGame(){
      this.$emit('endg')
    }
  }
}
</script>