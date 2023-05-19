import { gameService } from "./machine";


export const endGame = () => {
    gameService.send('END_GAME');
}

export const pickRPSChoice = pick => {
    gameService.send('USER_PLAYED', { pick })
}


export const restartGame = () => {
    gameService.send('RESTART_GAME');
}

export const startCountdown = () => {
    gameService.send("START_COUNTDOWN", { to: "rps.gamePlay" })
}

export const startGame = () => {
    gameService.send('START_GAME');
}

export const stopCountdown = () => {
    gameService.send("STOP_COUNTDOWN", { to: "rps.gamePlay" })
}
