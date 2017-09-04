import originJSONP from 'jsonp'

export default function jsonp(url,data,option){
    return new Promise ((resolve,reject) => {
        originJSONP(url,option,(err,data) => {
            if(!err){
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

import jsonp from '@utils/translate'

export function getTranslateResult(){
    const url ='';
    const commonParams = {};
    const data = Object.assign({},commonParams,{

    })

    return jsonp(url,data,option);
}