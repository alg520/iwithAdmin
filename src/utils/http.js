import axios from 'axios';
import { Message } from 'element-ui';


//创建 axios 实例
const http = axios.create({
    baseURL: process.env.BASE_API,
    timeout:5000
});

//request 拦截器
http.interceptors.request.use(config => {
    return config;
},error => {
    return Promise.reject(error);
})

//response 拦截器
http.interceptors.response.use(response => {
    return  response;
},error => {
    return Promise.resolve(error);
})

// remove 拦截器
//http.interceptors.request.eject(myInterceptor);

function checkStatus(response){
    //loading
    //如果状态码正常，则直接返回数据
    if(response && response.status === 200 || response.status === 304 || response.status === 400){
        return response;
        //如果不需要除了data 之外的数据 可直接返回过滤后的数据        
    }

    return {
        status:-404,
        msg:'网络异常'
    }
}

function checkCode(res) {
    //如果 code 异常（这里包括网络错误，服务器错误，后端抛出的错误),可以弹出一个错误提示告诉用户
    if(res.status === -404){
        alert(res.msg);
    }

    if(res.data && (!res.data.success)){
        alert(err.data.error_msg);
    }

    return res;
}

export default {
    post(url,data) {
        return axios({
            method:'post',
            url,
            data:data
        }).then(
            (response) => {
                return checkStatus(response);
            }
        ).then(
            (res) => {
                return checkCode(res);
            }
        )
    },

    get(url,params) {
        return axios({
            method:'get',
            url,
            params
        }).then(
            (response) => {
                return checkStatus(response);
            }
        ).then(
            (res) => {
                return checkCode(res);
            }
        )
    }
};




export default http;



