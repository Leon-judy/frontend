<template>
<div>
    <v-btn color="primary" @click.stop="addDialog = true">添加Jenkins</v-btn>
    <v-dialog v-model="addDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">添加Jenkins</v-card-title>
            <v-card-text>
                <v-text-field v-model="addItems.name" label="Jenkins名称"></v-text-field>
                <v-text-field v-model="addItems.testCommand" label="测试命令"></v-text-field>
                <v-text-field v-model="addItems.url" label="Jenkins地址"></v-text-field>
                <v-text-field v-model="addItems.userName" label="Jenkins用户名"></v-text-field>
                <v-text-field v-model="addItems.password" label="Jenkins密码" type="password"></v-text-field>
                <v-select v-model="addItems.commandRunCaseType" :items="items" label="选择类型"></v-select>
                <v-text-field v-model="addItems.commandRunCasSuffix" label="文件后缀"></v-text-field>
                <v-text-field v-model="addItems.remark" label="备注"></v-text-field>
                <v-checkbox v-model="addItems.defaultJenkinsFlag" label="设为默认"></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" @click="addJenkins()"> 确认 </v-btn>

                <v-btn color="green darken-1" text @click="addDialog = false">
                    取消
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="tableData" :items-per-page="5" hide-default-footer>
        <template v-slot:[`item.action`]="{item}">
            <v-btn color="success" small @click="editJenkins(item)">编辑</v-btn>
            <v-btn color="error" small @click="deleteJenkins(item)">删除</v-btn>
        </template>
    </v-data-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            headers: [{
                    text: "名称",
                    value: "name",
                },
                {
                    text: "测试命令",
                    value: "testCommand",
                },
                {
                    text: "Jenkins地址",
                    value: "url",
                },
                {
                    text: "备注",
                    value: "remark",
                },
                {
                    text: "操作",
                    value: "action",
                },
            ],
            tableData: [{
                name: "",
                testCommand: "",
                url: "",
                remark: "",
                action: "",
            }, ],
            addItems: {
                name: "Leon",
                testCommand: "cmd",
                url: "192.168.0.1",
                userName: "Leon01",
                password: "123456",
                commandRunCaseType: "1",
                commandRunCasSuffix: ".jtl",
                remark: "jmeter",
                defaultJenkinsFlag: "1",
            },
            addDialog: false,
            jenkinsName: "",
            items: [{
                    text: "文本",
                    value: 1,
                },
                {
                    text: "文件",
                    value: 2,
                },
            ],
        };
    },
    //当页面创建时，执行下面的方法
    created() {
        this.getJenkinsList();
    },
    methods: {
        editJenkins(item) {

        },
        deleteJenkins(item) {
            let params = {
                id: item.id
            }
            this.$api.jenkins.deleteJenkins(params).then(res => {
                this.getJenkinsList()
                this.$notify({
                    title: "成功",
                    message: "已成功删除",
                    type: "success",
                });
            })
        },
        getJenkinsList() {
            this.$api.jenkins.getJenkinsList().then((res) => {
                console.log(res);
                this.tableData = res.data.data.data;
            });
        },

        addJenkins() {
            let params = {
                commandRunCasSuffix: this.addItems.commandRunCasSuffix,
                commandRunCaseType: this.addItems.commandRunCaseType,
                defaultJenkinsFlag: this.addItems.defaultJenkinsFlag ? 1 : 0,
                name: this.addItems.name,
                password: this.addItems.password,
                remark: this.addItems.remark,
                testCommand: this.addItems.testCommand,
                url: this.addItems.url,
                userName: this.addItems.userName,
            };
            this.$api.jenkins.addJenkins(params).then((res) => {
                console.log(res);
                this.$notify({
                    title: "成功",
                    message: "添加成功",
                    type: "success",
                });
                this.close();
                this.getJenkinsList();
            });
        },
        close() {
            this.addDialog = false;
        },
    },
};
</script>

<style scoped>

</style>
