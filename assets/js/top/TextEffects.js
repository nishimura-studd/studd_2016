/* ======================================================
//
//   TextEffects - テキストエフェクト
//
// ====================================================== */

define(['_'],
function (_) {

var randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 _-!#$%&=~¥+*?@";

var TextEffects = function(el, str){
    this.el       = el;
    this.str      = str;
    this.strIndex = 0;
    this.strLength;    
    this.timer;  
    this.arr;
    this.targetStr;
    this.randomIndex = 0;
    this.rondomArr = _.shuffle(randomCharacters.split(""));

    this.init();
};

TextEffects.prototype = {

    init:function(){
        this.el = $('#title');

        this.arr = this.str.split("");
        this.strLength = this.arr.length - 1;

        this.startEffect();   
    },

    startEffect:function(){ 
        if(this.strIndex < this.strLength){
            this.targetStr = this.arr[this.strIndex];
            this.timer = setInterval(this.run.bind(this), 1); 
            this.strIndex++; 
        }else{
            this.el.text(this.str);
            this.strIndex = 0;    
            this.el.trigger('animationEnd')                  
        }         
    },

    stopEffect:function(){ 
        clearInterval(this.timer); 
        this.strIndex = 0;          
    },    

    run:function(){   
        var rnd = this.rondomArr[this.randomIndex];
        if(rnd.toLowerCase() != this.targetStr.toLowerCase()){
            var str = this.arr.slice(0, this.strIndex).join("") + rnd;
            this.el.text(str);
            this.randomIndex++;
        }else{
            clearInterval(this.timer); 
            this.randomIndex = 0;
            this.startEffect();            
        }
    },   
};

return TextEffects;
});
