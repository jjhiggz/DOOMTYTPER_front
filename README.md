# DOOMTYPER frontend

## Intro

  Welcome to DOOMTYPER, the most brutal way to improve your typing skills. I built this project for my capstone project graduating from flatiron university, but now that people are actually playing it I will work to improve the functionality of the website, the security of game scores, adding a survival mode, and more. I will use this game as an oppurtunity to learn new skills from security features, to vuex and vue router.  If you would like to be involved as a developer please reach out. 

  The Game can be found at https://doomtyper.web.app/ 
  Here is a demo of the game https://www.youtube.com/watch?v=X89GhBsxseE 

## Project setup
  If you plan on working with this reaper. First clone the repository into your repo, then type in 
```
npm install
```
After that to run the server locally please use 
```
npm run serve
```
## Components

### SignIn
  This component is the sign in / sign up component and is the user interface for signing up. There is still some bugginess to work out with the password validations for login and for sign in. 

### GameNav
  This is the nav bar that allows you to choose between your stats, games, leaderboards, and logging out. This component needs to be responsively styled. 

### InGameStats 
  This component represents the stats that show up in the middle of the game except for the timer. This includes, acc, wpm, and words correct. 

### PostGameStats
  This is the component with the stats that appear right after finishing the game.

### StatCard
  This is the component used to represent a full stat represented with a box. 

### Timer
  The Timer manages the timing of each game. The logic works where the timer watches when the GameActive prop of the app component changes, and if it goes from inactive to active then the timer starts. The when the timer runs out it will bubble out an event that triggers the gameActive status to stop. 
  w
### Title
  The Title is just a neat little CSS HTML grouping that has some custom titling, combined with GIF's to make the aesthetic of the game feel DOOM-ey.
  Feel free to mess around with this and if you come up with something cool then send it over. 

### Game
  This component represents the physical game itself. App.vue passes in a list of potential game phrases, Game.Vue takes those phrases and randomly samples them to make a new array of phrases that is much longer. 

### GameChoices 
  This Component simply lists out all of the Game Choices. It makes a call from the backend in order to get a list of all the games and their game words.

### LeaderBoard
  This Component is fed by the LeaderBoardChoices and will simply list whatever scores that LeaderBoardChoices feeds into it. 

###  LeaderBoard Choices
  This Component lists all of the games and if a user selects one, then will send the top 20 scores for that game to the LeaderBoard

### YourStatsChoices
  Currently this component isn't being used, there is still alot of development to be done in order to get the YourStats Component fully functioning

