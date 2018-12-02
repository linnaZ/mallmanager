<template>
    <el-card shadow="always" class="card">
        <!--面包屑    /首页/用户管理/用户列表-->
        <my-bread level1="用户管理" level2='用户列表'></my-bread>

        <!--搜索框-->
        <el-input placeholder="请输入内容" class="search" clearable @clear="loadUserList()">
            <el-button slot="append" icon="el-icon-search" @click="searchUserList()"></el-button>
        </el-input>
        <el-button type="success" plain @click="addGoods()">添加商品</el-button>

        <!--表格-->
        <el-table :data="goodslist" style="width: 100%" height="380px" border class="goods-table"> 
            <el-table-column label="#" width="50" type="index">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="400">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格" width="100">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="100">
            </el-table-column>
            <el-table-column label="创建日期" width="150">
                <!--在差值表达式中使用过滤器格式化日期-->
                <!--el-table-column标签中必须使用字符串，若要使用其他格式则外面包裹一个template标签-->
                <!--使用slot-scope来获取上级标签绑定的原始数据userlist-->
                <!--slot-scope的值可以是任意他可以自动找原始数据，通常为scope -->
                <!--scope有个属性row他表示每一项-->
                <template slot-scope="scope">
                    {{scope.row.creat_time | fmtData}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle plain size="mini" @click="showEditDialog(scope.row)"></el-button>
                    <el-button type="success" icon="el-icon-check" circle plain size="mini" @click="showRolDialog(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="deleteUser(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
         <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
         :current-page='pagenum' :page-sizes="[2, 4, 6, 8]" 
         :page-size='pagesize' layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

    </el-card>
</template>

<script>
export default {
    data(){
        return {
           goodslist:[],
           pagenum: 1,
            pagesize: 4,
            total: 1,
            query: '',
        }
    },
    mounted(){
        this.getAllGoods()
    },
    methods:{
        // 添加商品
        addGoods(){
            // 添加新的路由
            this.$router.push({name:'goodsadd'})

        },
        async getAllGoods(){
            const res=await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            this.goodslist=res.data.data.goods
            this.total=res.data.data.total
        },
        // 当页面数量发生改变
        handleSizeChange(val) {
            console.log(val)
            this.pagesize = val
            this.pagenum = 1
            this.getAllGoods()
        },
        // 当前页发生改变时触发                                    
        handleCurrentChange(val) {
            console.log(val)
            this.pagenum = val
            this.getAllGoods()
        },
    }

}
</script>

<style>
.card {
    height: 100%
}

.search {
    width: 300px;
    margin-top: 18px;
}
.goods-table{
    margin-top: 10px;
}
</style>
