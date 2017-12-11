<template>
    <div class="orderDetail-page">
        <el-row>
            <el-col :sm="24" :md="24" :lg="24">
                <div class="base-info">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3><span>{{$t('shop.trade.info')}}</span></h3>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.type')}}:</span>
                                <span v-text="tradeInfo.tradeType"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.ID')}}:</span>
                                <span v-text="tradeInfo.tradeId"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.status')}}:</span>
                                <span>
                                    {{tradeInfo.tradeStatus | orderStatus}}
                                </span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.time')}}:</span>
                                <span> {{tradeInfo.createdTime}}</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.price')}}:</span>
                                <span v-text="tradeInfo.originalAmount"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.paidAmount')}}:</span>
                                <span v-text="tradeInfo.paidAmount"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.robotId')}}:</span>
                                <span v-text="tradeInfo.robotId"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>
                                <span>{{$t('shop.trade.taxAmount')}}:</span>
                                <span v-text="tradeInfo.taxAmount"></span>
                            </p>
                        </el-col>
                        <el-col :span="24">
                            <h3><span>{{$t('shop.trade.orderInfo')}}</span></h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="orders" style="width: 100%">
                                <el-table-column type="expand">
                                    <template scope="props">
                                        <el-form label-position="left" inline class="order-table-expand">                                            
                                            <el-form-item :label="$t('shop.order.shopId')">
                                                <span>{{ props.row.shopId }}</span>
                                            </el-form-item>
                                            <el-form-item :label="$t('shop.order.type')">
                                                <span>{{ props.row.orderType }}</span>
                                            </el-form-item>
                                            <el-form-item :label="$t('shop.order.num')">
                                                <span>{{ props.row.itemNum }}</span>
                                            </el-form-item>
                                            <el-form-item :label="$t('shop.order.totalPaidPrice')">
                                                <span>{{ props.row.totalPaidPrice }}</span>
                                            </el-form-item>
                                            <el-form-item :label="$t('shop.order.attrList')">
                                                <el-tag v-for="attr in attrs" :key="attr.attrId">{{attr.name.zh}}</el-tag>
                                            </el-form-item>
                                            <el-form-item :label="$t('shop.order.sideDishList')">
                                                <el-tag v-for="item in sideDishs" :key="item.itemId">{{item.itemNameObject.zh}}</el-tag>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('shop.order.itemId')" prop="itemId">
                                </el-table-column>
                                <el-table-column :label="$t('shop.order.itemName')" prop="name.zh">
                                    <template scope="scope">
                                        <span>{{scope.row.name.zh}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('shop.order.originalPrice')" prop="itemOriginalPrice">
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Lockr from 'lockr';
import axios from 'axios';
export default {
    data() {
        return {
            tradeInfo: '',
            orders: [],
            attrs: [],
            sideDishs: []
        }
    },
    computed: {
        middleLocal() {
            return Lockr.get("tradeDetailInfo");
        }
    },
    created() {
        this.getDetailInfo();
    },
    methods: {
        getDetailInfo() {            
            this.tradeInfo = this.middleLocal.trade;
            this.orders = this.middleLocal.orders;            

            this.attrs = this.getAttrs(this.middleLocal.orders);
            this.sideDishs = this.getSideDish(this.middleLocal.orders);
        },

        //属性列表和配菜列表的逻辑还需要调整修改
        getAttrs(array) {

            let newAttrs = [];
            array.forEach((item1, index1) => {

                item1.attrGroups.forEach((item2, index2) => {

                    item2.attrs.forEach((item3, index3) => {
                        if (item3.selected) {
                            newAttrs.push(item3);
                        }
                    })

                })

            })
            
            return newAttrs;
        },

        getSideDish(array) {
            let newDish = [];
            array.forEach((item1, index1) => {
                item1.itemGroupList.forEach((item2, index2) => {

                    item2.items.forEach((item3, index3) => {
                        if (item3.selected) {
                            newDish.push(item3);
                        }
                    })

                })

            })

            return newDish;
        }
    }
}
</script>

<style>
.orderDetail-page {
    padding: 15px 10px;
}

.orderDetail-page .cell {
    text-align: center;
}

.textCenter {
    text-align: center;
}

.order-table-expand {
    font-size: 0;
}

.order-table-expand label {
    width: 120px;
    color: #99a9bf;
    text-align: right;
}

.order-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 45%;
}
</style>
