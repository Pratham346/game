class Weapon{

    constructor(x, y, damage, image, v){

        this.damage=damage;
         this.image=image;
         this.x=x;
         this.y=y;
         this.velocityX = v;
        this.body = createSprite(x, y, 20, 20);
        this.body.velocityX = v;
        this.body.addImage(image);
    }
 
}