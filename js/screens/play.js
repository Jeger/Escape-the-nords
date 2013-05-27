game.PlayScreen = me.ScreenObject.extend({
	/**	
	*  action to perform on state change
	*/
	onResetEvent: function() {
		me.levelDirector.loadLevel(me.GLgrid.grid[0][0].name);
		me.game.addHUD(0, 0, 640, 100);
		me.game.HUD.addItem("score", new game.ScoreObject(620, 10));
		me.dialogueBox = new DialogWindow();
		me.game.add(me.dialogueBox, 20);
		me.DialogueName = new DialogueName();
		me.game.add(me.DialogueName, 25);
		me.DialogueBody = new DialogueBody();
		me.game.add(me.DialogueBody, 25);

		me.DialogueImage = new DialogueImage(0,0, "ojdAvatar");
		me.game.add(me.DialogueImage, 22);

		me.DialogueImageRoger = new DialogueImage(0,0, "rogerAvatar");
    me.game.add(me.DialogueImageRoger, 23);
    me.DialogueImageRoger.visible = false;


		me.DialogueImageJo = new DialogueImage(0,0, "joAvatar");
    me.game.add(me.DialogueImageJo, 24);
    me.DialogueImageJo.visible = false;

		me.game.sort();
	},
	/**	
	*  action to perform when leaving this screen (state change)
	*/
	onDestroyEvent: function() {
		me.game.disableHUD();
	}
});
