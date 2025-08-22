/* ======================================================
//
//   MotionC: 
//
// ====================================================== */

define([ '_', '../Box'],
function (_,       Box) {

var BOX_SIZE = 200;
var BOX_MARGINE = 20;

var MotionC = function(scene, camera, boxId)
{ 
    this.scene = scene;
    this.camera = camera;
    this.boxId = boxId;    
    this.boxArray = [];
    this.timer;

    this.setup();
};

MotionC.prototype = 
{

    setup:function(){
        if(!util.isPC()) BOX_SIZE = 120;

        this.createBox();

        this.timer = setInterval(this.createBox.bind(this), 1*1000);          
    },

    reset:function(){
        var len = this.boxArray.length;
        for(var i = 0; i < len; i++){
            this.boxArray[i].remove();
        }     

        clearInterval(this.timer);               
    },

    createBox:function(){
        // マテリアル生成
        var imagesArray = topPage.getDataById(this.boxId).images;
        imagesArray = _.shuffle(imagesArray);        
        var material;
        if(imagesArray.length > 0){
            var id = this.boxId;    
            var materialsArray = [];
            for(var i = 0; i < 6; i++){
                var num = imagesArray[i%imagesArray.length];
                var tmp = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./assets/img/' + id + '_' + num + '.jpg')});
                materialsArray.push(tmp);
            }
            material = new THREE.MeshFaceMaterial(materialsArray);
        }else{
            material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
        }

        // ボックス生成
        var box = new Box(this.scene, material, BOX_SIZE);
        box.mesh.position.z = 800;
        box.mesh.rotation.x = 360;
        new TWEEN.Tween(box.mesh.position).to({x:0, y:-window.innerWidth*0.5 + BOX_SIZE, z:0}, 400).easing(TWEEN.Easing.Cubic.InOut).start();  
        new TWEEN.Tween(box.mesh.rotation).to({x:0, y:0, z:0}, 400).start();                
        this.boxArray.push(box);

        createjs.Sound.play("tone");         
    },

    run:function(){   
        var len = this.boxArray.length;
        for(var i = 0; i < len; i++){
            this.rendering( this.boxArray[i] );
        } 

        TWEEN.update();                
    },

    rendering:function(box){
        box.mesh.position.y += 6;
        box.mesh.rotation.x -= 0.06;       
    }           
};

return {
    MotionC: MotionC           
}
});
