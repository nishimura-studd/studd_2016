/* ======================================================
//
//   TopPage - トップページコントローラ
//
// ====================================================== */

define(['_', '../request', 'top/TextEffects', 'top/state', 'top/templates'],
function (_,     Request,       TextEffects,      State,       templates) {

var state;
var stateIndex = 0;
var timer;

var TopPage = function(){
    this.json;
    this.scene;
    this.camera;  
    this.mesh;      
    this.renderer;
    this.boxId = 0; 
    this.bgIndex = 0;
    this.workArray = [];
    this.isRun;

    this.init();
};

TopPage.prototype = {

    init:function(){        
        this.load();     

        // フッター表示
        $('footer').fadeIn(600);                  
    },

    /* ======================================================
    //
    //   データ取得
    //
    // ====================================================== */

    load:function(){
        var request = new Request();
        request.getData({
            url: "./assets/json/works.json",
            success :function(data){
                this.onLoad(data);
            }.bind(this)
        });
    },

    onLoad:function(data){
        this.json = data;

        this.loadSound();     
    },

    getDataById:function(id){
        var data;
        _.each(this.json.content.works, function(work){
            if(work.id == id) data =  work;
        });          
        return data;
    },    

    /* ======================================================
    //
    //   サウンド
    //
    // ====================================================== */

    loadSound:function(){
        if(util.uaInfo().isChrome){
            createjs.Sound.registerSound( {id:"tone", src:"assets/sound/tone.mp3"} );        

            createjs.Sound.addEventListener("fileload", this.onLoadSound.bind(this));
        }else{
            this.createTop(); 
        }
        
        // DEBUG
        // this.createTop();  
    },  

    onLoadSound:function(){
        this.createTop();       
    }, 

    /* ======================================================
    //
    //   トップ生成
    //
    // ====================================================== */

    createTop:function(){
        window.addEventListener('resize', this.onResize.bind(this) ); 

        $('#close').click(this.hide.bind(this)); 

        this.buildBg();

        this.build();            
    },   

    /* ======================================================
    //
    //   リサイズ
    //
    // ====================================================== */

    onResize:function(){  
        // レンダラー設定        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        // ピクセルパーフェクト
        var h = window.innerHeight;
        var cameraZ = -(h / 2) / Math.tan((this.camera.fov * Math.PI / 180) / 2);
        this.camera.position.set(0, 0, -cameraZ);

        // WORKS更新
        this.bgIndex = 0;
        this.workArray = [];        
        $("#works").empty();
        this.buildBg();

        this.hide();
    },

    /* ======================================================
    //
    //   WORK生成
    //
    // ====================================================== */

    buildBg:function(){
        var works = this.json.content.works;
        var template = templates.workTmpl;  
        var h = $("#works").height();
        if( h < window.innerHeight - 140){
            var work = this.json.content.works[this.bgIndex%this.json.content.works.length];
            var $s = $(template(work));
            $('#works').append($s);
            this.workArray.push($s);        
            $s.delay(this.bgIndex*(10)).css({opacity:'0'}).animate({opacity:'1'},600);          
            this.bgIndex++;
            this.buildBg();
            $s.click(this.onClickWork.bind(this)); 
        }else{
            var last = this.workArray[this.workArray.length - 1];
            var s = last.find("span");
            s.html(" ...");
        }    
    },

    onClickWork:function(e){
        e.preventDefault();

        this.boxId = $(e.target).closest('span').attr("class");

        this.show();
    },

    /* ======================================================
    //
    //   詳細制御
    //
    // ====================================================== */

    showDetail:function(){
        $('#close').animate({'top':'0px'});
        $('#arrow').delay(300).animate({'left':'12'}); 

        $('#detail').show();
        $('#title').show();   

        var data = this.getDataById(this.boxId);

        this.textEffects = new TextEffects($('#title'), data.title);       
        this.textEffects.el.on("animationEnd", this.showDescription);

        $('#date').text(data.year);   
        $('#skill').text(data.skill);
        if(data.url) {
            $('#link').html('<a href="'+ data.url + '" target="_blank">' + data.url + '</a>'); 
            $('#link').on('click', this.onClickLink.bind(this));
        }

        $('#works').animate({'opacity':'0.1'}); 
    },    

    hideDetail:function(){
        $('#arrow').animate({'left':'62'});         
        $('#close').delay(300).animate({'top':'-120px'});

        $('#detail').hide();

        if(this.textEffects) this.textEffects.stopEffect();

        this.hideDescription();

        $('#link').off('click');

        $('#works').animate({'opacity':'1'});        
    },  

    showDescription:function(){        
        $('#date').delay(0).fadeIn(600);   
        $('#skill').delay(200).fadeIn(600);   
        $('#link').delay(400).fadeIn(600);                           
    },    

    hideDescription:function(){
        $('#title').stop(true, true).hide();       
        $('#date').stop(true, true).hide(); 
        $('#skill').stop(true, true).hide(); 
        $('#link').stop(true, true).hide();   
        $('#title').text('');  
        $('#date').text('');  
        $('#skill').text('');  
        $('#link').html('');                                                       
    },             

    onClickLink:function(e){  
        e.preventDefault();

        var url = $(e.target).attr('href');
        window.open(url, '_blank');

        // 閉じる
        this.hide();
    },

    /* ======================================================
    //
    //   ボックス生成
    //
    // ====================================================== */

    show:function(){
        $('#webgl').show();

        this.changeState(); 

        this.showDetail(); 

        this.isRun = true; 
    },    

    hide:function(){
        $('#webgl').hide();

        this.hideDetail();  

        if(state) state.reset();   

        this.isRun = false;              
    }, 

    build:function(){
        // シーン生成
        this.scene = new THREE.Scene();

        // カメラ生成
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

        // ピクセルパーフェクト
        var h = window.innerHeight;
        var cameraZ = -(h / 2) / Math.tan((this.camera.fov * Math.PI / 180) / 2);
        this.camera.position.set(0, 0, -cameraZ);

        // レンダラー生成
        this.renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);         
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0xffffff, 0);      
        document.getElementById('webgl').appendChild( this.renderer.domElement );

        this.render();  

        $('#webgl').click(this.onClick.bind(this));              
    },    

    render:function(){
        requestAnimationFrame( this.render.bind(this) );

        if(state && this.isRun) state.run();
        
        this.renderer.render(this.scene, this.camera);  
    },

    onClick:function(e){        
        // 閉じる
        this.hide();
    },

    changeState:function(){
        if(state) state.reset();

        // DEBUG
        // stateIndex = 0;

        switch(stateIndex%3)
        {
            case 0:
                state = new State.MotionA.MotionA(this.scene, this.camera, this.boxId);
                break;            
            case 1:
                state = new State.MotionB.MotionB(this.scene, this.camera, this.boxId);
                break;
            case 2:
                state = new State.MotionC.MotionC(this.scene, this.camera, this.boxId);
                break;                                                    
        }

        stateIndex++;
    }          
};

return TopPage;
});
