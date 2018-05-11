//--------------
__phaser = {

    gameObj: null,

    //-------------------
    game:{

      //-------------------
      init(canvasEle, appComponent){

            var config = 
                {
                    type: Phaser.AUTO,
                    width: 800,
                    height: 600,
                    scene: {
                        preload: preload,
                        create: create,
                        update: update
                }
            }
              // create game object
              var game = new Phaser.Game(800, 500, Phaser.AUTO, canvasEle, { preload: preload, create: create, update: update });
              var gameState = "preload"

              // assign it
              __phaser.gameObj = game;



            //-----------------------  PRELOAD
            function preload() {




                // set canvas color
                game.stage.backgroundColor = '#95a5a6';

                // load images/sounds/scripts
                this.load.image('sky', '../../../gameDemo/assets/sky.png');
                this.load.image('ground', '../../../gameDemo/assets/platform.png');
                this.load.image('star', '../../../gameDemo/assets/star.png');
                this.load.image('bomb', '../../../gameDemo/assets/bomb.png');
                this.load.spritesheet('dude', 
                '../../../gameDemo/assets/dude.png',
                    { frameWidth: 32, frameHeight: 48 }
                );
                // preloader events
                game.load.onLoadStart.add(loadStart, this);
                game.load.onFileComplete.add(fileComplete, this);
                game.load.onLoadComplete.add(loadComplete, this);
                game.load.enableParallel = true;
            }
            //-----------------------

            //-----------------------  CREATE
            function create() {
                this.add.image(0, 0, 'sky');
                this.add.image(400, 300, 'star');


            }
            //-----------------------


            //-----------------------
            function loadStart() {
                // text
                loadingtext = game.add.text(game.world.centerX, game.world.centerY/2, "");
                loadingtext.anchor.set(0.5);
                loadingPercentage = game.add.text(game.world.centerX, game.world.centerY, "");
                loadingPercentage.anchor.set(0.5);
            }
            //-----------------------

            //-----------------------
            function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
            	loadingtext.setText("Loading...");
                loadingPercentage.setText(progress + "%")
            }
            //-----------------------

            //-----------------------
            function preloaderUpdate(){
                // upadate cycle for anything in preload state
            }
            //-----------------------

            //-----------------------
            function loadComplete() {
            	loadingtext.setText("All assets loaded");
                loadingPercentage.setText("100%")

                // add slight delay before starting game
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    loadingtext.destroy();
                    loadingPercentage.destroy();
                    startGame()
                }, this).autoDestroy = true;
            }
            //-----------------------


            //-----------------------
            function startGame(){
                gameState = "gameplay"



            }
            //-----------------------

            //-----------------------
            function gameplayUpdate(){
             
            }
            //-----------------------


            //-----------------------  UPDATE
            function update() {

                // list of gamestates and their loops
                if(gameState == "preload"){ preloaderUpdate() }
                if(gameState == "gameplay"){ gameplayUpdate() }

            }
            //-----------------------



      },



    },
    //-------------------


    //-------------------
    destroyGame(callback){
          this.gameObj.destroy();
          callback();
    }
    //-------------------


}
//--------------
