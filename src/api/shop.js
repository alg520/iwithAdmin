import $http from '../utils/http';


export function getUserList(){
    return $http.post('/coron-web/user/list',{})
}

export function addUser(item){
    return $http.post('/coron-web/user/add',item)
}

export function getShopList(data){
    return $http.post('/coron-web/shop/list',data)
}

export function addShop(data){
    return $http.post('/coron-web/shop/add',data)
}

export function updateShop(data){
    return $http.post('/coron-web/shop/update',data)
}

export function getRobotByShop(){
    return $http.get('/coron-web/robot/getByShop')
}


export function delShop(shopId){

    var data = {
        id:shopId
    }

    return $http.post('/coron-web/shop/update',data)
}

export function getShopInfo(shopId){

    var params = {
        id:shopId
    }

    return $http.get('/coron-web/shop/getById',params)
}


console.log($http);