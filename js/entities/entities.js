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
    this.updateColRect(18, 24, 2, 24);

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
        this.vel.y -= this.accel.y * me.timer.tick;
    } else if (me.input.isKeyPressed('down')) {
        this.vel.y += this.accel.y * me.timer.tick;
    } else {
        this.vel.y = 0;
        this.vel.x = 0;
    }

    if (me.input.isKeyPressed('x')) {
        if(me.dialogueBox.visible === false){
            me.dialogueBox.visible = true;
            me.DialogueBody.visible = true;
            me.DialogueName.visible = true;
            me.DialogueImage.visible = true;
        } else {
            me.dialogueBox.visible = false;
            me.DialogueBody.visible = false;
            me.DialogueName.visible = false;
            me.DialogueImage.visible = false;
            me.DialogueImageRoger.visible = false;
            me.DialogueImageJo.visible = false;
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


//dialogue stæsh
var DialogueName = me.GUI_Object.extend({
      init:function(x, y){
        settings = {};
        settings.spritewidth = 600;
        settings.spriteheight = 150;
        // parent constructor
        y = 330;
        x = 20;
        this.font = new me.Font("Arial", 18, "#fff", "left");
        this.value = "Ole Dohan Jahls spokelse:";
        this.parent(x, y, settings);
        console.log(this);
        console.log(me.game);
        return true;
   },

   draw: function(context, x, y) {
        y = 20;
        x = 20;
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }

});

var DialogueImage = me.GUI_Object.extend({
    init:function(x, y, image){
        settings = {};
        settings.image = image;
        settings.spritewidth = 96;
        settings.spriteheight = 96;
        // parent constructor
        y = 340;
        x = 500;
        this.parent(x, y, settings);
        return true;
    }
});

var DialogueBody = me.GUI_Object.extend({
      init:function(x, y){
        settings = {};
        settings.spritewidth = 600;
        settings.spriteheight = 150;
        // parent constructor
        y = 330;
        x = 20;
        this.font = new me.Font("Arial", 14, "#fff", "left");
        this.value1 = "IFI har blitt odelagt av humaniststudentzombier!";
        this.value2 = "Du maa komme deg til Escape, samle disketter og lose gaater!";
        this.value3 = "Trykk x for a hjemme denne boksen";
        this.parent(x, y, settings);
        console.log(this);
        console.log(me.game);
        return true;
   },

   draw: function(context, x, y) {
        y = 50;
        x = 20;
        y1 = 65;
        x1 = 20;
        y2 = 80;
        x2 = 20;
        this.font.draw(context, this.value1, this.pos.x + x, this.pos.y + y);
        this.font.draw(context, this.value2, this.pos.x + x1, this.pos.y + y1);
        this.font.draw(context, this.value3, this.pos.x + x2, this.pos.y + y2);
    }

});

var DialogWindow = me.GUI_Object.extend(
{
    init:function(x, y){
        settings = {};
        settings.image = "DialogWindow";
        settings.spritewidth = 600;
        settings.spriteheight = 150;
        // parent constructor
        y = 330;
        x = 20;
        this.parent(x, y, settings);
        console.log(this);
        console.log(me.game);
        return true;
   }
});

game.roger = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    me.DialogueName.value = "Regor Rantonsen";
    me.DialogueBody.value1 = "Vil du se paa de smarte ballene mine? Hvilket av disse uttrykkene er gyldig?";
    me.DialogueBody.value2 = "A: (P or Q) and (not P or Q), B: (P or not P), C:(P or Q) or not P";
    me.DialogueBody.value3 = "";
    me.dialogueBox.visible = true;
    me.DialogueBody.visible = true;
    me.DialogueName.visible = true;
    me.DialogueImage.visible = false;
    me.DialogueImageJo.visible = false;
    me.DialogueImageRoger.visible = true;
    if (me.input.isKeyPressed('a')) {
        me.DialogueBody.value1 = "RIKTIG!";
        me.DialogueBody.value2 = "Gratulerer!";
        me.DialogueBody.value3 = "";
        me.game.remove(this);
        return true;
    } else if (me.input.isKeyPressed('b')){
        me.DialogueBody.value1 = "Feil!";
        me.DialogueBody.value2 = "Prov igjen";
        me.DialogueBody.value3 = "";
        this.collidable = false;
    } else if (me.input.isKeyPressed('c')) {
        me.DialogueBody.value1 = "Feil!";
        me.DialogueBody.value2 = "Prov igjen";
        me.DialogueBody.value3 = "";
        this.collidable = false;
    }
}
});

game.ojd = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    me.DialogueName.value = "Dole Dohan Jahl";
    me.DialogueBody.value1 = "I huleste granskauen! Hvorfor i all verden programmerer studentene i Java.";
    me.DialogueBody.value2 = "Fortell meg hva er det første man skriver i et Simula program?";
    me.DialogueBody.value3 = "A: [Begin], B: [start], C:[first]";
    me.dialogueBox.visible = true;
    me.DialogueBody.visible = true;
    me.DialogueName.visible = true;
    me.DialogueImage.visible = true;
    me.DialogueImageRoger.visible = false;
    me.DialogueImageJo.visible = false;
    if (me.input.isKeyPressed('a')) {
         me.DialogueBody.value1 = "RIKTIG!";
        me.DialogueBody.value2 = "Gratulerer!";
        me.DialogueBody.value3 = "";
        me.game.remove(this);
        return true;
    } else if (me.input.isKeyPressed('b')){
       me.DialogueBody.value1 = "Feil!";
        me.DialogueBody.value2 = "Prøv igjen";
        me.DialogueBody.value3 = "";
    } else if (me.input.isKeyPressed('c')) {
        me.DialogueBody.value1 = "Feil!";
        me.DialogueBody.value2 = "Prøv igjen";
        me.DialogueBody.value3 = "";
    }
}
});


game.jo = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.collidable = true;
},

onCollision: function(res, obj) {
    me.DialogueName.value = "Ho Jerstad";
    me.DialogueBody.value1 = "Har du noen gang tenkt over hvor deilig det er aa ta aa fole på slipt treverk?";
    me.DialogueBody.value2 = "Men nok om det, hvilket av disse er et designprinsipp?";
    me.DialogueBody.value3 = "A: Utseende, B: Affordance, C:mykhet";
    me.dialogueBox.visible = true;
    me.DialogueBody.visible = true;
    me.DialogueName.visible = true;
    me.DialogueImage.visible = false;
    me.DialogueImageRoger.visible = false;
    me.DialogueImageJo.visible = true;
    if (me.input.isKeyPressed('a')) {
        me.DialogueBody.value1 = "Feil!";
        me.DialogueBody.value2 = "Prøv igjen";
        me.DialogueBody.value3 = "";
    } else if (me.input.isKeyPressed('b')){
        me.DialogueBody.value1 = "RIKTIG!";
        me.DialogueBody.value2 = "Gratulerer!";
        me.DialogueBody.value3 = "";
        me.game.remove(this);
        return true;
    } else if (me.input.isKeyPressed('c')) {
        me.DialogueBody.value1 = "Feil!";
        me.DialogueBody.value2 = "Prøv igjen";
        me.DialogueBody.value3 = "";
    }
}
});

game.aogerRantonsen = me.ObjectEntity.extend({
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
    console.log("x: " + me.GLgrid.currentPositionX + "y: " + me.GLgrid.currentPositionY);
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
    console.log('loading:' + lvlName);
    me.levelDirector.loadLevel(lvlName);
    me.GLgrid.currentPositionX = me.GLgrid.currentPositionX+1;
    console.log("new pos: x: " + me.GLgrid.currentPositionX + "y: " + me.GLgrid.currentPositionY);
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
    console.log("x: " + me.GLgrid.currentPositionX + "y: " + me.GLgrid.currentPositionY);
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
    me.GLgrid.currentPositionY = me.GLgrid.currentPositionY+1;
    console.log("x: " + me.GLgrid.currentPositionX + "y: " + me.GLgrid.currentPositionY);
}
});












