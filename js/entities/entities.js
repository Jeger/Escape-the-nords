/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
/* -----
constructor
------ */
init: function(x, y, settings) {
    //call the constructor
    this.parent(x, y, settings);

    // set the default horizontal & vertical speed (accel vector)
    this.setVelocity(3, 3);

    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

},
/* -----
update the player pos
------ */

update: function() {
    if (me.input.isKeyPressed('left')) {
        // flip the sprite on horizontal axis
        this.flipX(true);
    // update the entity velocity
    this.vel.x -= this.accel.x * me.timer.tick;
} else if (me.input.isKeyPressed('right')) {
// unflip the sprite
this.flipX(false);
// update the entity velocity
this.vel.x += this.accel.x * me.timer.tick;
} else if (me.input.isKeyPressed('up')) {
// update the entity velocity
this.vel.y -= this.accel.y * me.timer.tick;
} else if (me.input.isKeyPressed('down')) {

    this.vel.y += this.accel.y * me.timer.tick;
} else {
    this.vel.y = 0;
    this.vel.x = 0;
}

if (me.input.isKeyPressed('jump')) {
// make sure we are not already jumping or falling
if (!this.jumping && !this.falling) {
// set current vel to the maximum defined value
// gravity will then do the rest
this.vel.y = -this.maxVel.y * me.timer.tick;
// set the jumping flag
this.jumping = true;
}

}

// check & update player movement
this.updateMovement();

// check for collision
var res = me.game.collide(this);

if (res) {
// if we collide with an enemy
    if (res.obj.type == me.game.ENEMY_OBJECT) {
        //??
    }
}

// update animation if necessary
if (this.vel.x!=0 || this.vel.y!=0) {
// update object animation
this.parent();
return true;
}

// else inform the engine we did not perform
// any update (e.g. position, animation)
return false;
}
});