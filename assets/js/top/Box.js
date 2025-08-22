define([ '_'],
function (_) {

/* ======================================================
//
//   Box: ボックス
//
// ====================================================== */

var Box = function(scene, material, size)
{
    this.scene = scene;
    this.material = material;   
    this.size = size; 
    this.mesh;
    this.xpos;
    this.ypos;
    this.zpos;

    this.setup();
};

Box.prototype = 
{
    setup:function(){        
        // ジオメトリ生成
        var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);

        // メッシュ作成
        this.mesh = new THREE.Mesh(geometry, this.material); 
        this.mesh.position.z = -this.size*0.5;  

        // シーンに追加  
        this.scene.add( this.mesh );
    },

    remove:function(){ 
        this.scene.remove( this.mesh );
        this.mesh = null;
    }    
};

return Box;
});
