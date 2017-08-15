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
    if(isSale == 0){
        return '已下架';
    } else if(isSale == 1){
        return '已上架';
    }
}