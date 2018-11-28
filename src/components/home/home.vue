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
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="users">
                                <i class="el-icon-goods"></i>
                                用户列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-goods"></i>
                                角色列表
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <i class="el-icon-goods"></i>
                                权限列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-goods"></i>
                                商品列表
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <i class="el-icon-goods"></i>
                                分类参数
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <i class="el-icon-goods"></i>
                                商品分类
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-goods"></i>
                                订单列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-goods"></i>
                                数据报表
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
               
           }
            
        },
        // 在vue实例创建完成之前
        beforeCreate() {
            // 获取token
            const token = localStorage.getItem('token')
            console.log(token)
            if (!token) {
                // token 没有 -> 登录
                this.$router.push({ name: 'login' })
            }
            // if token 有 -> 继续渲染组件
        },
    
        
        methods: {
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