/* ======================================================
//
//   MotionA: 
//
// ====================================================== */

define([ '_', 'util', '../Box'],
function (_,   util,      Box) {

var BOX_SIZE = 200;
var BOX_MARGINE = 40;
var BOX_WIDTH_SURPLUS = 2;
var Z_DEFAULT = -200;
var Z_RANGE = 400;

var MotionA = function(scene, camera, boxId)
{ 
    this.scene = scene;
    this.camera = camera;
    this.boxId = boxId;    
    this.boxArray = [];
    this.camera_z = this.camera.position.z;
    this.step = 0;
    this.timer;

    this.setup();
};

MotionA.prototype = 
{

    setup:function(){
        if(!util.isPC()) {
            BOX_SIZE = 100;
            BOX_WIDTH_SURPLUS = 3;
            Z_DEFAULT = -100;
            Z_RANGE = 300;
        }

        this.createBox();

        this.timer = setInterval(this.change.bind(this), 1*1000);   
    },

    reset:function(){
        this.camera.position.z = this.camera_z;
        this.camera.rotation.z = 0;

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
        var w = window.innerWidth*BOX_WIDTH_SURPLUS;
        var num = Math.ceil(w/(BOX_SIZE + BOX_MARGINE));
        if(num%2 != 0) num -=1;        
        var start_pos = Math.floor(num*0.5)*(BOX_SIZE + BOX_MARGINE);
        for(var i = 0; i < num; i++){
            var box = new Box(this.scene, material, BOX_SIZE);
            box.mesh.rotation.x = Math.random()*360;          
            box.mesh.position.x = -start_pos + i*(BOX_SIZE + BOX_MARGINE);
            this.boxArray.push(box);
        }
    },

    run:function(){   
        var len = this.boxArray.length;
        for(var i = 0; i < len; i++){
            this.rendering( this.boxArray[i] );
        }         

        this.step += 0.01;
        this.camera.position.z = Z_DEFAULT + this.camera_z - Math.sin(this.step)*Z_RANGE;
        this.camera.rotation.z += 0.01;
    },

    rendering:function(box){
        box.mesh.rotation.x += 0.06;  
        box.mesh.position.x += 6; 
        var w = window.innerWidth*BOX_WIDTH_SURPLUS;
        var num = Math.ceil(w/(BOX_SIZE + BOX_MARGINE));
        if(num%2 != 0) num -=1;        
        var start_pos = Math.floor(num*0.5)*(BOX_SIZE + BOX_MARGINE);        
        if(box.mesh.position.x > start_pos){
           box.mesh.position.x = -start_pos; 
        }     
    },

    change:function(){   
        this.camera.rotation.z += 90;   

        createjs.Sound.play("tone");    
    }             
};

return {
     MotionA: MotionA          
}
});
