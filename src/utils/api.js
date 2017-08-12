let api = {
  //时段管理
  shopTimeDuration: {
    list: "/coron-web/shopTimeDuration/list",
    add: "/coron-web/shopTimeDuration/add",
    update: "/coron-web/shopTimeDuration/update",
    del: "/coron-web/shopTimeDuration/del",
    getById: "/coron-web/shopTimeDuration/getById"
  },

  //商品管理
  item: {
    list: "/coron-web/item/list",
    add: "/coron-web/item/add",
    update: "/coron-web/item/update",
    getById: "/coron-web/item/getById",
    del: "/coron-web/item/del",
    switchSale: "/coron-web/item/switchSale",
    switchPosition: "/coron-web/item/switchPosition",
    getSideDishes: "/coron-web/item/getSideDishes"
  },

  //商品目录

  catalog: {
    list: "/coron-web/catalog/list",
    getCatalogs: "/coron-web/catalog/getCatalogs",
    del: "/coron-web/catalog/del",
    add: "/coron-web/catalog/add",
    update: "/coron-web/catalog/update"
  },

  //商品属性å

  itemAttr: {
    list: "/coron-web/itemAttr/list",
    getItemAttrs: "/coron-web/itemAttr/getItemAttrs",
    del: "/coron-web/itemAttr/del",
    add: "/coron-web/itemAttr/add",
    update: "/coron-web/itemAttr/update"
  }
};

export default {
  api: api
};
