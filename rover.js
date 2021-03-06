//Create Rover object
var myRover = {
  position: [0, 0],
  direction: 'N'
};

var obstacles = {
  stone1: [0, 0],
  stone2: [0, 0],
  stone3: [0, 0],
  stone4: [0, 0],
  stone5: [0, 0],
  stick1: [0, 0],
  stick2: [0, 0],
  stick3: [0, 0],
  stick4: [0, 0],
  stick5: [0, 0],
}

var roverActions = document.getElementById('roverMoves');

//Randomize obstacle positions
function startObstacles() {
  for (var obj in obstacles) {
    obstacles[obj] = [Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1)];
    for (var repObj in obstacles) {
      if (obstacles[obj] == obstacles[repObj] || myRover.position == obstacles[obj]) {
        obstacles[obj] = [Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1)];
      }
    }
  }
}


//Randomize position of Rover in grid
function startRover() {
  myRover.position = [Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1)];
  for (let obj in obstacles) {
     if (myRover.position == obj) {
     myRover.position = [Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1)];
    }
  }
  roverActions.innerHTML += '<p>Rover initiated, currently at position: [' + myRover.position[0] + ", " + myRover.position[1] + '] and facing: ' + myRover.direction + '</p>';
}

startObstacles();
startRover();

function obstacleDetection(currentPosition) {
  switch (myRover.direction) {
    case 'N':
      for (var objN in obstacles) {
        if (currentPosition[0] - 1 == obstacles[objN][0] && currentPosition[1] == obstacles[objN][1]) {
          roverActions.innerHTML += "<p>There's something in my path, I found a " + objN + " Initiating destruction protocol..... Object destroyed!</p>";
          obstacles[objN] = 'Destroyed';
        }
      }
        break;
    case 'E':
      for (var objE in obstacles) {
        if (currentPosition[1] + 1 == obstacles[objE][1] && currentPosition[0] == obstacles[objE][0]) {
          roverActions.innerHTML += "<p>There's something in my path, I found a " + objE + " Initiating destruction protocol..... Object destroyed!</p>";
          obstacles[objE] = 'Destroyed';
        }
      }
        break;
    case 'S':
      for (var objS in obstacles) {
        if (currentPosition[0] + 1 == obstacles[objS][0] && currentPosition[1] == obstacles[objS][1]) {
          roverActions.innerHTML += "<p>There's something in my path, I found a " + objS + " Initiating destruction protocol..... Object destroyed!</p>" ;
          obstacles[objS] = 'Destroyed';
        }
      }
        break;
    case 'W':
      for (var objW in obstacles) {
        if (currentPosition[1] - 1 == obstacles[objW][1] && currentPosition[0] == obstacles[objW][0]) {
          roverActions.innerHTML += "<p>There's something in my path, I found a " + objW + " Initiating destruction protocol..... Object destroyed!</p>";
          obstacles[objW] = 'Destroyed';
        }
      }
        break;
  }
}

//Function to move forward rover
function goForward(rover) {
  switch (rover.direction) {
    case 'N':
      rover.position[0]--;
        break;
    case 'E':
      rover.position[1]++;
        break;
    case 'S':
      rover.position[0]++;
        break;
    case 'W':
      rover.position[1]--;
        break;
  }
  
  if (rover.position[0] < 1) {
    rover.position[0] = 10;
  } else if (rover.position[1] < 1) {
    rover.position[1] = 10;
  } else if (rover.position[1] > 10) {
    rover.position[1] = 1;
  } else if (rover.position[0] > 10) {
    rover.position[0] = 1;
  }

  roverActions.innerHTML += "<p>Forward Move - New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]</p>";
}

//Function to move back rover
function goBack(rover) {
  switch (rover.direction) {
    case 'N':
      rover.position[0]++;
        break;
    case 'E':
      rover.position[1]--;
        break;
    case 'S':
      rover.position[0]--;
        break;
    case 'W':
      rover.position[1]++;
        break;
  }
  if (rover.position[0] < 1) {
    rover.position[0] = 10;
  } else if (rover.position[1] < 1) {
    rover.position[1] = 10;
  } else if (rover.position[1] > 10) {
    rover.position[1] = 1;
  } else if (rover.position[0] > 10) {
    rover.position[0] = 1;
  }

  roverActions.innerHTML += "<p>Backward Move - New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]</p>";
}

//Function to move rover left
function turnLeft(rover) {
  if (rover.direction == 'N') {
    rover.direction = 'W';
  } else if (rover.direction == 'W') {
    rover.direction = 'S';
  } else if (rover.direction == 'S') {
    rover.direction = 'E';
  } else {
    rover.direction = 'N';
  }

  roverActions.innerHTML += '<p>I am now facing: ' + rover.direction + '</p>';
}
//Function to move rover right
function turnRight(rover) {
  if (rover.direction == 'N') {
    rover.direction = 'E';
  } else if (rover.direction == 'E') {
    rover.direction = 'S';
  } else if (rover.direction == 'S') {
    rover.direction = 'W';
  } else {
    rover.direction = 'N';
  }

  roverActions.innerHTML += '<p>I am now facing: ' + rover.direction + '</p>';
}

function go(moves) {
  var moveArray = moves.split('');
  for (var i = 0; i < moveArray.length; i++) {
    if (moveArray[i] == 'f') {
      goForward(myRover);
      obstacleDetection(myRover.position);
    } else if (moveArray[i] == 'b') {
      goBack(myRover);
      obstacleDetection(myRover.position);
    } else if (moveArray[i] == 'l') {
      turnLeft(myRover);
      obstacleDetection(myRover.position);
    } else if (moveArray[i] == 'r') {
      turnRight(myRover);
      obstacleDetection(myRover.position);
    } else {
      roverActions.innerHTML += '<p>Wrong instruction received, ignoring</p>';
    }
  }
}