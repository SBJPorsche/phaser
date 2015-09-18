/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	if(!game.device.desktop){//移动设备适应
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.forceLandscape = true;
		this.scale.refresh();
	}	
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"tap-to-start");
	sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
};

Menu.prototype.startGame = function() {
	this.game.state.start("myGame");
};