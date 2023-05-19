import { assign, createMachine, interpret } from "xstate";
import { getFromConfig } from "../utils/config";
import { startCountdown, stopCountdown } from "./effects";
import { 
    resetCount,
    resetRoundPick, 
    toggleActionBtns,
    toggleCountdownFlag,
    toggleNotice,
    toggleGameStarted,
    updateCount,
    updateGuestPick,
    updateRoundCount, 
    updateRoundResult,
} from "./reducers";


const config = getFromConfig();

const initialContext = {
    actionBtnsVisible: false,
    countdownDuration: config.countdownDuration,
    countdownStarted: false,
    guest: {
        score: 0,
        pick: null,
        name: "You",
        playerID: 55565
    },
    isGameStarted: false,
    noticeVisible: true,
    rounds: 0,
    system: {
        score: 0,
        pick: null,
        name: "Computer",
        playerID: 34434
    },
    winner: null
}

const countdownState = {
    initial: "active",
    states: {
        active: {
            after: {
                1000: [
                    {
                        target: "active",
                        cond: "hasCountdownStarted",
                        actions: "updateCount"
                    },
                    {
                        target: "#rps.gamePlay.game.finishNewRound",
                        cond: "hasCountdownFinished",
                        actions: ["toggleCountdownFlag", "resetCount", "updateRoundResult"]
                    },
                ]
            },
            on: {
                START_COUNTDOWN: {
                    target: "active",
                    actions: "toggleCountdownFlag"
                },
                STOP_COUNTDOWN: {
                    actions: ["toggleCountdownFlag", "resetCount"]
                }
            }
        }
    }
}

const gameplayState = {
    initial: "startNewRound",
    states: {
        startNewRound: {
            entry: [
                "updateRoundCount", 
                "toggleActionBtns", 
                "toggleNotice", 
                "toggleGameStarted",
                "startCountdown"
            ],
            on: { 
                USER_PLAYED:  { 
                    actions: ["stopCountdown", "updateGuestPick", "updateRoundResult"],
                    target: "finishNewRound",
                }
            },
            exit: [
                "toggleActionBtns", 
                "toggleNotice",
                "toggleGameStarted"
            ]
        },
        finishNewRound: {
            after: {
                2000: [
                    {
                        target: "#rps.gameCompleted",
                        cond: "isGameOver",
                    },
                    {
                        target: "startNewRound",
                    }
                ]
            },
            exit: "resetRoundPick"
        }
    }
}

export const machine = createMachine(
    {
        id: "rps",
        initial: "gameLobby",
        context: { ...initialContext },
        states: {
            gameLobby: {
                entry: "resetState",
                on: {
                    START_GAME: "gamePlay",
                }
            },
            gamePlay: {
                type: 'parallel',
                states: {
                    game: gameplayState,
                    countdown: countdownState
                }
            },
            gameCompleted: {
                on: {
                    END_GAME: "gameLobby",
                    RESTART_GAME: "gamePlay"
                },
                exit: "resetState"
            }
        },
        predictableActionArguments: true,
    },
    {
        guards: {
            isGameOver: context => {
                return context.rounds >= config.rounds;
            },
            hasCountdownStarted: (context, _) => {
                return context.countdownDuration > 1 && context.countdownStarted
            },
            hasCountdownFinished: (context, _) => {
                return context.countdownDuration === 1 && context.countdownStarted
            }
        },
        actions: {
            resetCount,
            resetRoundPick,
            resetState: assign(() => ({ ...initialContext })),
            stopCountdown,
            startCountdown,
            toggleActionBtns,
            toggleCountdownFlag,
            toggleNotice,
            toggleGameStarted,
            updateCount,
            updateGuestPick,
            updateRoundCount,
            updateRoundResult,
        },
    }
);

export const gameService = interpret(machine);

