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
        this.flipX(true);
        this.vel.x -= this.accel.x * me.timer.tick;
    } else if (me.input.isKeyPressed('right')) {
        this.flipX(false);
        this.vel.x += this.accel.x * me.timer.tick;
    } else if (me.input.isKeyPressed('up')) {
        this.flipY(false);
        this.vel.y -= this.accel.y * me.timer.tick;
    } else if (me.input.isKeyPressed('down')) {
        this.flipY(true);
        this.vel.y += this.accel.y * me.timer.tick;
    } else {
        this.vel.y = 0;
        this.vel.x = 0;
    }

    if (me.input.isKeyPressed('x')) {
        if (me.game.HUD.visible === false){
            me.game.HUD.visible = true;
        } else {
            me.game.HUD.visible = false;
        }
        this.parent();
        return true;
    }

    this.updateMovement();

    var res = me.game.collide(this);
    if (res) {
    }

    // update animation if necessary
    if (this.vel.x!==0 || this.vel.y!==0) {
        this.parent();
        return true;
    }

    return false;
}
});

game.EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
}
});


/**

HUUUUD
*/

game.ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
    },
    /* -----
 
    draw our score
 
    ------ */
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }

});

game.DialogueObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font   
    },
    /* -----
 
    draw our score
 
    ------ */
    draw: function(context, x, y) {
        me.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }

});

game.plant = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    me.game.HUD.visible = true;
    me.game.HUD.setItemValue("dialogue", "Jeg er en tekst som kommer frem naar du prater med en plante!");
}
});



/**
DOORS DOORS
DOORS EVERYWHERE */

//up
game.doorUp = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    lvlName = me.GLgrid.grid[me.GLgrid.currentPositionX-1][me.GLgrid.currentPositionY].name;
    me.levelDirector.loadLevel(lvlName);
    me.GLgrid.currentPositionX = me.GLgrid.currentPositionX -1;
}
});

//down
game.doorDown = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    var lvlName = me.GLgrid.grid[me.GLgrid.currentPositionX+1][me.GLgrid.currentPositionY].name;
    me.levelDirector.loadLevel(lvlName);
    me.GLgrid.currentPositionX = me.GLgrid.currentPositionX+1;
}
});

//left
game.doorLeft = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    var lvlName = me.GLgrid.grid[me.GLgrid.currentPositionX][me.GLgrid.currentPositionY-1].name;
    me.levelDirector.loadLevel(lvlName);
    me.GLgrid.currentPositionX = me.GLgrid.currentPositionY-1;
}
});

//right
game.doorRight = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    var lvlName = me.GLgrid.grid[me.GLgrid.currentPositionX][me.GLgrid.currentPositionY+1].name;
    me.levelDirector.loadLevel(lvlName);
    me.GLgrid.currentPositionX = me.GLgrid.currentPositionY+1;
}
});












