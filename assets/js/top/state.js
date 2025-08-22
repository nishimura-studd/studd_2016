/* ======================================================
//
//   templates - 読み込むテンプレートをまとめる
//
// ====================================================== */

define([
     './state/MotionA'
    ,'./state/MotionB'
    ,'./state/MotionC'            
],
function (
     MotionA  
    ,MotionB 
    ,MotionC      
) {

    return {
         MotionA : MotionA
        ,MotionB : MotionB
        ,MotionC : MotionC                     
    };
});
