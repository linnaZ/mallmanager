<template>
    <el-container class="home-container">
        <el-header class="home-head">
            <el-row>
                <el-col :span="4">
                    <img src="../../../static/images/logo.png" alt="">
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-light head-title">电商后台管理系统</div>
                </el-col>
                <el-col :span="2">
                   <a class="loginout" @click.prevent="handleSignout()" href="#">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="min-container">
            <!--侧边栏-->
            <el-aside width="200px" class="home-aside">
                <el-menu unique-opened :router="true" class="el-menu">
                    <el-submenu :index="item1.order+''" v-for="(item1,index) in menuList" :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <el-menu-item-group v-for="(item2,index) in item1.children" :key="index">
                            <el-menu-item :index="item2.path">
                                <i class="el-icon-goods"></i>
                                {{item2.authName}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    

                </el-menu>
            </el-aside>
            <el-main class="home-main">
                <!--主要内容视图-->
                <router-view>

                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    
        data() {
           return{
               menuList:[]
           }
            
        },
        // 在vue实例创建完成之前
        // beforeCreate() {
        //     // 获取token
        //     const token = localStorage.getItem('token')

        //     if (!token) {
        //         // token 没有 -> 登录
        //         this.$router.push({ name: 'login' })
        //     }
        //     // if token 有 -> 继续渲染组件
        // },
    
        created(){
            this.getmenus();
        },
        methods: {
            // 获取左侧导航数据
            async getmenus(){
                const res=await this.$http.get('menus')
                console.log(res)
                this.menuList=res.data.data
            },
            handleSignout() {
                // 清除session
                localStorage.clear()
                this.$message.success('退出成功')
                this.$router.push({ name: 'login' })
            }
        }

    
}
</script>
<style>
.home-container {
    height: 100%;
}

.min-container,
.el-menu {
    height: 100%;
}

.home-head {
    background-color: #b3c0d1;
}

.head-title {
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 24px;
    font-family: "微软雅黑";
}

.loginout {
    line-height: 60px;
    color: brown;
    text-decoration: none;
}

.home-aside {
    background-color: #d3dce6;
    height: 100%;
}


/*.home-aside el-menu{
    height: 100%;
}*/

.home-main {
    background-color: #e9eef3;
    height: 100%;
}
</style>