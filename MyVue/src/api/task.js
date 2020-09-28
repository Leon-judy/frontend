import axios from './http'

const tasks = {
    //添加任务
    addTask(params){
        return axios.post('/task',params)
    },
    //列表查询
    getTaskList(params){
        return axios.get('/task/list', params)
    },
    //删除任务
    deleteTask(params){
        return axios.delete('/task/'+params.id)
    },
    //编辑任务
    editTask(params){
        return axios.put('/task/',params)
    }
}

export default tasks;