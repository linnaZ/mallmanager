<template>
    <div class="login-wrap">

        <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-button class="login-button" type="primary" @click="handelLogin()">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {

            formData: {
                username: '',
                password: ''
            }
        };
    },

    methods: {
        // 将异步操作改为看起来像同步操作  es6新特性
        async handelLogin() {
            // 只有执行完下行代码取得结果才执行后面的代码
           const res=await this.$http.post('login', this.formData)
                    //   console.log(res)  
                    const {data,meta:{status,msg}}=res.data
                    if (status === 200) {
                        this.$router.push({ name: 'home' })
                        this.$message.success(msg);
                        // 登录成功后将后天返回的data中token值存到localStorage
                        localStorage.setItem('token',data.token)
                    }else{
                        this.$message.error(msg);
                    }
                
        }
    }
}
</script>
<style>
.login-wrap {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {

    width: 400px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px
}

.login-button {
    width: 100%;
    margin-top: 20px;
}

el-input {
    width: 100%;
}
</style>
