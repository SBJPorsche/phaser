/**
 * myGame
 */

function myGame(){
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);

myGame.prototype = proto

myGame.prototype.preload = function(){
	this.load.image('tile', 'assets/images/grass.png'); 
    this.load.image('player', 'assets/images/boniatillo.png');
}


myGame.prototype.create = function(){
	this.tileWidth = this.game.cache.getImage('tile').width;
	this.tileHeight = this.game.cache.getImage('tile').height;	
    this.stage.backgroundColor = '479cde';
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple(250, 'tile');  
    this.time = this.time.events.loop(2000, this.addPlatform, this);
    this.spacing = 300;
    this.score = 0;     
    this.createScore();        
    this.initPlatforms();    
    this.createPlayer();  
    this.cursors = this.game.input.keyboard.createCursorKeys(); 
}

myGame.prototype.addTile = function(x, y){
    var tile = this.platforms.getFirstDead();
    tile.reset(x, y);
    tile.body.velocity.y = 150; 
    tile.body.immovable = true;
    tile.checkWorldBounds = true
    tile.outOfBoundsKill = true  
}

myGame.prototype.addPlatform = function(y){
    if(typeof(y) == "undefined"){
        y = -this.tileHeight;
        this.incrementScore();
    }    
    var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
    var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;
 
    for (var i = 0; i < tilesNeeded; i++){
        if (i != hole && i != hole + 1){
            this.addTile(i * this.tileWidth, y); 
        }           
    }
}

myGame.prototype.initPlatforms = function(){
    bottom = this.game.world.height - this.tileHeight,
    top = this.tileHeight;
    for(var y = bottom; y > top - this.tileHeight; y = y - this.spacing){
    	this.addPlatform(y);
    }
}


myGame.prototype.createPlayer = function(){
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - (this.spacing * 2 + (3 * this.tileHeight)), 'player');
    this.player.anchor.setTo(0.5, 1.0);
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 200;
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.1;
}

myGame.prototype.update = function(){
    this.game.physics.arcade.collide(this.player, this.platforms);
    if(this.player.body.position.y >= this.game.world.height - this.player.body.height){
    	this.gameOver();
    }
    if(this.cursors.up.isDown && this.player.body.wasTouching.down) {
    	this.player.body.velocity.y = -1400;
    }
    if(this.cursors.left.isDown){
    	this.player.body.velocity.x += -30;
    }
    if(this.cursors.right.isDown){
    	this.player.body.velocity.x += 30;
    }
}

myGame.prototype.gameOver = function(){
	this.game.state.start('Menu');
}

myGame.prototype.createScore = function(){
    var scoreFont = "100px Arial";
    this.scoreLabel = this.game.add.text((this.game.world.centerX), 100, "0", {font: scoreFont, fill: "#fff"}); 
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.align = 'center';
}

myGame.prototype.incrementScore = function(){
    this.score += 1;   
    this.scoreLabel.text = this.score;  
}



