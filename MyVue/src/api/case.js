import axios from './http'

const testcase = {
    //批量新增用例，上传File
    addCaseFile(params){
        return axios('/testCase/file',{
            method:'post',
            data:params,
            headers:{'Content-type':'multipart/form-data'}
            
        })
    },
    //批量新增用例，填写
    addCaseText(params){
        return axios.post('/testCase/text',params)
    },
    //列表查询
    getCaseList(params){
        return axios.get('/testCase/list', params)
    },
    //根据caseid删除
    deleteCase(params){
        return axios.delete('/testCase/'+params.id)
    },
    //修改测试用例
    editCase(params){
        return axios.put('/testCase/',params)
    }
}

export default testcase;