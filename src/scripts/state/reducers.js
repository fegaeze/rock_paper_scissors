
import { assign } from "xstate";
import { getFromConfig } from "../utils/config";
import { getRandomInt } from "../utils";

import Game from "../game";


const config = getFromConfig();

export const resetCount = assign((context, _) => {
    return {
        ...context,
        countdownDuration: config.countdownDuration
    }
})

export const toggleActionBtns = assign((context, _) => {
    return {
        ...context,
        actionBtnsVisible: !context.actionBtnsVisible
    }
});

export const toggleCountdownFlag = assign((context, _) => {
    return {
        ...context,
        countdownStarted: !context.countdownStarted
    }
})

export const toggleGameStarted = assign((context, _) => {
    return {
        ...context,
        isGameStarted: !context.isGameStarted
    }
});

export const toggleNotice = assign((context, _) => {
    return {
        ...context,
        noticeVisible: !context.noticeVisible
    }
});

export const updateApp = assign((context, event) => {
    return { 
        ...context,
        app: event.app
    };
});

export const updateCount = assign((context, _) => {
    return {
        ...context,
        countdownDuration: context.countdownDuration - 1
    }
})

export const updateGuestPick = assign((context, event) => {
    return { 
        ...context,
        guest: {
            ...context.guest,
            pick: event.pick
        }
    };
});

export const updateRoundCount = assign((context,_) => {
    return { 
        ...context,
        rounds: context.rounds + 1
    };
});

export const resetRoundPick = assign((context,_) => {
    return { 
        ...context,
        guest: {
            ...context.guest,
            pick: null
        },
        system: {
            ...context.system,
            pick: null
        }
    };
});

export const updateRoundResult = assign((context, _) => {
    const guestPick = context.guest.pick !== null ? context.guest.pick : getRandomInt(0, 2);
    const systemPick = getRandomInt(0, 2);

    const guestOption = { pick: guestPick, player: context.guest }
    const systemOption = { pick: systemPick, player: context.system }

    const winner = Game.rockPaperScissors(guestOption, systemOption);

    const guestScore = context.guest.score;
    const systemScore = context.system.score;

    return {
        ...context,
        system: {
            ...context.system,
            score: context.system.playerID === winner?.playerID ? systemScore + 1 : systemScore,
            pick: systemPick
        },
        guest: {
            ...context.guest,
            score: context.guest.playerID === winner?.playerID ? guestScore + 1 : guestScore,
            pick: guestPick,
        },
        winner
    }
});
