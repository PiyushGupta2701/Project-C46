var PLAY=1;
var END=0;
var gamestate=PLAY
var lifecount=3


function preload()
{
    mariorun=loadAnimation("images/1.png","images/3.png","images/4.png",
    "images/8.png","images/9.png","images/10.png");

    mariostop= loadAnimation("images/4.png")
    groundimg=loadImage("images/ground.png")

    p1=loadImage("images/pillar1.png");
    p2=loadImage("images/pillar2.png")
    p3=loadImage("images/pillar3.png")
    p4=loadImage("images/pillar4.png")
    //p5=loadImage("images/pillar5.png")

    t1=loadImage("images/turtle1.png")

    lifeimg=loadImage("images/heart.png")
}


function setup()
{
    canvas= createCanvas(1280,608)

    //creating original ground
    ground=createSprite(width/2, 560,2400,50)
    ground.addImage(groundimg)
    ground.velocityX=-4

    //mario sprite
    mario= createSprite(100,450,50,50)
    mario.addAnimation("running",mariorun)
    mario.addAnimation("stop",mariostop)
    mario.scale=0.7
    
    mario.debug=false
    mario.setCollider("rectangle",0,0,50,150)

    //creating second invisible ground
    ig=createSprite(width/2, 520,1280,25)
    ig.visible=false

    for(var b=1;b<=3;b++)
    {
        for(var a=b*1000; a<1190; a+=70)
        {
            life= createSprite(a,50,50,50)
            life.scale=0.05
            life.addImage(lifeimg)
        }
    }
    //creating groups
    tg=new Group()
    pg=new Group()
    ibg=new Group()

    edges=createEdgeSprites()
}

function draw()
{
    background("skyblue")
    
    if(gamestate===PLAY)
    {

        mario.depth=ground.depth
    mario.depth+=1
        //resetting ground
    if(ground.x<0)
    {
        ground.x=ground.width/2
    }

   
//console.log(mario.y)
    if(keyDown("space") && mario.y>=425)
    {
        mario.velocityY=-17
    }

    //gravitational force 
    mario.velocityY= mario.velocityY+0.5

    if(mario.isTouching(ibg))
    {
        mario.changeAnimation("stop")
        mario.velocityY=0
    }
    else
    {
        mario.changeAnimation("running")
    }

    if(mario.isTouching(pg))
    {
        gamestate=END

    }

    
    if(mario.isTouching(tg))
    {
        gamestate=END
        life.get(b).destroy()
    }
    spawnturtle()
    spawnpillar()


    }
    else if(gamestate===END)
    {
        ground.velocityX=0
        mario.velocityY=0
        mario.changeAnimation("stop")
        // ibg.destroyEach();
        // tg.destroyEach();
        // pg.destroyEach()
        ibg.setLifetimeEach(-1)
        pg.setLifetimeEach(-1)
        tg.setLifetimeEach(-1)

        ibg.setVelocityXEach(0)
        pg.setVelocityXEach(0)
        tg.setVelocityXEach(0)

        textSize(45)
        fill("black")
        text("OOPS BYE BYE TATA! ITS OVER NOW", 250,100)

    }

    //making trex stand on invisible ground
    mario.collide(ig)

    drawSprites()
}

function spawnpillar()
{
    if(frameCount%250===0)
    {
        pillar=createSprite(1280,460,30,60)
        pillar.velocityX=-4
        pillar.debug=true;
    
        //bringing ground in front and pillar behind
        pillar.depth=ground.depth;
        ground.depth+=1

        //adding member to group
        pg.add(pillar)
       
        //creating invisible block
        ib=createSprite(1280,460,60,20)
        ib.velocityX=-4
        ib.visible=false;
        ibg.add(ib)

        var ran=Math.round(random(1,4));
        switch(ran)
        {
            case 1: pillar.addImage(p1)
                    pillar.scale=0.5
                    ib.y=330
                    ib.width=90
                    break;

            case 2: pillar.addImage(p2) 
                    pillar.scale=1.5
                    ib.y=380
                    ib.width=60
                    break;

            case 3: pillar.addImage(p3)  //correct
                    pillar.scale=0.6
                    ib.y=260
                    ib.width=150
                    break;

            case 4: pillar.addImage(p4)
                    pillar.scale=0.8
                    ib.y=350
                    ib.width=80
                    break;
            default:break;
         
        }
      //  console.log(ran + "----" + ib.width)

    }
}

function spawnturtle()
{
    if(frameCount%100===0)
    {
        turtle=createSprite(1280,490,30,60)
        turtle.velocityX=-4
        turtle.scale=0.05
        turtle.addImage(t1)
        tg.add(turtle)
    }
}

