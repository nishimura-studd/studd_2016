/*##################################################################################################
#
# リクエスト
#
##################################################################################################*/
define(['_'],
function(_) {

var request = function() {
};

request.prototype = {
    getData: function(param) {
        $.ajax({
            url: param.url,
            dataType: 'json',
            success: function(data, dataType) {
                // console.log("success", data);
                if (param.success) {
                    param.success(data);
                }
            },
            error: function(XMLHttprequest, textStatus, errorThrown) {
                console.error('error');
                if (param.error) {
                    param.error();
                }
            }
        });
    }
};

return request;
});
