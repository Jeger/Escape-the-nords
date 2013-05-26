game.PlayScreen = me.ScreenObject.extend({
	/**	
	*  action to perform on state change
	*/
	onResetEvent: function() {
		me.levelDirector.loadLevel("area01");
		me.game.addHUD(0, 380, 640, 100, "#000");
		me.game.HUD.addItem("dialogue", new game.DialogueObject(0, 10));
		me.game.HUD.addItem("score", new game.ScoreObject(620, 10));
		me.game.HUD.setItemValue("dialogue", "Jeg er en tekst som kommer frem naar spillet begynner!");
		me.game.sort();
	},
	/**	
	*  action to perform when leaving this screen (state change)
	*/
	onDestroyEvent: function() {
		me.game.disableHUD();
	}
});
