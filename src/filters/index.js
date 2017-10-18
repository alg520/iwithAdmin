//过滤菜品类型
export function parseProductType(itemType){    
    if(itemType == 1){
        return '单点';
    } else if(itemType == 2){
        return '套餐';
    } else if (itemType == 3){
        return '配菜';
    }
}

//过滤商品售卖状态
export function parseIsSale(isSale){
    if(isSale == 1){
        return '已上架';
    } else if(isSale == 0){
        return '未上架';
    }
}

//过滤语言类型
export function languageType(language){    
    
    if(language === 0){
        return '中文';
    } else if(language === 1){
        return 'ENGLISH';
    } else if(language === 2){
        return '日本語'
    }
}

//过滤itemType single  mutli
export function itemToType(itemType){
    if(itemType == 'single'){
        return '单选'
    } else {
        return '多选'
    }
}

// japan address JSON.parse
export function addressParse(address){    
        
    if(address.startsWith("{",0) && address.includes('}')){        
        var addressObj = JSON.parse(address);
        return `${addressObj.province} ${addressObj.city} ${addressObj.street} ${addressObj.address}`
    } else {
        return address;
    }
   
}