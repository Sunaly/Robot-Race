let robots = Array(); //holder for multiple robots
let position = 0;

let robot = {
    name:"",
    type:"",
    taskList: [],
    numComplete: 0,
    doTasks: completeTasks
}

// List for randomizing tasks 
const tasks =
[
  {
    description: 'do the dishes',
    eta: 1000,
  },{
    description: 'sweep the house',
    eta: 3000,
  },{
    description: 'do the laundry',
    eta: 10000,
  },{
    description: 'take out the recycling',
    eta: 4000,
  },{
    description: 'make a sammich',
    eta: 7000,
  },{
    description: 'mow the lawn',
    eta: 20000,
  },{
    description: 'rake the leaves',
    eta: 18000,
  },{
    description: 'give the dog a bath',
    eta: 14500,
  },{
    description: 'bake some cookies',
    eta: 8000,
  },{
    description: 'wash the car',
    eta: 20000,
  },
]

//Preset task lists for each type of robot
const typeTasks = [ 
    {
      type: 'UNIPEDAL',
      tasks: [
        {
          description: 'do the dishes',
          eta: 1000,
        },
        {
          description: 'sweep the house',
          eta: 3000,
        },
        {
          description: 'take out the recycling',
          eta: 4000,
        },
        {
          description: 'make a sammich',
          eta: 7000,
        },
        {
          description: 'bake some cookies',
          eta: 8000,
        }
      ]
    },{
      type: 'BIPEDAL',
      tasks: [
        {
          description: 'rake the leaves',
          eta: 18000,
        },
        {
          description: 'make a sammich',
          eta: 7000,
        },
        {
          description: 'sweep the house',
          eta: 3000,
        },
        {
          description: 'do the laundry',
          eta: 10000,
        },
        {
          description: 'do the dishes',
          eta: 1000,
        }
      ]

    },{
      type: 'QUADRUPEDAL',
      tasks: [
        {
          description: 'bake some cookies',
          eta: 8000,
        },
        {
          description: 'wash the car',
          eta: 20000,
        },
        {
          description: 'do the laundry',
          eta: 10000,
        },
        {
          description: 'sweep the house',
          eta: 3000,
        },
        {
          description: 'mow the lawn',
          eta: 20000,
        }
      ]
    },{
      type: 'ARACHNID',
      tasks: [
        {
          description: 'take out the recycling',
          eta: 4000,
        },
        {
          description: 'give the dog a bath',
          eta: 14500,
        },
        {
          description: 'bake some cookies',
          eta: 8000,
        },
        {
          description: 'rake the leaves',
          eta: 18000,
        },
        {
          description: 'wash the car',
          eta: 20000,
        },
      ]
    },{
      type: 'RADIAL',
      tasks: [
        {
          description: 'sweep the house',
          eta: 3000,
        },
        {
          description: 'bake some cookies',
          eta: 8000,
        },
        {
          description: 'wash the car',
          eta: 20000,
        },
        {
          description: 'do the dishes',
          eta: 1000,
        },
        {
          description: 'give the dog a bath',
          eta: 14500,
        },
      ]
    },{
      type: 'AERONAUTICAL',
      tasks: [
        {
          description: 'wash the car',
          eta: 20000,
        },
        {
          description: 'rake the leaves',
          eta: 18000,
        },
        {
          description: 'do the laundry',
          eta: 10000,
        },
        {
          description: 'bake some cookies',
          eta: 8000,
        },
        {
          description: 'take out the recycling',
          eta: 4000,
        },
      ]
    },
 ]


// helper function 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min); 
}

// generates list of random tasks
function randomTasks() {
    let taskList = new Array();
    while(taskList.length < 5) {    //hard coded the number of tasks here, but alternatively could have #tasks param
        let task = tasks[getRandomInt(0, 10)];
        if(!taskList.includes(task)){
            taskList.push(task);
        }
    }
    return taskList;
}

// Finds task list for chosen robot type
function findTypeTaskList(typeName){
  for (let i = 0; i < typeTasks.length; i++) {
    if (typeTasks[i].type == typeName) {
      return typeTasks[i].tasks;
    }
  }
}

// executes the tasks for each robot
function completeTasks() {
  if (this.taskList.length > 0) {
    console.log(`\nRobot: ${this.name}, ${this.type}`);
    console.log(`${this.name}, ${this.type} is starting task "${this.taskList[0].description}"\nPlease wait...`);
    setTimeout(() => {
      console.log(`\n${this.name} COMPLETED task "${this.taskList[0].description}"`);
      this.numComplete++;
      console.log(`${this.numComplete} tasks finished`)
      this.taskList.shift();
      this.doTasks();
    },this.taskList[0].eta);
  } else {
    position++;
    console.log(`\n${this.name}, ${this.type} has completed all tasks. FINISHED IN ${position} PLACE!!`);
  }

}


// set up for taking user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// "main" function for executing the program
function run() {
  readline.question('Type a name for your robot: ', function(nameInput) {
    readline.question(
        `Type a robot type from the list: 
         Unipedal
         Bipedal
         Quadrupedal
         Arachnid
         Radial
         Aeronautical\n`, 
        function(typeInput){
            let newRobot = Object.create(robot); 
            newRobot.name = nameInput;
            newRobot.type = typeInput;
            readline.question('Choose your type of task list. Enter RANDOM or PRESET: ', function(listType) {
              listType = listType.toUpperCase();
              if (listType == "RANDOM"){
                newRobot.taskList = randomTasks();
              } else {
                newRobot.taskList = findTypeTaskList(newRobot.type.toUpperCase()); 
              }
              robots.push(newRobot);
              readline.question('Add another robot? Enter YES or NO: ', function(repeatPrompts) {
                  repeatPrompts = repeatPrompts.toUpperCase();
                  if (repeatPrompts == "YES") {
                     run(); 
                  } else {
                    console.log("\nSTARTING ROBOT RACE")
                    setTimeout(() => {
                      for (let i = 0; i < robots.length; i++){
                        robots[i].doTasks();
                      }
                    }, 3000);
                    readline.close();
                  }
              });
            });
            
            
    });
  });
}

run();