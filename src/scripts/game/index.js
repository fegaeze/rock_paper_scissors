const rockPaperScissors = (guest, system) => {
    const outcomes = [
        [0, -1, 1],
        [1, 0, -1],
        [-1, 1, 0]
    ];

    const outcome = outcomes[guest.pick][system.pick];
    if (outcome === 0) {
        return null;
    } else if (outcome === 1) {
        return guest.player;
    } else {
        return system.player;
    }
};

const Game = Object.freeze({
    rockPaperScissors,
});

export default Game;