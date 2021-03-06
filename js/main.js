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
    // Let's block the user interface because you are interacting with the user
    this.uiBlocked = false;
  },

  printBackground: function() {
   this.background = this.game.add.sprite(0, 0, 'backyard');
   this.background.inputEnabled = true;
   this.background.events.onInputDown.add(this.placeItem.bind(this));
   return this.background;
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
    if(!this.uiBlocked){
      this.clearSelection();
      // Transparent sprite
      sprite.alpha = 0.4
      this.selectedItem = sprite;
    }
  },

  rotatePet: function(sprite, event) {
    if(!this.uiBlocked){
      this.uiBlocked = true;
      this.clearSelection();
      sprite.alpha = 0.4;
      // Creating a tween( Animation )
      var petRotation = this.game.add.tween(this.pet);
      // Setting the animation and the timeout
      petRotation.to({angle: '+720'},1000);
      // Trigger a method when animation completed
      // LOOK THAT WE ARE PASSING THIS AS SECOND PARAM
      // TO KEEP THE SCOPE OF THE "THIS"
      petRotation.onComplete.add(function(){
        this.uiBlocked = false;
        sprite.alpha = 1;
        this.pet.customParams.fun += 10;
      }.bind(this));
      // Starting the animation;
      petRotation.start();
    }
  },

  clearSelection: function () {
    this.buttons.forEach(function(element, index){
      element.alpha = 1;
    });
    this.selectedItem = null;
  },

  placeItem: function(sprite, event){
    // Set X and Y When you press at some place from your background
    if(this.selectedItem && !this.uiBlocked){
      var x = event.position.x;
      var y = event.position.y;

      var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      newItem.anchor.setTo(0.5);
      newItem.customParams = this.selectedItem.customParams;
    }
  },
};

//initiate the Phaser framework
// x,y,Library
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');

