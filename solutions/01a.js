const log = console.log.bind(console);

const input = "L4, R2, R4, L5, L3, L1, R4, R5, R1, R3, L3, L2, L2, R5, R1, L1, L2, R2, R2, L5, R5, R5, L2, R1, R2, L2, L4, L1, R5, R2, R1, R1, L2, L3, R2, L5, L186, L5, L3, R3, L5, R4, R2, L5, R1, R4, L1, L3, R3, R1, L1, R4, R2, L1, L4, R5, L1, R50, L4, R3, R78, R4, R2, L4, R3, L4, R4, L1, R5, L4, R1, L2, R3, L2, R5, R5, L4, L1, L2, R185, L5, R2, R1, L3, R4, L5, R2, R4, L3, R4, L2, L5, R1, R2, L2, L1, L2, R2, L2, R1, L5, L3, L4, L3, L4, L2, L5, L5, R2, L3, L4, R4, R4, R5, L4, L2, R4, L5, R3, R1, L1, R3, L2, R2, R1, R5, L4, R5, L3, R2, R3, R1, R4, L4, R1, R3, L5, L1, L3, R2, R1, R4, L4, R3, L3, R3, R2, L3, L3, R4, L2, R4, L3, L4, R5, R1, L1, R5, R3, R1, R3, R4, L1, R4, R3, R1, L5, L5, L4, R4, R3, L2, R1, R5, L3, R4, R5, L4, L5, R2".split(', ');

const dirs = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

function getDir(currDir, rotation) {
  switch(rotation) {
    case 'L': return (currDir + 3) % 4;
    case 'R': return (currDir + 1) % 4;
  }
}

function getFinalState(initialState, input) {
  return input.reduce((state, command) => {
    // parse the rotation and distance from the input token
    const rotation = command[0];
    const distance = Number(command.slice(1));

    // set the new direction
    state.dir = getDir(state.dir, rotation);

    // move in the new direction
    switch(state.dir) {
      case dirs.NORTH:
        state.y += distance;
        break;
      case dirs.EAST:
        state.x += distance;
        break;
      case dirs.SOUTH:
        state.y -= distance;
        break;
      case dirs.WEST:
        state.x -= distance;
        break;
    }

    return state;
  }, initialState);
}

const initialState = { x: 0, y: 0, dir: dirs.NORTH };
const finalState = getFinalState(initialState, input);
const rectDistance = Math.abs(finalState.x) + Math.abs(finalState.y);

log(rectDistance);
