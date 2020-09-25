<template>
<div class="sign-up">
    <h1>注册</h1>
    <v-text-field v-model="username" label="用户名"></v-text-field>
    <v-text-field v-model="password" type="password" label="密码"></v-text-field>
    <v-text-field v-model="email" label="邮箱"></v-text-field>
    <v-btn color="primary" @click="signUp()">注册</v-btn>
    <v-btn color="primary" @click="$router.push('/')" text>返回登录</v-btn>
</div>
</template>

<script>
//import api from '../api/api'
import router from '../router/index'
export default {
    data() {
        return {
            username: 'leon',
            password: '123456',
            email: '67861960@qq.com',
        }
    },
    methods: {
        signUp() {
            let params = {
                userName: this.username,
                password: this.password,
                email: this.email,
            }
            this.$api.user.signUp(params).then(res => {
                console.log(res)
                this.$notify({
                    title: '成功',
                    message: '注册成功',
                    type: 'success',
                })
                this.$router.push({
                    name: 'Login',
                })
            })
        }
    }
}
</script>

<style scoped>
.sign-up {
    width: 400px;
    text-align: center;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
}
</style>
