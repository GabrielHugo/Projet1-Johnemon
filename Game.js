const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster'); // Replace 'your_classes_filename' with the actual filename
const Johnemon = require('./Johnemon');
const JohnemonWorld = require ('./JohnemonWorld')
const fs = require('fs');

const johnemonMaster = new JohnemonMaster();
const johnemonWorld = new JohnemonWorld();

function arenaFight() {
  const fakeChoice = player.johnemonCollection[0]; // Should be replaced by user choice in his collection.
  const opponent = new Johnemon();
  arena.startBattle(fakeChoice, opponent);
}

let gameState = {
  playerName: '',
  collectionJohnemon: ''
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startGame() {
  mainMenu();
}

function mainMenu() {

  rl.question('\n**** Menu ****\n\n1 New Game\n\n2 Load Game\n\n3 Exit\n\nYour Choice: ', (answer) => {

    switch(answer) {
      case '1': saveMenu()
      break;

      case '2': loadGame()
      break;
      
      case '3': rl.close()
      break;

      default: console.log('Error')
      mainMenu()
      break;
    }
  })
}

function saveMenu() {
  rl.question(`What's slot do u want use?\n\n1 - slot 1\n\n2 - Slot 2\n\n3 - slot 3\n\n4 - Menu\n\nYour choice: `, (slot) => {
    switch(slot) {
      case '1': saveGameState('save1.json'); break;
      case '2': saveGameState('save2.json'); break;
      case '3': saveGameState('save3.json'); break;
      case '4': mainMenu(); break;
      default: console.log('**Error**');
      saveMenu();
      break;
  }
  beginning()
})
}


function gameMenu() {
  rl.question('What do u want make today\n\n1 - Heal Johnemon\n\n2 - Revive a Johnemon\n\n3 - Release Johnemon\n\n4 - Rename Johnemon\n\n5 - Show collection\n\n6 - Menu\n\nAnswer: ', (answer) => {
    switch(answer) {
      case '1': johnemonMaster.healJohnemon(gameState.collectionJohnemon); break;

      case '2': johnemonMaster.reviveJohnemon(gameState.collectionJohnemon); break;

      case '3': gameState.collectionJohnemon.name;
      if (gameState.collectionJohnemon.name) {
        rl.question(`${gameState.collectionJohnemon} What Johnemon u want release? : `, (release) => {
          johnemonMaster.releaseJohnemon(release);
          saveGameState('save1.json');
        });

      } else {
        console.log('No Johnemon to release');
        gameMenu();

      }
      break;

      case '4': gameState.collectionJohnemon;
      if (gameState.collectionJohnemon) {
        rl.question(`Enter new name: `, (newName) => {
          johnemonMaster.renameJohnemon(gameState.collectionJohnemon, newName);
          saveGameState('save1.json');
          gameMenu();
        });
      } else {
        console.log('No johnemon to rename');
        gameMenu();
      }
      break;

      case '5': console.log(johnemonMaster.showCollection(gameState.collectionJohnemon.name)); gameMenu(); break;

      case '6': mainMenu(); break;
      
    default: console.log('***Error***'); gameMenu();
    }
  })
}

function askForName() {
  rl.question("What's ur name? ", (name) => {
    if (name && name.trim() !== '') {
      console.log(`\nNice to meet u ${name}\n`);
      gameState['playerName'] = name.trim();
      saveGameState('save1.json');
      proposeFirstJohnemon();
    } else {
    console.log(`${name} is invalid. Please choose a another name`);
    askForName();
    }
  })
}

function proposeFirstJohnemon() {

  let johnemon1 = new Johnemon('Grass');
  let johnemon2 = new Johnemon('Fire');
  let johnemon3 = new Johnemon('Water');

  function returnFirstJohnemon() {

  rl.question(`So now i offer u 1 of these 3 Johnemon.\n\nWe have:\n\n- ${johnemon1.name}\n\n- ${johnemon2.name}\n\n- ${johnemon3.name}\n\nwhich one do you want? : `, (pickOneOfthree) => {

  console.log(`\nMe: I choose ${pickOneOfthree}`);

    let chooseJohnemon;
    switch(pickOneOfthree.toLowerCase()) {

      case johnemon1.name.toLowerCase():
        chooseJohnemon = johnemon1
        console.log(`\n[${chooseJohnemon.name} is of type Grass]`)
        console.log(chooseJohnemon.appearance)
        break;

      case johnemon2.name.toLowerCase():
        chooseJohnemon = johnemon2
        console.log(`\n[${chooseJohnemon.name} is of type Fire]\n`)
        break;

      case johnemon3.name.toLowerCase():
        chooseJohnemon = johnemon3
        console.log(`\n[${chooseJohnemon.name} is of type Water]\n`)
        break;
    }

    rl.question(`are you sure you want ${chooseJohnemon.name}: `, (answer) => {
      if (answer.toLowerCase() === 'yes') {
        console.log(`\n${chooseJohnemon.name} is ur new compagnon!\n`);
        gameState.collectionJohnemon = chooseJohnemon;
        saveGameState('save1.json');
        gameMenu();

      } else if (answer.toLowerCase() === 'no') {
        returnFirstJohnemon();

      } else {
        console.log('error');
        returnFirstJohnemon();
      }
    });
})}
returnFirstJohnemon();
}

function beginning() {
  console.log('\nHi! I am the Professor Chen and i work here\n');
  
  askForName();
}

function saveGameState(saveFile) {
  const jsonData = JSON.stringify({
    playerName: gameState.playerName,
    collectionJohnemon: gameState.collectionJohnemon ? {
      name: gameState.collectionJohnemon.name, 
      type: gameState.collectionJohnemon.type
    } : null
  }, null, 2);

  fs.writeFileSync(saveFile, jsonData, 'utf8');
  console.log(`${saveFile} is saved`)
}

function loadGame() {
  rl.question(`Wish slot do u want load?\n\n1 - slot 1\n\n2 - slot 2\n\n3 - slot 3\n\n4 - Menu\n\nYour answer: `, (slot) => {
    let saveFile;
    switch(slot) {
      case '1': saveFile = 'save1.json'; break;
      case '2': saveFile = 'save2.json'; break;
      case '3': saveFile = 'save3.json'; break;
      case '4': mainMenu(); break;
      default:
        console.log('**Error**');
        loadGame();
        return;
    }

    if (fs.existsSync(saveFile)) {

      const data = fs.readFileSync(saveFile, 'utf8');
      const loadedState = JSON.parse(data);

      gameState.playerName = loadedState.playerName;
      if (loadedState.collectionJohnemon) {
        gameState.collectionJohnemon = new Johnemon(loadedState.collectionJohnemon.name, loadedState.collectionJohnemon.type);
      }
      console.log(`Game loaded from ${saveFile}`);
      console.log(`Welcome back ${gameState.playerName}, you have ${gameState.collectionJohnemon.name} as your compagnon`);
      gameMenu();
    } else {

      console.log('No save file found in that slot.');
      loadGame();
    }

  })
}



startGame()

module.exports = proposeFirstJohnemon;