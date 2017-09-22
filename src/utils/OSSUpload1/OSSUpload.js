/**
 *
 * browser-md5-file Javascript Library v 1.0
 *
 * https://github.com/forsigner/browser-md5-file | Released under MIT license
 *
 *
 * OSS上传类
 * 封装了后端断点续传的调用
 * 封装了文件分割 和 md5获取
 * 1.获取文件md5
 * 2.通过md5查询文件是否已经上传
 * 3.如果上传过了 判断是否上传完
 *      true: 上传完则 return
 *      false: 未上传完 获取uploadId 并且查询最新的partId 来进行断点续传
 * 4.上传完成每一块都回调callback 通知调用者
 *
 */


// 引用资源
//document.write('<script language=javascript src=\'lib/browser-md5-file.js\'></script>');
import './lib/browser-md5-file';



// 请求方式
const POST = 'POST';
const GET = 'GET';
// 每次上传文件part大小 (默认1mb)
const PART_SIZE = 1024 * 1024;
// 外网域名
const HOST = 'http://localhost:9010';
// 判断是否可以上传OTA
const OTAROM_ADD = HOST + '/coron-web/otarom/addOtaRom';
// 追加上传文件接口OTA
const OTAROM_APPEND = HOST + '/coron-web/otarom/appendOtaRom';
// 判断是否可以上传APK
const APK_ADD = HOST + '/coron-web/apk/addApk';
// 追加上传文件接口APK
const APK_APPEND = HOST + '/coron-web/apk/appendApk';
// 真实调用地址
let ADD = null;
let APPEND = null;
// 文件md5
let FILE_MD5 = null;
// 文件名
let FILE_NAME = null;
// 文件总大小
let FILE_SIZE = null;
// 已上传文件大小 byte 字节
let UPLOAD_SIZE = null;
// 分割文件的总块数
let PART_COUNT = null;
// 需要从第几块开始上传
let START_PART = null;
// 当前上传的文件
let FILE = null;
// 判断当前是 上传ota 还是 apk 1:ota 2:apk
let TYPE = null;
// ajax发起者
let xhr = null;

// 随便写一个事件存储中心吧
let handles = [];


/**
 * OSSUpload 上传类
 * @param {file} file 文件流
 * @param {int} type 1:ota 2:apk
 * @constructor
 */
export default function OSSUpload(file, type) {
    
    if (file === null || file === undefined) {
        throw '文件不能为空!';
    }
    if (type === null || type === undefined) {
        throw '上传类型不能为空!';
    }
    console.log(`创建句柄`);
    FILE = file;
    /** @namespace file.name */
    FILE_NAME = file.name;
    TYPE = type;
    if (type === 1) {
        ADD = OTAROM_ADD;
        APPEND = OTAROM_APPEND;
    } else if (type === 2) {
        ADD = APK_ADD;
        APPEND = APK_APPEND;
    }
}

OSSUpload.prototype.init = function() {
    console.log(`init`);
    initMd5();
    FILE_SIZE = getSize();
    PART_COUNT = getPartCount();
    console.log(`md5: ${FILE_MD5}`);
    console.log(`size: ${FILE_SIZE}`);
    console.log(`count: ${PART_COUNT}`);
};

OSSUpload.prototype.start = function(data) {
    let headers = [
        {'Content-Type' : 'application/json'}
    ];

    data.md5 = FILE_MD5;
    data.fileSize = FILE_SIZE;

    httpRequest(ADD, POST, headers, JSON.stringify(data), false, function() {
        console.log(xhr);
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            console.log(`result: ${xhr.responseText}`);
            let resultObj = JSON.parse(xhr.responseText);
            if (resultObj.status) {
                /** @namespace resultObj.entry */
                let uploadSize = resultObj.entry;
                if (uploadSize === 0) {
                    UPLOAD_SIZE = 0;
                } else {
                    UPLOAD_SIZE = uploadSize;
                }
                START_PART = getStartPart();
                startAppend();
            } else {
                console.error(`error: ${resultObj}`);
            }

        }
    });
};

OSSUpload.prototype.on = function (eventName, callback) {
    handles[eventName] = callback;
};

function emit (eventName) {
    if(handles[arguments[0]]){
        handles[arguments[0]](arguments[1]);
    }
}

/**
 *
 * 开始追加上传
 */
function startAppend() {
    // 从第一块开始上传
    if (START_PART === 0) {
        START_PART = 1;
    }
    while (START_PART <= PART_COUNT) {

        let startIndex = (START_PART - 1) * PART_SIZE;
        let endIndex = startIndex + PART_SIZE;
        let uploadFilePart = null;

        if (START_PART === PART_COUNT) {
            uploadFilePart = FILE.slice(startIndex);
        } else {
            uploadFilePart = FILE.slice(startIndex, endIndex);
        }

        let data = new FormData();
        data.append('md5', FILE_MD5);
        data.append('fileName', FILE_NAME);
        data.append('file', uploadFilePart);

        httpRequest(APPEND, POST, null, data, false, function() {

        });
        // 不能使用闭包回调
        console.log(xhr);
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            console.log(`result: ${xhr.responseText}`);
            let resultObj = JSON.parse(xhr.responseText);
            if (resultObj.status) {
                emit('append', START_PART / PART_COUNT);
            } else {
                console.error(`error: ${resultObj}`);
                return;
            }

        }

        START_PART++;
    }
    emit('finish');
}

/**
 * 初始化md5值 强行用事件把异步转为同步
 */
function initMd5() {

    browserMD5File(FILE, function (err, md5) {
        FILE_MD5 = md5;
        emit('md5', FILE_MD5);
    });
    
}

function getSize() {
    return FILE.size;
}

function getPartCount() {
    let partCount = 0;
    if (FILE_SIZE < PART_SIZE) {
        partCount = 1;
    } else {
        if (FILE_SIZE % PART_SIZE === 0) {
            partCount = FILE_SIZE / PART_SIZE;
        } else {
            partCount = parseInt(FILE_SIZE / PART_SIZE) + 1;
        }
    }
    return partCount
}

function getStartPart() {
    let startPart = 0;
    if (UPLOAD_SIZE === 0) {
        return startPart;
    }
    if (UPLOAD_SIZE < PART_SIZE) {
        return startPart;
    }
    return (UPLOAD_SIZE / PART_SIZE);
}

/**
 *
 * @param {string} url
 * @param {string} method
 * @param {Object} headers
 * @param {Object} data
 * @param sync 是否异步 true:异步 false:同步
 * @param {Function} callback
 */
function httpRequest(url, method, headers, data, sync, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = callback;
    xhr.open(method, url, sync);// 之所以关闭异步，是为了防止文件块送达服务器的顺序出错
    // 设置请求头 打开连接才能设置头
    if (headers !== null && headers !== undefined) {
        if (headers instanceof Array) {
            for (let i = 0; i < headers.length; i++) {
                for (let key in headers[i]) {
                    console.log(`key: ${key} value: ${headers[i][key]}`);
                    xhr.setRequestHeader(key, headers[i][key]);
                }
            }
        }
    }
    xhr.send(data);// 把打包的数据发送
    return xhr;
}