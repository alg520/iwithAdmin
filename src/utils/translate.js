import originJSONP from "jsonp";
import MD5 from "js-md5";
import $ from "jquery";

export function jsonp(url, data, option) {
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export default function getTranslateResult(originLanguage,queryContent) {

  const url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  //APP ID: 20170825000076961
  //密钥: Tpx_Gek5zh5CIJ6OJFOY

  const appid = "20170825000076961";
  const key = "Tpx_Gek5zh5CIJ6OJFOY";
  const salt = new Date().getTime();
  var query = queryContent;
  var str1 = appid + query + salt + key;
  var sign = MD5(str1);
  var from = "zh";
  var to = "jp";
  var to2 = "en";  
  const zh = "zh";
  const en = "en";
  const jp = "jp"; 

  if(originLanguage == zh){
    var t1 = $.ajax({
      url: url,
      type: "get",
      dataType: "jsonp",
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      }
    });

    var t2 = $.ajax({
      url: url,
      type: "get",
      dataType: "jsonp",
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to2,
        sign: sign
      }
    });

    Promise.all([t1,t2]).then(res => {
      console.log("翻译结果",res);
    })
  }

  if(originLanguage == jp){

  }

}
