/*##################################################################################################
#
# ユーティリティ
#
##################################################################################################*/
define(['_', 'matchMedia', 'moment'],
function(_,   matchMedia,   moment) {

util = {};

//--------------------------------------------------------------------------------------------------
// DateTime
//--------------------------------------------------------------------------------------------------

/**
 * 日付を「YYYY.(M)M.(D)D」の形式に変換
 * @param {number} dateFormatted UNIXタイムスタンプ値
 * @param {string} separator     年月日の区切り文字
 * @return {string} 変換結果
 */
function YMD(dateFormatted, separator) {
    separator = (separator === undefined) ? '.' : separator;
    var newDate = moment(dateFormatted);
    return newDate.format('YYYY' + separator + 'M' + separator + 'D');
}

/**
 * 日付を「YYYY.MM.DD (Day)」形式に変換
 * @param dateFormatted
 * @param {string} dateFormatted (ISO8601形式)
 * @returns {string}
 */
function YMDD(dateFormatted) {
    var date = moment(dateFormatted);
    var ymd = YMD(dateFormatted, '.');
    var days = ['日', '月', '火', '水', '木', '金', '土'];
    return ymd + ' (' + days[date.day()] + ')';
}

function YMDJP(dateFormatted) {
    var newDate = moment(dateFormatted);
    return newDate.format('YYYY' + '年' + 'M' + '月' + 'D' + '日');
}

/**
 * 時刻を「(h)h:mm」の形式に変換(mmはゼロ詰め)
 * @param {number} dateFormatted UNIXタイムスタンプ値
 * @return {string} 変換結果
 */
function HHMM(dateFormatted) {
    var newDate = moment(dateFormatted);
    return newDate.format('H:mm');
}

/**
 * 午前「AM」午後「PM」の形式に変換
 * @param {number} dateFormatted UNIXタイムスタンプ値
 * @return {string} 変換結果
 */
function AMPM(dateFormatted) {
    var newDate = moment(dateFormatted);
    return newDate.format('A');
}

function getWeek(dateFormatted, mode) {
    var newDate = moment(dateFormatted);
    switch (mode) {
    case 'en':
        var w = ['sun','mon','tue','wed','thu','fri','sat'];
        return w[newDate.day()];
    case 'jp':
        var w = ['日','月','火','水','木','金','土'];
        return w[newDate.day()];
    }
    return newDate.day();
}

/* ======================================================
// String
// ------------------------------------------------------ */

/**
 * 文字を省略して…をつける
 * @param str
 * @param maxNum
 * @returns {string}
 */
function truncateString(str, maxNum) {
    if(str.length > maxNum) str = str.substring(0, maxNum-1) + "…";
    return str;
}

/**
 * 文字のエスケープ
 * @param str
 * @returns {string}
 */
function escapeString(val){
  return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, "\\$&");
}
/* ======================================================
// Share
// ------------------------------------------------------ */

/**
 * SNS でシェアする
 * @param {string} sns        "facebook" or "twitter"
 * @param {string} [title]    ツイート文言になるタイトル
 * @param {string} [url]      シェアするURL
 */
function shareToSNS(sns, title, url) {
    // 引数を整える
    var loc = window.location;
    if (!sns) throw 'シェアに使用するSNSを "facebook" "twitter" のいずれかから指定してください';

    if (!title) title = document.title;
    if (!url) url = loc.href;

    switch (sns) {
        case 'facebook':
            url = '//www.facebook.com/share.php?u=' + encodeURIComponent(url);
            break;
        case 'twitter':
            url = '//twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
            break;
    }

    window.open(url, '_popup_' + sns, 'width=800, height=500');
}

//--------------------------------------------------------------------------------------------------
// Device
//--------------------------------------------------------------------------------------------------

/**
 * 横幅判定
 * @return {bool} [true]PCサイズ[false]SPサイズ
 */
function isPC() {
    if (window.cssHelper) {
        var width = cssHelper.getViewportWidth();
        return width >= 769;
    }
    return window.matchMedia('(min-width:769px)').matches;
}

/**
 * UserAgent情報を取得
 * @return {object} UserAgentより各種判定情報を所持するオブジェクトを返却
 */
function uaInfo() {
    var ua  = {};
    ua.name = window.navigator.userAgent.toLowerCase();

    console.log(ua.name);

    ua.isIE      = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
    ua.isSafari  = (ua.name.indexOf('safari') > -1 && ua.name.indexOf('chrome') == -1); 
    ua.isChrome  = (ua.name.indexOf('chrome') > -1 && ua.name.indexOf('edge') == -1);        
    ua.isiPhone  = (ua.name.indexOf('iphone') >= 0);
    ua.isiPod    = (ua.name.indexOf('ipod') >= 0);
    ua.isiPad    = (ua.name.indexOf('ipad') >= 0);
    ua.isiOS     = (ua.isiPhone || ua.isiPod || ua.isiPad);
    ua.isAndroid = (ua.name.indexOf('android') >= 0);
    ua.isTablet  = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));

    if (ua.isIE) {
        ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
        if (ua.verArray) {
            ua.ver = parseInt(ua.verArray[2], 10);
        }
    }
    if (ua.isiOS) {
        ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
        if (ua.verArray) {
            ua.ver = parseInt(ua.verArray[2], 10);
        }
    }
    if (ua.isAndroid) {
        ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
        if (ua.verArray) {
            ua.ver = parseInt(ua.verArray[2], 10);
        }
    }

    return ua;
}

//--------------------------------------------------------------------------------------------------
return util = {
      YMD              : YMD
    , YMDD             : YMDD
    , YMDJP            : YMDJP
    , HHMM             : HHMM
    , AMPM             : AMPM
    , getWeek          : getWeek
    , truncateString   : truncateString
    , escapeString     : escapeString
    , shareToSNS       : shareToSNS
    , isPC             : isPC
    , uaInfo           : uaInfo
};
});
