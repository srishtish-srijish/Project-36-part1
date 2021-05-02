class Food{
    constructor(){
    this.FoodStock=0;
    this.lastFeed;
    this.image=loadImage("Images/Milk.png")
    }
  
    updateFoodStock(FoodStock){
        this.FoodStock=FoodStock;
    }

    getFeedTime(lastFeed){
        this.lastFeed=lastFeed;
    }

    decreaseFood(){
        if(this.FoodStock>0){
            this.FoodStock=FoodStock-1;
        }
    }

    getFoodStock(){
        return this.FoodStock;
    }

    display(){
        var x=50,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if (this.FoodStock!=0){
            for(var i=0;i<this.FoodStock;i++){
                if(i%10==0){
                    x=18,y=50
                }
                image(this.image,50,50)
                x=x+30
            }
        }
    }
}
