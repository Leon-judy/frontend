<template>
<div>
    <h1>任务管理</h1>
    <V-data-table :headers="headers" :items="tableData" :items-per-page="5" hide-default-footer>
        <template v-slot:[`item.action`]="{ item }">
            <v-btn color="success" small @click="editCase(item)">编辑</v-btn>
            <v-btn color="error" small @click="deleteCase(item)">删除</v-btn>
        </template>
    </V-data-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                jenkinsID: "",
                name: "",
                caseCount: "",
                remark: "",
                action: "",
            }, ],
            headers: [{
                    text: "jenkinsID",
                    value: "testJenkinsId",
                },
                {
                    text: "名称",
                    value: "name",
                },
                {
                    text: "用例数量",
                    value: "caseCount",
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
        };
    },
    created() {
        this.getTaskList();
    },
    methods: {
        getTaskList() {
            this.$api.tasks.getTaskList().then((res) => {
                console.log("-----------------------------------------------")
                console.log(res);
                this.tableData = res.data.data.data;
            });
        },
    },
};
</script>

<style scoped>
</style>
