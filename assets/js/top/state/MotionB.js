/* ======================================================
//
//   MotionB: 
//
// ====================================================== */

define([ '_', 'util', '../Box'],
function (_,   util,      Box) {

var BOX_SIZE = 400;
var BOX_MARGINE = BOX_SIZE*0.5;

var MotionB = function(scene, camera, boxId)
{ 
    this.scene = scene;
    this.camera = camera;
    this.boxId = boxId;    
    this.boxArray = [];
    this.camera_z = this.camera.position.z;
    this.imagesArray;
    this.timer;
    this.timer_1;
    this.shfuffleIndex = 0; 

    this.setup();
};

MotionB.prototype = 
{

    setup:function(){
        if(!util.isPC()) BOX_SIZE = 200;

        this.createBox();  

        this.timer = setInterval(this.change.bind(this), 1*1000);           
    },

    reset:function(){
        var len = this.boxArray.length;
        for(var i = 0; i < len; i++){
            this.boxArray[i].remove();
        }  

        clearInterval(this.timer); 
        clearInterval(this.timer_1);                           
    },

    createBox:function(){
        // マテリアル生成
        this.imagesArray = topPage.getDataById(this.boxId).images;
        this.imagesArray = _.shuffle(this.imagesArray);        
        var material;
        if(this.imagesArray.length > 0){
            var id = this.boxId;    
            var materialsArray = [];
            for(var i = 0; i < 6; i++){
                var num = this.imagesArray[i%this.imagesArray.length];
                var tmp = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./assets/img/' + id + '_' + num + '.jpg')});
                materialsArray.push(tmp);
            }
            material = new THREE.MeshFaceMaterial(materialsArray);
        }else{
            material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
        }

        // ボックス生成
        var w = window.innerWidth*2;
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
    },

    rendering:function(box){
        var size = 400;
        box.mesh.rotation.x += 0.02;
        box.mesh.rotation.y += 0.02;          
        box.mesh.position.x -= 6; 
        var w = window.innerWidth*2;
        var num = Math.ceil(w/(BOX_SIZE + BOX_MARGINE));
        if(num%2 != 0) num -=1;        
        var start_pos = Math.floor(num*0.5)*(BOX_SIZE + BOX_MARGINE);        
        if(box.mesh.position.x < -start_pos){
           box.mesh.position.x = start_pos; 
        }            
    },

    change:function(){  
        if(this.imagesArray.length > 0 && util.isPC()){
            this.timer_1 = setInterval(this.shuffleTexture.bind(this), 60);  
        }else{
            this.timer_1 = setInterval(this.rotate.bind(this), 60);
        }    

        createjs.Sound.play("tone");    
    },

    shuffleTexture:function(){   
        this.shfuffleIndex++;
        var len = this.boxArray.length;        
        if(this.shfuffleIndex < 10){
            for(var i = 0; i < len; i++){
                for(var j = 0; j < 6; j++){
                    var rnd = Math.floor(Math.random()*6);
                    var tmp = new THREE.TextureLoader().load('./assets/img/_' + rnd + '.jpg');
                    this.boxArray[i].mesh.material.materials[j].map = tmp;
                }                 
            }
        }else{
            this.shfuffleIndex = 0;              
            clearInterval(this.timer_1);   

            if(this.imagesArray.length > 0){
                for(var i = 0; i < len; i++){
                    this.imagesArray = topPage.getDataById(this.boxId).images;
                    this.imagesArray = _.shuffle(this.imagesArray);            
                    var id = this.boxId; 
                    var num = this.imagesArray[i%this.imagesArray.length];
                    for(var j = 0; j < 6; j++){
                        var tmp = new THREE.TextureLoader().load('./assets/img/' + id + '_' + num + '.jpg');
                        this.boxArray[i].mesh.material.materials[j].map = tmp;
                    } 
                }  
            }else{

            }               
        }             
    },

    rotate:function(){   
        this.shfuffleIndex++;
        var len = this.boxArray.length;        
        if(this.shfuffleIndex < 10){
            for(var i = 0; i < len; i++){
                var box = this.boxArray[i];
                box.mesh.rotation.x += 0.16;
                box.mesh.rotation.y += 0.16; 
            }     
        }else{
            this.shfuffleIndex = 0;    
            clearInterval(this.timer_1);                          
        }         
    },                         
};

return {
    MotionB: MotionB           
}
});
