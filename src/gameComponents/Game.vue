<template>
<div id='game'>

  <div class="game-container nes-container" v-if="render" @click="focusInput">
    <div class="input-wrapper">
      <div class="test-input-group">
        <!-- below will need a v-for directive to populatee the right witht he incomplete words -->
        <span
          id='test-input-div'
          type='text'
          :key='word.id'
          v-for="word in completeWords"
          :class="[word.correct ? 'correct test-input' : 'incorrect test-input']"
          >
          {{word.word}}
        </span>
        <!-- if time alots, you can use indexFirstIncorrect Character to tell when the word is wrong but it creates a bug if the very first letter is wrong, it won't pick up on that -->
        <span 
          :class="[ isInputCorrect ? 'correct test-input' : 'incorrect test-input']"
          :key="this.input"
        >
          {{input}}
        </span>
      </div>
    </div>

    <div class="test-wrapper">
      <div class="test-prompt">
        <span 
          class="test-word current-word"
          :key="this.currentWordRight"
        >
          {{currentWordRight}}
        </span>
        <span
          class="test-word undefined"
          :key="testWord.id"
          v-for="testWord in testWords"
        >
          {{testWord.word}}
        </span>
      </div>
    </div>
  </div>
  <input
    class="input-box"
    id='test-input'
    ref="input"
    type='text'
    v-model="input"
    @input="handleInputChange"
  >
</div>
</template>

<script>

import { range, sample, slice, flatten, split} from 'lodash'
import { Sampler } from 'tone'
import  C1  from "../assets/gunShot.mp3"
import  C2  from "../assets/reload.mp3"


export default {
  name: 'Game',
  props: {
    render:{
      type:Boolean,
    },
    gameProps:{
      type:Object,
    }
  },
  created() {
    this.sampler = new Sampler(
      { C1 , C2 },
      {
        onload: () => {
          this.isLoaded = true;
        }
      },
    ).toMaster();
  },
  data(){
    return(
      {
        completeWords:[],
        currentWordIndex:0,
        currentCharacterIndex:0,
        input: '',
        lastCharacter: '',
      }
    )
  },
  watch: {
    render: function( newRender, oldRender ){
      if (
        newRender === true &&
        oldRender === false 
        ) this.focusInput()
    },
    gameProps: function( newGameProps, oldGameProps ){
      if(newGameProps.gameWords.length === 0 && oldGameProps.length !== 0){
        this.completeWords = []
        this.currentWordIndex = 0
        this.currentCharacterIndex = 0
        this.input =  ''
        this.lastCharacter= ''
      }
    }
},
  computed:{
    allWords: function(){
      return this.createTestWords(this.gameProps.gameWords)
    },
    currentWord: function(){
      return this.allWords[this.currentWordIndex]
    },
    currentWordSplit: function(){
      return split(this.currentWord.word,'')
    },
    currentInputSplit: function(){
      return split(this.input,'')
    },
    testWords: function(){
      return  slice(this.allWords,this.currentWordIndex + 1 , this.allWords.length)
    },
    isInputCorrect: function(){
      return this.input === this.currentWord.word
    },
    indexFirstIncorrectCharacter: function(){
      return range(this.currentInputSplit.length).find( index => (
        this.currentInputSplit[index] !== this.currentWordSplit[index]
      ))
    },
    currentWordRight: function(){
      return slice(
        this.currentWordSplit,
        this.indexFirstIncorrectCharacter || this.currentInputSplit.length,
        this.currentWordSplit.length
      ).join('') 
    },
  },
  methods:{
    focusInput() {
      this.$refs.input.focus()
    },
    handleInputChange(){
      this.isFirstLetter()
      this.input = event.target.value
      this.lastCharacter = this.input.substr(-1)
      if(this.isSpace(this.lastCharacter))(this.handleSpace())
      else(this.playGunShot())
    },
    isSpace(character){
      return character === ' ' ? true : false
    },
    handleSpace(){
      this.input = this.input.trim()
      this.playReload()
      const newWord = this.generateCompleteWord(this.currentWord, this.isInputCorrect)

      this.completeWords = [ 
        ...this.completeWords,
        newWord
      ]
      this.$emit('updateCompleteWords', newWord)

      this.currentWordIndex = this.currentWordIndex + 1
      this.input = ''
    },
    generateCompleteWord(word, isInputCorrect){
      return {
        id:word.id,
        correct: isInputCorrect ? true : false,
        word: this.input,
      }
    },  
    createTestWords(gameWords){
      const phrases = range(299).map( () => 
          split(sample(gameWords),' ')
        )
      const words = flatten(phrases).map((word,id) => (
        {
          word: word,
          class: 'incomplete',
          id,
        }
      ))
      return slice(words, 0, 299)
    },
    isFirstLetter: function(){
      if(this.input.length === 1 && this.currentWordIndex === 0){ 
        this.$emit('startGame')
      } 
    },
    playGunShot(){
      this.sampler.triggerAttack("C1")
    },
    playReload(){
      this.sampler.triggerAttack("C2")
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@800&family=Special+Elite&display=swap');
  .incorrect{
    color:red;
    text-decoration: line-through;
  }
  .correct{
    color:green
  }
  #game{
    display: flex;
    flex-direction: column;
    text-align:right;
    overflow:hidden;
    white-space: nowrap;
  }
  #test-input{
    width:0px;
    position:absolute;
    /* display: none; */
    border-width:0px;
  }
  .input-wrapper{
    text-align:right;
    white-space: nowrap;
    max-width:50%;
    min-width: 50%;
  }
  .test-input-group{
    float:right;
    min-width: 100%;
    white-space: nowrap;
    overflow:hidden;
  }
  .test-wrapper{
    max-width: 50%;
  }
  .test-prompt{
    float:left;
    max-width: 100%;
  }

  .game-container{
    color:yellow;
    display: flex;
    border-color:white;

    overflow:hidden;
    max-height:300px
  }
  span{
    padding-left: 5px;
    font-family:'Special Elite';
    font-size: 30px;
  }


  
</style>