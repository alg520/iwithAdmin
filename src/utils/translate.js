import originJSONP from "jsonp";
import MD5 from "js-md5";
import $ from "jquery";
import { Message } from "element-ui";

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

export default function getTranslateResult(originLanguage, queryContent) {
  const url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  //APP ID: 20170825000076961
  //密钥: Tpx_Gek5zh5CIJ6OJFOY

  const appid = "20170825000076961";
  const key = "Tpx_Gek5zh5CIJ6OJFOY";
  const salt = new Date().getTime();
  var query = queryContent;
  var str1 = appid + query + salt + key;
  var sign = MD5(str1);
  var from = "auto";

  var toJP = "jp";
  var toEN = "en";
  var toZH = "zh";

  const zh = "zh2";
  const en = "en";
  const jp = "jp";

  if (query == "") {
  } else {
    let translateJP = $.ajax({
      url: url,
      type: "get",
      dataType: "jsonp",
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: toJP,
        sign: sign
      }
    });

    let translateEN = $.ajax({
      url: url,
      type: "get",
      dataType: "jsonp",
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: toEN,
        sign: sign
      }
    });

    let translateZH = $.ajax({
      url: url,
      type: "get",
      dataType: "jsonp",
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: toZH,
        sign: sign
      }
    });
    Promise.all([translateJP, translateEN, translateZH]).then(res => {
      if (res.error_code == "54000") {
        Message({
          type: "error",
          message: "必填参数为空"
        });
      }
      console.log("直接", res);

      let translateResult = [];
      let item = {};
      res.forEach((value, key) => {
        console.log(value);
        if (value.to == "zh") {
          item.zh = value.trans_result[0].dst;
        }
        if (value.to == "en") {
          item.en = value.trans_result[0].dst;
        }
        if (value.to == "jp") {
          item.jp = value.trans_result[0].dst;
        }
      });

      translateResult.push(item);

      console.log("翻译的结果", translateResult);
    });

    return Promise.all([translateJP, translateEN, translateZH]);
  }
}
