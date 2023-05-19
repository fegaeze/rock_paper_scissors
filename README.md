# ROCK PAPER SCISSORS GAME

## How to play
- The game pits you (the guest) vs the computer.
- There are 10 rounds in total per game (You can edit this in the config for faster testing).
- In each round, you have to pick a choice within the time limit. (3 seconds, can be changed as well).
  If you don't pick within the limit, the system generates a random choice for you.
- At the end, your scores are display, and you can choose to end the game or restart.

## How to run => dev mode
- npm install
- npm start
- These commands are only needed if there's an issue running webpack-dev-server
  - npm uninstall webpack-dev-server
  - npm install --save-dev webpack-dev-server


## Current Bugs
- Responsiveness: It currently adjusts (by scaling down) when refreshed on different screen sizes, 
  but it doesn't resize fluidly. (Couldn't determineb why in time).

## References
- Sprites: All images are generated with Midjourney
- Used some of these ideas for setup: https://gamedev.land/pixi_project_template/
