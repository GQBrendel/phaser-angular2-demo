//--------------
__phaser = {

    gameObj: null,

    //-------------------
    game:{

      //-------------------
      init(canvasEle, appComponent){

  ;
              // create game object
              var game = new Phaser.Game(1240, 768, Phaser.AUTO, canvasEle, { preload: preload, create: create, update: update });
//              var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
              var gameState = "preload"

              // assign it
              __phaser.gameObj = game;



            //-----------------------  PRELOAD
            function preload() {




                // set canvas color
                game.stage.backgroundColor = '#95a5a6';

                // load images/sounds/scripts
//                this.load.image('sky', '../../../gameDemo/assets/sky.png');

                this.load.image('blackground', '../../../gameDemo/assets/blackground.png');
                this.load.image('ground', '../../../gameDemo/assets/platform.png');
                this.load.image('star', '../../../gameDemo/assets/star.png');
                this.load.image('bomb', '../../../gameDemo/assets/bomb.png');
                
                this.load.spritesheet('dude', '../../../gameDemo/assets/dude.png', 32, 48);
                
                /*this.load.spritesheet('dude', 
                '../../../gameDemo/assets/dude.png',
                    { frameWidth: 32, frameHeight: 48 }
                );*/
                // preloader events
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
            //-----------------------  CREATE
            function create() 
            {

                game.physics.startSystem(Phaser.Physics.ARCADE);
                            
                //  A simple background for our game
                game.add.sprite(0, 0, 'blackground');
             
                //  The platforms group contains the ground and the 2 ledges we can jump on
                platforms = game.add.group();

                //  We will enable physics for any object that is created in this group
                platforms.enableBody = true;

                // Here we create the ground.
                var ground = platforms.create(0, game.world.height - 64, 'ground');

                //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
                ground.scale.setTo(3.1, 2);

                //  This stops it from falling away when you jump on it
                ground.body.immovable = true;

                //  Now let's create two ledges
                var ledge = platforms.create(120, 630, 'ground');
                ledge.scale.setTo(0.3,0.5);

                ledge.body.immovable = true;

                ledge = platforms.create(-150, 250, 'ground');

                ledge.body.immovable = true;
  
                /***Player Creation***/
                 // The player and its settings
                player = game.add.sprite(32, game.world.height - 150, 'dude');
                player.scale.setTo(0.8,0.8);

                 //  We need to enable physics on the player
                 game.physics.arcade.enable(player);
 
                 //  Player physics properties. Give the little guy a slight bounce.
                 player.body.bounce.y = 0.2;
                 player.body.gravity.y = 780;
                 player.body.collideWorldBounds = true;
                 
 
                 //  Our two animations, walking left and right.
                 player.animations.add('left', [0, 1, 2, 3], 10, true);
                 player.animations.add('right', [5, 6, 7, 8], 10, true);
                 /***               ***/ 
                 //  Our controls.
                cursors = game.input.keyboard.createCursorKeys();
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

                //  Collide the player and the stars with the platforms
                var hitPlatform = game.physics.arcade.collide(player, platforms);

                //  Reset the players velocity (movement)
                player.body.velocity.x = 0;

                if (cursors.left.isDown)
                {
                    //  Move to the left
                    player.body.velocity.x = -150;

                    player.animations.play('left');
                }
                else if (cursors.right.isDown)
                {
                    //  Move to the right
                    player.body.velocity.x = 150;

                    player.animations.play('right');
                }
                else
                {
                    //  Stand still
                    player.animations.stop();

                    player.frame = 4;
                }

                //  Allow the player to jump if they are touching the ground.
                if (cursors.up.isDown && player.body.touching.down && hitPlatform)
                {
                    player.body.velocity.y = -350;
                }
             
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
