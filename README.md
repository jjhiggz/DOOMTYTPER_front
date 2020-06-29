# DOOMTYPER 
> The most brutal way to improve your typing skills. 

## Intro
DOOMTYPER is a DOOM-themed typing test built with a VueJS frontend and a Rails Backend. Users can compete to get the highest typing scores on a variety of different word topics. The game features music from the original DOOM video game to provide an 8-bit demon fantasy typing experience.

> The Game can be found at https://doomtyper.web.app/ 

## Demo
![gif title](https://github.com/jjhiggz/DOOMTYTPER_front/blob/master/src/assets/DoomtyperDemo.gif?raw=true)
above is a gif of a runthrough of the game, a trailer with sound can be found @https://www.youtube.com/watch?v=X89GhBsxseE 
  

## Project setup
  If you plan on working with this code. First clone the repository into your directory, then type in 
```
npm install
```
After that to run the server locally please use 
```
npm run serve
```

## Component List
Below is a list of all the components used to make the app. There is no state management, or routing tool. As a result components are conditionally rendered based on their state or props passed to them. In the future I would like to make use of slots to reduce the amount of logic necessary for the functionality of the game. 

- ### SignIn

  This component is the sign in / sign up component and is the user interface for signing up. There is still some bugginess to work out with the password validations for login and for sign in. 

- ### GameNav
  This is the nav bar that allows you to choose between your stats, games, leaderboards, and logging out. This component needs to be responsively styled. 

- ### InGameStats 
  This component represents the stats that show up in the middle of the game except for the timer. This includes, acc, wpm, and words correct. 

- ### PostGameStats
  This is the component with the stats that appear right after finishing the game.

- ### StatCard
  This is the component used to represent a full stat represented with a box. 

- ### Timer
  The Timer manages the timing of each game. The logic works where the timer watches when the GameActive prop of the app component changes, and if it goes from inactive to active then the timer starts. The when the timer runs out it will bubble out an event that triggers the gameActive status to stop. 
  
- ### Title
  The Title is just a neat little CSS HTML grouping that has some custom titling, combined with GIF's to make the aesthetic of the game feel DOOM-ey.
  Feel free to mess around with this and if you come up with something cool then send it over. 

- ### Game
  This component represents the physical game itself. App.vue passes in a list of potential game phrases, Game.Vue takes those phrases and randomly samples them to make a new array of phrases that is much longer. 

- ### GameChoices 
  This Component simply lists out all of the Game Choices. It makes a call from the backend in order to get a list of all the games and their game words.

- ### LeaderBoard
  This Component is fed by the LeaderBoardChoices and will simply list whatever scores that LeaderBoardChoices feeds into it. 

- ###  LeaderBoard Choices
  This Component lists all of the games and if a user selects one, then will send the top 20 scores for that game to the LeaderBoard

- ### YourStatsChoices
  Currently this component isn't being used, there is still alot of development to be done in order to get the YourStats Component fully functioning

## Future Goals
- ### Survival mode
    
    In Survival mode, users will be tasked with typing for as long as possible. The game will start with 30wpm requirement. Every 5 seconds the required WPM will increase by 2, then users will be scored on how long they lasted.

- ### User Stats
    
    In the future, users will be able to see which characters they are most likely to miss. They will see which words they are most likely to miss. They will also be able to see graphically how their typing speed has changed over time. 

- ### Improved Score Security
    
    Currently it is not difficult to make a post request to the backend without actually playing the game. Fortunately/Unfortunately, I had enough people playing the game where somebody figured out how to expose that weakness and truly dominate the leaderboards. It was particularly obvious because they scored 300wpm on  the html test. Give it a shot and you'll quickly realize that's impossible.   

## Get Involved
I built this as my capstone project for Flatiron School's Denver software development program, and never expected the amount of support on the project that I have. I've talked to people that I've never met that are using DOOMTYPER to work on their typing skills.  If anybody wants to participate please reach out, I could use help and love working in teams!
