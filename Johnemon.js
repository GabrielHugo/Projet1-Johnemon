const proposeFirstJohnemon = require('./Game')

const students = [
  'Sakshat',
  'Thierry',
  'Arthur',
  'Nouhéila',
  'Yordie',
  'Simon',
  'Nicolas',
  'Alexandre',
  'Pietro',
  'Elena',
  'Joao',
  'Liviu',
  'Myriam',
  'Jordan',
  'Inna',
  'Hazar',
  'Argjent',
  'Antoine-Alexandr',
  'Arianne',
  'Khyati',
  'Denis',
  'Yuliia',
  'Dora',
  'Junior',
  'Jessica',
  'Yavanna',
  'Louise',
  'Lília',
  'Jorina',
  'Viacheslav',
  'Zacharie',
  'Oleg'
]

class Johnemon {
  constructor(type) {
    this.name = this.generateRandomName();
    this.level = 1;
    this.experienceMeter = 0;
    this.attackRange = this.getRandomNumber(1, 8);
    this.defenseRange = this.getRandomNumber(1, 3);
    this.healthPool = this.getRandomNumber(10, 30);
    this.catchPhrase = this.generateCatchPhrase();
    this.appearance = this.generateAppearance();
    this.type = type || this.generateType();  // genere un type aleatoire entre Grass, Fire, Water ou Electric
  }

  generateRandomName() {
    const randomStudent1 = students[Math.floor(Math.random() * students.length)];
    return `${randomStudent1}`;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCatchPhrase() {
    const phrases = ["I choose you!", "Let the battle begin!", "Johnemon, go!"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  attack(defender) {
    const damage = this.getRandomNumber(this.attackRange * this.level, this.attackRange) - defender.defenseRange;
    defender.healthPool -= damage;
    console.log(`${this.name} attacked ${defender.name} and dealt ${damage} damage!`);
  }

  gainExperience(opponentLevel) {
    const experienceGain = this.getRandomNumber(1, 5) * opponentLevel;
    this.experienceMeter += experienceGain;
    console.log(`${this.name} gained ${experienceGain} experience points!`);
    if (this.experienceMeter >= this.level * 100) {
      this.evolve();
    }
  }

  evolve() {
    this.level += 1;
    const attackIncrease = this.getRandomNumber(1, 5);
    const defenseIncrease = this.getRandomNumber(1, 5);
    const healthIncrease = this.getRandomNumber(1, 5);

    this.attackRange += attackIncrease;
    this.defenseRange += defenseIncrease;
    this.healthPool += healthIncrease;

    console.log(`${this.name} evolved into a higher level! New stats: Level ${this.level}, Attack Range ${this.attackRange}, Defense Range ${this.defenseRange}, Health Pool ${this.healthPool}`);
  }

  sayCatchPhrase() {
    console.log(`${this.name} says: "${this.catchPhrase}"`);
  }

  generateAppearance() {
    return ` 
      [^(..)^]
      [,(  ),]
        V~~V 
        `

  }

  generateType() {
  let types = ['Grass', 'Fire', 'Water', 'Electric', 'Normal', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon'];
  let randomType = Math.floor(Math.random() * types.length);
  return types[randomType];
  }

  static isValidType(type) {
    let validType = ['Grass', 'Fire', 'Water', 'Electric', 'Normal', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon'];
    return validType.includes(type)
  }

}

module.exports = Johnemon;
