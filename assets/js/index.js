/* ======================================================
//
//   index - エントリーポイント
//
// ====================================================== */

// トップページ  
var topPage;

require(['_', './top/TopPage'], 
function(_,          TopPage) {   
    //WEBGL判定
    if(!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }else{
        // トップページコントローラ
        topPage = new TopPage();          
    } 
});