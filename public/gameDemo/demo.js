//--------------
__phaser = {

    gameObj: null,

    //-------------------
    game:{

      //-------------------
      init(canvasEle, appComponent){

  ;
              var game = new Phaser.Game(1240, 768, Phaser.AUTO, canvasEle, { preload: preload, create: create, update: update });
              var gameState = "preload"

              // assign it
              __phaser.gameObj = game;

            function preload() {




                game.stage.backgroundColor = '#95a5a6';


                this.load.image('blackground', '../../../gameDemo/assets/blackground.png');
                this.load.image('ground', '../../../gameDemo/assets/platform.png');
                this.load.image('star', '../../../gameDemo/assets/star.png');
                
                this.load.spritesheet('dude', '../../../gameDemo/assets/dude.png', 32, 48);
                
                game.load.onLoadStart.add(loadStart, this);
                game.load.onFileComplete.add(fileComplete, this);
                game.load.onLoadComplete.add(loadComplete, this);
                game.load.enableParallel = true;

                gameState = 'gameplay'
            }
            //-----------------------

            var platforms;
            var player;
            var cursors;

            function create() 
            {

                game.physics.startSystem(Phaser.Physics.ARCADE);
                            
                game.add.sprite(0, 0, 'blackground');
                platforms = game.add.group();
                platforms.enableBody = true;
              
                //Ground
                var ground = platforms.create(0, game.world.height - 64, 'ground');
                ground.scale.setTo(3.1, 2);
                ground.body.immovable = true;
                
                //Ledges
                var ledge = platforms.create(120, 630, 'ground');
                ledge.scale.setTo(0.3,0.5);
                ledge.body.immovable = true;

                ledge = platforms.create(-150, 250, 'ground');
                ledge.body.immovable = true;
  
                /***Player Creation***/
                player = game.add.sprite(32, game.world.height - 150, 'dude');
                player.scale.setTo(0.8,0.8);
                 game.physics.arcade.enable(player);
                 player.body.bounce.y = 0.2;
                 player.body.gravity.y = 780;
                 player.body.collideWorldBounds = true;
                 
 
                 player.animations.add('left', [0, 1, 2, 3], 10, true);
                 player.animations.add('right', [5, 6, 7, 8], 10, true);
           
                 cursors = game.input.keyboard.createCursorKeys();
            }
 
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
             }
            //-----------------------

            //-----------------------
            function loadComplete() {
            	loadingtext.setText("All assets loaded");
                loadingPercentage.setText("100%")

                 game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    loadingtext.destroy();
                    loadingPercentage.destroy();
                    startGame()
                }, this).autoDestroy = true;
            }
            //-----------------------


            function startGame(){
                gameState = "gameplay"



            }
            function gameplayUpdate(){

                 var hitPlatform = game.physics.arcade.collide(player, platforms);

                player.body.velocity.x = 0;

                if (cursors.left.isDown)
                {
                     player.body.velocity.x = -150;

                    player.animations.play('left');
                }
                else if (cursors.right.isDown)
                {
                     player.body.velocity.x = 150;

                    player.animations.play('right');
                }
                else
                {
                     player.animations.stop();
 
                    player.frame = 4;
                }

                    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
                {
                    player.body.velocity.y = -350;
                }
             
            }
            //-----------------------


             function update() {

                if(gameState == "preload"){ preloaderUpdate() }
                if(gameState == "gameplay"){ gameplayUpdate() }
           }
           
        },



    },
     destroyGame(callback){
          this.gameObj.destroy();
          callback();
    } 
}
