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
    {name: "area01 2", type: "tmx", src: "data/map/area01 2.tmx"},
    {name: "area02 2", type: "tmx", src: "data/map/area02 2.tmx"},
    {name: "areaDown01", type: "tmx", src: "data/map/areaDown01.tmx"},
    {name: "areaDown02", type: "tmx", src: "data/map/areaDown02.tmx"},
    {name: "areaDown03", type: "tmx", src: "data/map/areaDown03.tmx"},
    {name: "areaDownRight", type: "tmx", src: "data/map/areaDownRight.tmx"},
    {name: "areaUpperLeft", type: "tmx", src: "data/map/areaUpperLeft.tmx"},
    {name: "areaDownLeft", type: "tmx", src: "data/map/areaDownLeft.tmx"},
    {name: "areaUpperRight", type: "tmx", src: "data/map/areaUpperRight.tmx"},
    {name: "areaRight01", type: "tmx", src: "data/map/areaRight01.tmx"},
    {name: "areaRight02", type: "tmx", src: "data/map/areaRight02.tmx"},
    {name: "areaUp01", type: "tmx", src: "data/map/areaUp01.tmx"},
    {name: "areaUp02", type: "tmx", src: "data/map/areaUp02.tmx"},
    {name: "areaLeft01", type: "tmx", src: "data/map/areaLeft01.tmx"},
    {name: "areaLeft02", type: "tmx", src: "data/map/areaLeft02.tmx"},
    {name: "roger", type: "tmx", src: "data/map/roger.tmx"},

    //sprites
    {name: "Main_char", type:"image", src: "data/img/sprite/Main_char.png"},
    {name: "DialogWindow", type:"image", src: "data/img/sprite/DialogWindow.png"},
    {name: "ojdAvatar", type:"image", src: "data/img/sprite/ojdAvatar.png"},
    {name: "roger", type:"image", src: "data/img/sprite/roger.png"},
    {name: "ojd", type:"image", src: "data/img/sprite/ojd.png"},
    {name: "rogerAvatar", type:"image", src: "data/img/sprite/rogerAvatar.png"},
    {name: "jo", type:"image", src: "data/img/sprite/jo.png"},
    {name: "joAvatar", type:"image", src: "data/img/sprite/joAvatar.png"},
    {name: "backsound", type: "audio", src: "data/bgm/", channel: 1},




     // game font
    {name: "32x32_font", type: "image", src: "data/img/font/32x32_font.png"}
    ];

    function generatelevelGrid (){
        var sizeOfGrid = 5;
        var numberOfLevels = sizeOfGrid * sizeOfGrid;

        //add all required levels here, they will each appear exactly once.
        var requiredLevels = [];
        requiredLevels.push(level = {name: "roger", type: "tmx", src: "data/map/roger.tmx", req: true});
        requiredLevels.push(level = {name: "area03", type: "tmx", src: "data/map/area03.tmx", req: true});

        //right side maps
        var rightEdgeLevels = [];
        rightEdgeLevels.push(level = {name: "areaRight01", type: "tmx", src: "data/map/areaRight01.tmx", req: true});
        rightEdgeLevels.push(level = {name: "areaRight02", type: "tmx", src: "data/map/areaRight02.tmx", req: true});
        //left side
        var leftEdgeLevels = [];
        leftEdgeLevels.push(level = {name: "areaLeft01", type: "tmx", src: "data/map/areaLeft01.tmx", req: true});
        leftEdgeLevels.push(level = {name: "areaLeft02", type: "tmx", src: "data/map/areaLeft02.tmx", req: true});
        //lower map
        var lowerEdgeLevels = [];
        lowerEdgeLevels.push(level = {name: "areaDown01", type: "tmx", src: "data/map/areaDown01.tmx", req: true});
        lowerEdgeLevels.push(level = {name: "areaDown02", type: "tmx", src: "data/map/areaDown02.tmx", req: true});
        lowerEdgeLevels.push(level = {name: "areaDown03", type: "tmx", src: "data/map/areaDown03.tmx", req: true});
        //upper maps
        var upperEdgeLevels = [];
        upperEdgeLevels.push(level = {name: "areaUp02", type: "tmx", src: "data/map/areaUp02.tmx", req: true});
        upperEdgeLevels.push(level = {name: "areaUp01", type: "tmx", src: "data/map/areaUp01.tmx", req: true});
        //corner levels clockwise from upper left
        var cornerLevels = [];
        cornerLevels.push(level = {name: "areaUpperLeft", type: "tmx", src: "data/map/areaUpperLeft.tmx", req: true});
        cornerLevels.push(level = {name: "areaUpperRight", type: "tmx", src: "data/map/areaUpperRight.tmx", req: true});
        cornerLevels.push(level = {name: "areaDownRight", type: "tmx", src: "data/map/areaDownRight.tmx", req: true});
        cornerLevels.push(level = {name: "areaDownLeft", type: "tmx", src: "data/map/areaDownLeft.tmx", req: true});
        //corner topright
        //corner bottomright
        //corner bottomleft
        var genericLevels = [];
        genericLevels.push(level = {name: "area01 2", type: "tmx", src: "data/map/area01 2.tmxtmx", req: false});
        genericLevels.push(level = {name: "area02 2", type: "tmx", src: "data/map/area02 2.tmx", req: false});
        requiredLevels.push(level = {name: "area01", type: "tmx", src: "data/map/area01.tmx", req: false});
        requiredLevels.push(level = {name: "area02", type: "tmx", src: "data/map/area02.tmx", req: false});

        //create the grid
        function createGrid() {
            var levelGrid = {
                sizeOfGrid : sizeOfGrid,
                currentPositionX : 0,
                currentPositionY : 0,
                grid : []
            };
            fillWithGeneric(levelGrid);
            createEdges(levelGrid);
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

        function createEdges(levelGrid){
            var randomRight = Math.floor((Math.random()*(rightEdgeLevels.length)));
            var randomLeft = Math.floor((Math.random()*(leftEdgeLevels.length)));
            var randomTop = Math.floor((Math.random()*(upperEdgeLevels.length)));
            var randomBottom = Math.floor((Math.random()*(lowerEdgeLevels.length)));


            //insert top edges
            for(var i=0;i < sizeOfGrid;i++){
                levelGrid.grid[0][i] =  upperEdgeLevels[randomTop];
                randomTop = Math.floor((Math.random()*(upperEdgeLevels.length)));

                levelGrid.grid[sizeOfGrid-1][i] =  lowerEdgeLevels[randomBottom];
                randomBottom = Math.floor((Math.random()*(lowerEdgeLevels.length)));

                levelGrid.grid[i][0] =  leftEdgeLevels[randomLeft];
                randomLeft = Math.floor((Math.random()*(leftEdgeLevels.length)));

                levelGrid.grid[i][sizeOfGrid-1] =  rightEdgeLevels[randomRight];
                randomRight = Math.floor((Math.random()*(rightEdgeLevels.length)));
            }

            //insert corners
            levelGrid.grid[0][0] = cornerLevels[0];
            levelGrid.grid[0][sizeOfGrid -1] = cornerLevels[1];
            levelGrid.grid[sizeOfGrid-1][sizeOfGrid-1] = cornerLevels[2];
            levelGrid.grid[sizeOfGrid-1][0] =  cornerLevels[3];
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
        console.log(me.GLgrid);

        // Initialize the audio.
        me.audio.init("mp3");

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
        me.entityPool.add("roger", game.roger);
        me.entityPool.add("jo", game.jo);
        me.entityPool.add("ojd", game.ojd);
        me.entityPool.add("doorUp", game.doorUp);
        me.entityPool.add("doorDown", game.doorDown);
        me.entityPool.add("doorLeft", game.doorLeft);
        me.entityPool.add("doorRight", game.doorRight);
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.X, "x", true);
        me.input.bindKey(me.input.KEY.A, "a", true);
        me.input.bindKey(me.input.KEY.B, "b", true);
        me.input.bindKey(me.input.KEY.C, "c", true);
        me.audio.init("mp3");
        me.audio.play("backsound", true);
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







