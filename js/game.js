/* game namespace */
var game = {
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
        //game resources
        game.resources = [
    /**
     * Graphics.
     */
    // our level tileset
    {name: "Terrain",  type:"image", src: "data/img/map/Terrain.png"},
    {name: "metatiles32x32",  type:"image", src: "data/img/map/metatiles32x32.png"},

    /* 
    * Maps. 
    * Also add in level array below when adding here
    */
    {name: "area01", type: "tmx", src: "data/map/area01.tmx"},
    {name: "area02", type: "tmx", src: "data/map/area02.tmx"},

     //player sprite
    {name: "Main_char", type:"image", src: "data/img/sprite/Main_char.png"},

     // game font
    {name: "32x32_font", type: "image", src: "data/img/font/32x32_font.png"}
    ];

    function generatelevelGrid (){
        var sizeOfGrid = 5;
        var numberOfLevels = sizeOfGrid * sizeOfGrid;

        //add all required levels here, they will each appear exactly once.
        var requiredLevels = [];
        requiredLevels.push(level = {name: "area01", type: "tmx", src: "data/map/area01.tmx", req: true});
        requiredLevels.push(level = {name: "area02", type: "tmx", src: "data/map/area02.tmx", req: true});

        //add all generic levels here
        var genericLevels = [];
        genericLevels.push(level = {name: "area01", type: "tmx", src: "data/map/area01.tmx", req: false});

        //create the grid
        function createGrid() {
            var levelGrid = {
                sizeOfGrid : sizeOfGrid,
                currentPositionX : 0,
                currentPositionY : 0,
                grid : []
            };
            fillWithGeneric(levelGrid);
            insertRequired(levelGrid);
            return levelGrid;
        }

        function insertRequired(levelGrid){
            var randY = Math.floor((Math.random()*sizeOfGrid));
            var randX = Math.floor((Math.random()*sizeOfGrid));
            for (var i = 0; i <= requiredLevels.length - 1; i++) {
                randY = Math.floor((Math.random()*sizeOfGrid));
                randX = Math.floor((Math.random()*sizeOfGrid));
                if (levelGrid.grid[randX][randY].req === true){
                    i--;
                } else {
                    levelGrid.grid[randX][randY] = requiredLevels[i];
                }
            }
        }

        function fillWithGeneric(levelGrid){
            for (var i = 0; i <= sizeOfGrid - 1; i++) {
                levelGrid.grid[i] = [];
                for(var j = 0;j <= sizeOfGrid -1; j++){
                    levelGrid.grid[i][j] = genericLevels[0];
                }
            }
        }
        return createGrid();
    }

        me.GLgrid = generatelevelGrid();

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);

        me.font = new me.Font("Arial", 14, "#fff", "left");
    },



    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("enemy", game.EnemyEntity);
        me.entityPool.add("doorUp", game.doorUp);
        me.entityPool.add("doorDown", game.doorDown);
        me.entityPool.add("doorLeft", game.doorLeft);
        me.entityPool.add("doorRight", game.doorRight);
        me.entityPool.add("plant", game.plant);

        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.X, "x", true);
        // Start the game.
        me.sys.gravity = 0;
        me.state.change(me.state.PLAY);
    }
    /* --- callback when everything is loaded --- */
//     "loaded" : function () {
//     // set the "Play/Ingame"
//     // Object me.state.set(me.state.PLAY, game.PlayScreen()); 
//     // add our player entity in the entity pool 

//     // 

//     // start the game 
//     me.state.change(me.state.PLAY); 
// }
};







