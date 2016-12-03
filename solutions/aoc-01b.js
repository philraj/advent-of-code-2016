const log = console.log.bind(console);

const input = "L4, R2, R4, L5, L3, L1, R4, R5, R1, R3, L3, L2, L2, R5, R1, L1, L2, R2, R2, L5, R5, R5, L2, R1, R2, L2, L4, L1, R5, R2, R1, R1, L2, L3, R2, L5, L186, L5, L3, R3, L5, R4, R2, L5, R1, R4, L1, L3, R3, R1, L1, R4, R2, L1, L4, R5, L1, R50, L4, R3, R78, R4, R2, L4, R3, L4, R4, L1, R5, L4, R1, L2, R3, L2, R5, R5, L4, L1, L2, R185, L5, R2, R1, L3, R4, L5, R2, R4, L3, R4, L2, L5, R1, R2, L2, L1, L2, R2, L2, R1, L5, L3, L4, L3, L4, L2, L5, L5, R2, L3, L4, R4, R4, R5, L4, L2, R4, L5, R3, R1, L1, R3, L2, R2, R1, R5, L4, R5, L3, R2, R3, R1, R4, L4, R1, R3, L5, L1, L3, R2, R1, R4, L4, R3, L3, R3, R2, L3, L3, R4, L2, R4, L3, L4, R5, R1, L1, R5, R3, R1, R3, R4, L1, R4, R3, R1, L5, L5, L4, R4, R3, L2, R1, R5, L3, R4, R5, L4, L5, R2".split(', ');

// Hash map which will store the number of visits at a particular coordinate
// (starts at 0,0 so that coord is initialized with a value of 1).
const visits = {
  '0,0': 1
};

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

function getAxis(dir) {
  switch(dir) {
    case dirs.NORTH:
    case dirs.SOUTH:
      return 'y';
    case dirs.EAST:
    case dirs.WEST:
      return 'x';
  }
}

// Return whether a move should be done in the positive or negative direction
// of a given axis.
function getDelta(dir) {
  switch(dir) {
    case dirs.NORTH:
    case dirs.EAST:
      return 1;
    case dirs.SOUTH:
    case dirs.WEST:
      return -1;
  }
}

// Execute a move based on the current state of our traveller and the distance
// to be moved, one unit at a time. After each move, increment the number of
// visits at that coordinate, and if we've been there before, break.
function move(state, distance) {
  const axis = getAxis(state.dir);
  const delta = getDelta(state.dir);

  for (let i = 0; i < distance; i++) {
    state[axis] += delta;

    // create a coordinate tuple to index our visits hash
    const stateCoord = [state.x, state.y];

    // If coord has been visited already, and no location for the HQ has been
    // stored, store the location of the HQ and break.
    if (visits[stateCoord] && !visits.hq) {
      visits.hq = { x: state.x, y: state.y };
      break;
    } else {
      visits[stateCoord] = 1;
    }
  }
}

function consumeInput(state, input) {
  for (let i = 0; i < input.length; i++) {
    // grab the command token and extract the rotation and distance
    const command = input[i];
    const rotation = command[0];
    const distance = Number(command.slice(1));

    // set the new direction
    state.dir = getDir(state.dir, rotation);

    // execute the move
    move(state, distance);

    // if the HQ was found, break out early because our job here is done!
    if (visits.hq) break;
  }
}

const initialState = { x: 0, y: 0, dir: dirs.NORTH };
consumeInput(initialState, input);

// calculate rectangular distance to HQ if it was found
const rectDistance = visits.hq && Math.abs(visits.hq.x) + Math.abs(visits.hq.y);
log(rectDistance);
