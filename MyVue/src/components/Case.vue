<template>
<div style="margin: 20px">
    <v-row>
        <v-btn color="primary" class="d-block pa-2 white--text" @click="openDialog()">添加用例</v-btn>
        <div class="mx-4 hidden-sm-and-down"></div>
        <v-btn color="primary" class="d-block pa-2 white--text" @click="addTask = true">生成任务</v-btn>
    </v-row>
    <!--生成任务对话框-->
    <v-dialog v-model="addTask" max-width="400px">
        <v-card>
            <v-card-title class="headline">生成任务</v-card-title>
            <v-card-text>
                <v-text-field v-model="taskItems.taskName" label="任务名称"></v-text-field>
                <v-text-field v-model="taskItems.taskRemark" label="备注"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="addTestTask()"> 确认 </v-btn>

                <v-btn color="primary" text @click="addTask = false"> 取消 </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!--添加用例对话框-->
    <v-dialog v-model="addDialog" max-width="400px">
        <v-card>
            <v-card-title class="headline" v-text="dialogTitle">添加用例</v-card-title>
            <v-card-text>
                <v-text-field v-model="caseName" label="名称"></v-text-field>
                <v-select v-model="selected" :items="additems" label="选择用例类型"></v-select>
                <v-textarea v-if="selected == 1" v-model="caseData" outlined name="input-7-4" label="输入文本" value="用例步骤、预期结果"></v-textarea>
                <v-file-input v-else-if="selected == 2" v-model="file" label="请选择您的文件"></v-file-input>
                <v-text-field v-model="remark" label="备注"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <!--按钮放在右边-->
                <v-spacer></v-spacer>
                <v-btn color="primary" v-if="dialogTitle == '添加用例'" @click="saveCase()"> 确认 </v-btn>
                <v-btn color="primary" v-else @click="saveEidtCase()">
                    确认编辑
                </v-btn>
                <v-btn color="primary" text @click="addDialog = false"> 取消 </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <V-data-table v-model="selectedCases" show-select :headers="headers" :items="tableData" :items-per-page="5" hide-default-footer>
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
            dialogTitle: "",
            addTask: false,
            taskItems: {
                taskName: "",
                taskRemark: "",
            },
            selectedCases: [],
            file: null,
            editCaseId: "",
            caseData: "",
            caseName: "",
            tableData: [{
                caseName: "",
                caseData: "",
                remark: "",
                action: "",
            }, ],
            headers: [{
                    text: "名称",
                    value: "caseName",
                },
                {
                    text: "数据",
                    value: "caseData",
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
            remark: "",
            addDialog: false,
            selected: "",
            additems: [{
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
        this.getCaseList();
    },
    methods: {
        openDialog() {
            this.dialogTitle = "添加用例";
            this.addDialog = true;
        },
        addTestTask() {
            let casesId = []
            for (let i = 0; i < this.selectedCases.length; i++) {
                // Vue往数组中加入数据用push
                casesId.push(this.selectedCases[i].id)
                console.log("-----------------------------------------------")
                console.log(casesId)
            }
            let params = {
                "caseIdList": casesId,
                "testTask": {
                    "name": this.taskItems.taskName,
                    "remark": this.taskItems.taskRemark,
                    "testJenkinsId": 103,
                },
            };
            this.$api.tasks.addTask(params).then((res) => {
                console.log(res);
                this.$notify({
                    title: "成功",
                    message: "生成任务成功",
                    type: "success",
                });
                this.$router.push('/task')
            });
        },
        deleteCase(item) {
            let params = {
                id: item.id,
            };
            this.$api.testcase.deleteCase(params).then((res) => {
                console.log(res);
                this.$notify({
                    title: "成功",
                    message: "删除用例成功",
                    type: "success",
                });
                this.getCaseList();
            });
        },
        getCaseList() {
            this.$api.testcase.getCaseList().then((res) => {
                console.log(res);
                this.tableData = res.data.data.data;
            });
        },
        saveCase() {
            if (this.selected == 1) {
                let params = {
                    caseName: this.caseName,
                    caseData: this.caseData,
                    remark: this.remark,
                };
                this.$api.testcase.addCaseText(params).then((res) => {
                    console.log(res);
                    this.$notify({
                        title: "成功",
                        message: "添加用例成功",
                        type: "success",
                    });
                    this.close();
                    this.getCaseList();
                });
            } else if (this.selected == 2) {
                let params = new FormData();
                params.append("caseFile", this.file);
                params.append("caseName", this.caseName);
                params.append("remark", this.remark);
                params.append("caseData", this.caseData);
                this.$api.testcase.addCaseFile(params).then((res) => {
                    console.log(res);
                    this.$notify({
                        title: "成功",
                        message: "添加用例成功",
                        type: "success",
                    });
                    this.close();
                    this.getCaseList();
                });
            }
        },
        editCase(item) {
            // console.log("-----------------------------------------------")

            this.addDialog = true;
            this.dialogTitle = "编辑用例";
            // console.log(this.dialogTitle)
            this.editCaseId = item.id
            // console.log(this.editCaseId)
            this.caseName = item.caseName
            this.caseData = item.caseData
            this.remark = item.remark

        },
        saveEidtCase() {
            let params = {
                id: this.editCaseId,
                caseName: this.caseName,
                caseData: this.caseData,
                remark: this.remark,
            };
            this.$api.testcase.editCase(params).then((res) => {
                console.log("-----------------------------------------------")
                console.log(res);
                this.$notify({
                    title: "成功",
                    message: "修改用例成功",
                    type: "success",
                });
                this.close();
                this.getCaseList();
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
