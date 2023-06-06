var PLAY=1;
var END=0;
var score
var gamestate=PLAY

var bronze,gold,silver;
var ran=0;

function preload()
{
    mariorun=loadAnimation("images/1.png","images/3.png","images/4.png",
    "images/8.png","images/9.png","images/10.png");

    mariostop= loadAnimation("images/stop2.png")
    groundimg=loadImage("images/ground.png")

    // p1=loadImage("images/coin1.png");
     p2=loadImage("images/pillar4.png")
    // p3=loadImage("images/coin3.png")
    // p4=loadImage("images/coin4.png")
    //p5=loadImage("images/coin5.png")

    t1=loadImage("images/turtle1.png")
    e2=loadAnimation("images/mushroom1.png","images/mushroom5.png","images/mushroom8.png")
    
    silver=loadAnimation("images/coins/s1.png","images/coins/s2.png",
    "images/coins/s3.png","images/coins/s4.png","images/coins/s5.png")

    gold=loadAnimation("images/coins/g1.png","images/coins/g2.png",
    "images/coins/g3.png","images/coins/g4.png","images/coins/g5.png",
    "images/coins/g6.png")

    bronze=loadAnimation("images/coins/b1.png","images/coins/b2.png",
    "images/coins/b3.png","images/coins/b4.png","images/coins/b5.png",
    "images/coins/b6.png","images/coins/b7.png")

    go=loadImage("images/GO.png")
    rs=loadImage("images/R.png")

    lost=loadSound("images/mario_lose.mp3")
    jump=loadSound("images/jump.mp3")
}


function setup()
{
    canvas= createCanvas(1280,608)
    
    //creating original ground
    ground=createSprite(width/2, 560,2400,50)
    ground.addImage(groundimg)
    
//     bronzes=createSprite(600,200,20,20)
//     bronzes.addAnimation("brown",bronze)

//     golds=createSprite(200,200,20,20)
//     golds.addAnimation("gold",gold)


//     silvers=createSprite(400,200,20,20)
//    silvers.addAnimation("gray",silver)

    //mario sprite
    mario= createSprite(100,450,50,50)
    mario.addAnimation("running",mariorun)
    mario.addAnimation("stop",mariostop)
    mario.scale=0.7
    mario.debug=false
    mario.setCollider("rectangle",0,0,50,150)

    gameover= createSprite(600,250,50,50)
    gameover.addImage(go)
    gameover.scale=3

    restart= createSprite(600,400,50,50)
    restart.addImage(rs)
    restart.scale=0.2
    //creating second invisible ground
    ig=createSprite(width/2, 520,1280,25)
    ig.visible=false

    //creating groups
    tg=new Group()
    cg=new Group()
    eg=new Group();
    pg=new Group()
    edges=createEdgeSprites()
    score = 0
}

function draw()
{
    background("black")
    fill("white")
    textSize(35)
    text("Score: "+score,1000,50)
        
    if(gamestate===PLAY)
    {
            ground.velocityX=-(4+score/200)

            mario.depth=ground.depth
            mario.depth+=1

            //resetting ground
            //console.log(mario.y)
            if(ground.x<0)
            {
                ground.x=ground.width/2
            }

            if(keyDown("space") && mario.y>=425)
            {
                mario.velocityY=-17
                mario.velocityX=0.4
                jump.play()
            }

            //gravitational force 
            mario.velocityY= mario.velocityY+0.5

            //to stop mario going out of canvas and resetting
            if(mario.x>600)
            {
                mario.velocityX=0
        
            }

            //scoring
            //score=score+Math.round(getFrameRate()/60)

            //spawning
            spawnturtle()
            spawncoins()
            spawnenemy()
            spawnpillar()

            if(mario.isTouching(cg))
            {
                //for(i=0;i<cg.length;i++)
               // {

                    if(ran===1)
                    {
                        score=score+2
                        cg.destroyEach()
                        //cg.remove(cg[i]);
                       // cg.get(i).destroy();
                    }
                    else if(ran==2)
                    {
                        score=score+4
                        cg.destroyEach()
                        //cg.remove(cg[i]);
                        //cg.get(i).destroy();
                    }

                    else if(ran==3)
                    {
                        score=score+6
                        cg.destroyEach()
                        //cg.remove(cg[i]);
                        //cg.get(i).destroy();
                    }
                    else
                    {

                    }

                }

            if(mario.isTouching(tg)|| mario.isTouching(eg)||mario.isTouching(pg))
            {
                gamestate=END
                lost.play()

            }

            gameover.visible=false
            restart.visible=false
       

}
    else if(gamestate===END)
    {
            ground.velocityX=0
            
            mario.velocityY=0
            mario.velocityX=0
            mario.changeAnimation("stop")
           
            cg.setLifetimeEach(-1)
            tg.setLifetimeEach(-1)
            eg.setLifetimeEach(-1)
            pg.setLifetimeEach(-1)

           // ibg.setVelocityXEach(0)
            cg.setVelocityXEach(0)
            tg.setVelocityXEach(0)
            eg.setVelocityXEach(0)
            pg.setVelocityXEach(0)

            gameover.visible=true
            restart.visible=true
       

            // textSize(45)
            // fill("white")
            // text("BETTER LUCK NEXT TIME", 250,100)

            if(mousePressedOver(restart))
            {
                reset();
            }
        }

        //making trex stand on invisible ground
        mario.collide(ig)
        drawSprites()
}

function spawncoins()
{
    //var fc= Math.round(random(100,200))
    if(frameCount%300===0)
    {
        coin=createSprite(1280,200,30,60)
        coin.y=Math.round(random(100,250))
        coin.velocityX=-(4+score/200)
        //coin.debug=true;
    

        //adding member to group
        cg.add(coin)
        coin.lifetime=400
       
        ran=Math.round(random(1,3));
        switch(ran)
        {
            case 1: coin.addAnimation("goldy",gold)
                    break;

            case 2: coin.addAnimation("silvery",silver) 
                    break;

            case 3: coin.addAnimation("bronzey",bronze)  //correct
                    break;

            default:break;
         
        }

        console.log(ran + "----" + score)
 
    }
}

function spawnturtle()
{
    var fc= Math.round(random(100,600))
    if(frameCount%fc===0)
    {
        turtle=createSprite(1280,490,30,60)
        turtle.velocityX=-(4+score/200)
        turtle.lifetime=400
        turtle.scale=0.05
        turtle.addImage(t1)
        tg.add(turtle)

    }
}
function spawnenemy()
{
    var fc= Math.round(random(300,800))
    if(frameCount%fc===0)
    {
        enemy=createSprite(1280,490,30,60)
        enemy.velocityX=-(4+score/200)
        enemy.lifetime=400
        enemy.scale=0.2
        enemy.addAnimation("mushrrom",e2)
        eg.add(enemy)

    }
}

function spawnpillar()
{
    if(frameCount%1000===0)
    {
        pillar=createSprite(1280,490,30,60)
        pillar.velocityX=-(4+score/200)
        pillar.lifetime=400
        //pillar.scale=0.2
        pillar.debug=true
        pillar.addImage(p2)

        pillar.depth=ground.depth;
        ground.depth+=1
        pg.add(pillar)
    }
}

function reset()
{
    gamestate=PLAY;
    score=0;

    eg.destroyEach();
    tg.destroyEach();
    cg.destroyEach();
    pg.destroyEach()

    mario.x=100
    mario.changeAnimation("running")

    gameover.visible=false;
    restart.visible=false;

}

            

          /*  if(ran===1)
            {
                if(mario.isTouching(cg))
                {
                    score=score+2
                    //cg.destroyEach()
                    cg[cg.length-1].destroy();
                }
            }
            else if(ran==2)
            {
                if(mario.isTouching(cg))
                {
                    score=score+4
                   // cg.destroyEach()
                    cg[cg.length-1].destroy();
                }
            }
            else if(ran===3)
            {
                if(mario.isTouching(cg))
                {
                    score=score+6
                   // cg.destroyEach()
                    cg[cg.length-1].destroy();
                }
            }
            else
            {
                console.log("else")
            }
            */