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
    {name: "area01_level_tiles",  type:"image", src: "data/img/map/area01_level_tiles.png"},
    {name: "Floor_Tiles_Base",  type:"image", src: "data/img/map/Floor_Tiles_Base.png"},
    /* 
    * Maps. 
    */
    {name: "area01", type: "tmx", src: "data/map/area01.tmx"},

     //player sprite
     {name: "gripe_run_right", type:"image", src: "data/img/sprite/gripe_run_right.png"}


     ];

     console.log(game.resources);

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
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







