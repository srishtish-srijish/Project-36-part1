var dog,sadDog,happyDog;
var feed,addFood,database,foodObject;
var foods;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObject=new Food();

  foodStock=database.ref('Feed');
  foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("FEED THE DOG")
  feed.position(800,100);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD")
  feed.position(600,200);
  feed.mousePressed(addFood);

}

function draw() {
  background(46,139,87);

  foodObject.display();
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){ lastFed=data.val(); 
  })
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
    }
    else if(lastFed==0){ text("Last Feed : 12 AM",350,30);
   }
   else{ text("Last Feed : "+ lastFed + " AM", 350,30); 
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObject.updateFoodStock(foods);
}

//function to update food stock and last fed time
function feedDog(){
  dog.image(happyDog);
  if(foodObject.getFoodStock()<= 0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);
}
else{
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
}

database.ref('/').update({
   Feed:foodObject.getFoodStock(),
    FeedTime:hour()
})

}

//function to add food in stock
function addFood(){
   foods++; 
   database.ref('/').update({
      Feed:foods }) 
    }
  