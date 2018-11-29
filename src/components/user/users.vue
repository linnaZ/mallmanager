<template>
    <el-card shadow="always" class="card">
        <!--面包屑    /首页/用户管理/用户列表-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--搜索框-->
        <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="loadUserList()">
            <el-button slot="append" icon="el-icon-search" @click="searchUserList()"></el-button>
        </el-input>
        <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>

        <!--表格-->
        <el-table :data="userlist" style="width: 100%">
            <el-table-column label="#" width="100%" type="index">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="150">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="150">
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
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle plain size="mini"></el-button>
                    <el-button type="success" icon="el-icon-check" circle plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='pagenum' :page-sizes="[2, 4, 6, 8]" :page-size='pagesize' layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!--添加用户的对话框-->
        <el-dialog title="添加新用户" :visible.sync="dialogFormVisible" >
            <el-form :model="form">
                <el-form-item label="用户名" label-width="140">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="140">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="140">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="140">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>

                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduserList()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {

    data() {
        return {
            query: '',
            userlist: [],
            pagenum: 1,
            pagesize: 4,
            value: true,
            total: 1,
            form:{
                username:'',
                password:'',
                email:'',
                mobile:''

            },
            dialogFormVisible:false
        }
    },


    created() {
        this.getUserList()
    },


    methods: {
        // 添加新用户
        async adduserList(){
            const res= await this.$http.post('users',this.form)
                console.log(res)
                const {data,meta:{msg,status}}=res.data
                // 如果状态码为201 提交成功
                if(status===201){
                     this.$message.success(msg);
                    this.dialogFormVisible=false

                }else if(status===400){
                     this.$message.error(msg);
                }

        },
        // 点击搜索框的清除按钮触发
        loadUserList() {
            this.getUserList()
        },
        // 搜索框
        searchUserList() {
            this.getUserList()
        },

        // 每页条数改变触发的方法
        handleSizeChange(val) {
            console.log(val)
            this.pagesize = val
            this.pagenum = 1
            this.getUserList()
        },
        // 当前页发生改变时触发                                    
        handleCurrentChange(val) {
            console.log(val)
            this.pagenum = val
            this.getUserList()
        },
        // 获取用户数据
        async getUserList() {
            // 需要授权的API需要在请求头设置必须在请求头中使用 Authorization 字段提供 token 令牌
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http
                .get(`/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const { data, meta: { msg, status } } = res.data
            if (status === 200) {
                this.userlist = data.users
                this.total = data.total
            }
        }
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
</style>