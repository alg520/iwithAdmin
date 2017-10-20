<template>
    <div class="orderDetail-page">
        <el-row>
            <el-col :sm="24" :md="24" :lg="24">
                <div class="base-info">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3>交易基本信息</h3>
                        </el-col>
                        <el-col :span="12">
                            <p>交易类型：                                
                                <span>{{ tradeInfo.tradeType| tradeType}}</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>交易ID:
                                <span v-text="tradeInfo.tradeId"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>交易状态：                                
                                <span>{{ tradeInfo.tradeStatus| orderStatus}}</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>创建时间：
                                <span> {{tradeInfo.createdTime}}</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>原价：
                                <span v-text="tradeInfo.originalAmount"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>折后价：
                                <span v-text="tradeInfo.paidAmount"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>机器人ID:
                                <span v-text="tradeInfo.robotId"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>税率:
                                <span v-text="tradeInfo.taxAmount"></span>
                            </p>
                        </el-col>
                        <el-col :span="24">
                            <h3>订单信息</h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="orders" style="width: 100%">
                                <el-table-column type="expand">
                                    <template scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">                                            
                                            <el-form-item label="店铺 ID">
                                                <span>{{ props.row.shopId }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单类型">
                                                <span>{{ props.row.orderType }}</span>
                                            </el-form-item>
                                            <el-form-item label="属性列表">
                                                <el-tag v-for="attr in attrs" :key="attr.attrId">{{attr.name.zh}}</el-tag>
                                            </el-form-item>
                                            <el-form-item label="配菜列表">
                                                <el-tag v-for="item in sideDishs" :key="item.itemId">{{item.itemNameObject.zh}}</el-tag>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品 ID" prop="itemId">
                                </el-table-column>
                                <el-table-column label="商品名称" prop="name.zh">
                                </el-table-column>
                                <el-table-column label="描述" prop="picUrl">
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
            console.log(this.middleLocal);
            this.tradeInfo = this.middleLocal.trade;
            this.orders = this.middleLocal.orders;

            console.log(this.middleLocal.orders);

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

            console.log("循环好得属性数组",newAttrs);

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

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 45%;
}
</style>
