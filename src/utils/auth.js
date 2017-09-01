const uid = 'uid';
const uname = 'uname';
const utype = 'utype';
const shop_name = 'shop_name';
const shop_address = 'shop_address';


export function getUId() {
  return this.$cookie.get(uid);
}

export function getUname() {
    return this.$cookie.get(uname);
}

export function getUtype() {
    return this.$cookie.get(utype);
}

export function getShopname() {
    return this.$cookie.get(shop_name);
}

export function getShopaddress() {
    return this.$cookie.get(shop_address);
}

export function setUId(tokenUid) {
  return this.$cookie.set(uid, tokenUid);
}

export function removeUId() {
  return this.$cookie.remove(uid);
}