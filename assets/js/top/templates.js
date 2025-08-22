/* ======================================================
//
//   templates - 読み込むテンプレートをまとめる
//
// ====================================================== */

define([
    '_',
    'text!./templates/work.html'        
],
function (
    _,
    workTmpl    
) {

    return {
        workTmpl                 : _.template(workTmpl)      
    };
});
