//this game will have only 1 state
var GameState = {

  //initiate some game-level settings
  init: function() {
    // To scale your app
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // Scale horitzontally based on the parent Height
    this.scale.pageAlignVertically = true;
    // Scale Vertically based on the parent Height
    this.scale.pageAlignHorizontally = true;
  },
  //load the game assets before the game starts
  preload: function() {
    // Remember. load.image(key,url)
    this.load.image('backyard', 'assets/images/backyard.png');
    this.load.image('apple', 'assets/images/apple.png');
    this.load.image('candy', 'assets/images/candy.png');
    this.load.image('rotate', 'assets/images/rotate.png');
    this.load.image('toy', 'assets/images/rubber_duck.png');
    this.load.image('arrow', 'assets/images/arrow.png');
    // Spritesheet('key',url,width,height,number_frames,margin,spacing)
    this.load.spritesheet('pet','assets/images/pet.png', 97, 83, 5, 1, 1);

  },
  //executed after everything is loaded
  create: function() {
    this.setDefaults();

  },




  setDefaults: function() {
    this.printBackground();
    this.printPet();
    this.printApple();
    this.printCandy();
    this.printToy();
    this.printRotate();
    this.setButtons();

    this.selectedItem = null;
  },
  printBackground: function() {
   this.background = this.game.add.sprite(0, 0, 'backyard');
   return this.background
  },
  printPet: function() {
    this.pet = this.game.add.sprite(100,400,'pet');
    this.pet.anchor.setTo(0.5);
    // Custom properties
    this.pet.customParams = {health: 100, fun: 100};

    // Make the pet draggable
    // Let an object to have inputs
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag();
  },
  printApple: function() {
    this.apple = this.game.add.sprite(72,570,'apple');
    this.apple.anchor.setTo(0.5);
    this.apple.inputEnabled = true;
    this.apple.customParams = {health: 20};
    this.apple.events.onInputDown.add(this.pickItem, this);
  },
  printCandy: function() {
    this.candy = this.game.add.sprite(144,570,'candy');
    this.candy.anchor.setTo(0.5);
    this.candy.inputEnabled = true;
    this.candy.customParams = {health: -10, fun: 10};
    this.candy.events.onInputDown.add(this.pickItem, this);
  },
  printToy: function() {
    this.toy = this.game.add.sprite(216,570,'toy');
    this.toy.anchor.setTo(0.5);
    this.toy.inputEnabled = true;
    this.toy.customParams = {fun: 20};
    this.toy.events.onInputDown.add(this.pickItem, this);
  },
  printRotate: function() {
    this.rotate = this.game.add.sprite(288,570,'rotate');
    this.rotate.anchor.setTo(0.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotatePet, this);
  },
  setButtons: function(){
    this.buttons = [this.apple, this.candy, this.toy, this.rotate];
  },
  pickItem: function(sprite, event) {
    console.log('pick item');
    console.log(this);
  },
  rotatePet: function(sprite, event) {
    console.log('rotate item');
  },

};

//initiate the Phaser framework
// x,y,Library
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');

