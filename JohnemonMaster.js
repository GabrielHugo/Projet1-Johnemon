const johnemonWorld = require('./JohnemonWorld')
const Game = require('./Game')

class JohnemonMaster {
  constructor(name) {
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5; // Initial number of healing items
    this.reviveItems = 3; // Initial number of revive items
    this.JOHNEBALLS = 10; // Initial number of JOHNEBALLS
  }


  renameJohnemon(johnemon, newName) {
    if (typeof newName === 'string' && newName.trim() !== '') {
      johnemon.name = newName;
      console.log(`Name is been changed in ${johnemon.name}`);
    } else {
      console.log('Invalid name.')
    }
  }

  healJohnemon(johnemon) {
    
  }

  reviveJohnemon(johnemon) {
    
  }


  releaseJohnemon(johnemon) {
    if (collectionJohnemon[johnemon].name !== '') {
      collectionJohnemon[johnemon].name = null;
    } else {
      console.log('You have no Johnemon in ur team');
      gameMenu();
    }
  }

  showCollection() {
    
  }
}

module.exports = JohnemonMaster;
