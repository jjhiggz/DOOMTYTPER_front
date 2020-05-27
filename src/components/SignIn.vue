<template>
  <div class="nes-container" id="sign-in-wrapper">
    <h2>sign in</h2>
    <form 
      @submit.prevent="login"
      class="sign-in-form"
    >
      <input
        type="text"
        class="username-input"
        placeholder="username"
        v-model="username"
      >
      <input
        type="password"
        class="username-input"
        placeholder="password"
        v-model="password"
      >
      <input type="submit" value="submit">
      <p>{{this.loginErrorMessage}}</p>
    </form>
    <h2>OR</h2>
    <h2>Sign Up</h2>
    <form 
      @submit.prevent="signUp"
      class="sign-in-form"
    >
      <input
        type="text"
        class="username-input"
        placeholder="username"
        v-model="signupUsername"
      >
      <input
        type="password"
        class="username-input"
        placeholder="password"
        v-model="signupPassword"
      >
      <input
        type="password"
        class="username-input"
        placeholder="confirm password"
        v-model="signupConfirmPassword"
      >
      <input type="submit" value="submit">
      <p v-if="!passMatch">passwords don't match</p>
      <p v-if="!passwordValid">Password Not Long Enough</p>
    </form>
  </div>
</template>



<script>
const url = "http://localhost:9000"
export default {
  name: 'SignIn',
  props: {
    render:Boolean,
  },
  computed: {
    usernameLength(){ return this.username.length},
    passwordLength(){ return this.signupPassword.length},
    passwordValid(){
      return this.passwordLength > 8
      ? true
      : false
    },
    passMatch(){
      return this.signupPassword === this.signupConfirmPassword
    }
  },
  methods: {
    login(){
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify(
        {"user":
          {
            "username":this.username,
            "password":this.password,
          }
        }
      );
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(url+"/login", requestOptions)
        .then(response => {
          if(!response.ok){
            throw Error(response.statusText)}
          return response.text()})
        .then(result => {
          const parsedResult = JSON.parse(result)
            if(Object.keys(parsedResult).includes('token')) {
              this.$emit("updateToken",result, this.username)
              localStorage.setItem('token', result )
              localStorage.setItem('username', this.username)
            }
            else{
              this.loginErrorMessage = JSON.parse(result).error
              this.username = ''
            }
        })
        .catch(error => console.log('error', error));
    },
    signUp(){
      if(this.passMatch){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(
          {"user":
            {
              "password":this.signupPassword,
              "username":this.signupUsername
            }
          }
        );
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:9000/users", requestOptions)
          .then(response => {
            if(!response.ok){
              throw Error(response.statusText)}
            return response.text()
          })
          .then(result => {
            const parsedResult = JSON.parse(result)
            if(Object.keys(parsedResult).includes('id') && parsedResult.id !== null) {
              this.username = this.signupUsername
              this.password = this.signupPassword
              this.login()
            }
            else{
              this.loginErrorMessage = JSON.parse(result).error
              this.username = ''
            }
          }
          )
          .catch(error => console.log('error', error));
      }
      else{
        this.signupPassword = ''
        this.signupConfirmPassword = ''
      }
    }
  },

  data(){
    
    return {
      username: '',
      password:'',
      hover: false,
      signupUsername:'',
      signupPassword:'',
      signupConfirmPassword:'',
      loginErrorMessage:'',
    }
  },

}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .title{
    color:white;
    background-color:black;
  }

  .sign-in-form{
    display:flex;
    flex-direction: column;
    align-items: center;

    width:100%;
  }
  .nes-container{
    border-color:red;
    color:white;
  }
  #sign-in-wrapper{
    flex-direction:column;;
    align-items: center;
    justify-content: center;
  }
  h2{
    padding:10px;
    color:white;
  }
  input{
    margin:10px;
  }


</style>



