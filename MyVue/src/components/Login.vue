<template>
<div>
    <h1>登录</h1>
    <v-text-field v-model="username" label="用户名"></v-text-field>
    <v-text-field v-model="password" laber="密码" type="password"></v-text-field>
    <v-btn color="primary" @click='signIn()'>登录</v-btn>
    <v-btn color="primary" @click="$router.push('/signUp')" text>注册新用户</v-btn>
</div>
</template>

<script>
import router from '../router/index'
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        signIn() {
            let params = {
                userName: this.username,
                password: this.password
            }
            this.$api.user.signIn(params).then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.data.token)
                this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type: 'success',
                })
                this.$router.push({
                    name: 'Index',
                })
            })
        }
    }
}
</script>

<style scoped>
.login {
    width: 400px;
    text-align: center;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
}
</style>
