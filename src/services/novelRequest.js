import request from './request'
const novelRequest = {
    /**
     * 搜索小说
     * @param {*} params 
     * @returns 
     */
    get: async function (url,params) {
        return request({
            url,
            params,
            method: 'get'
        })
    },
    post: async function(url, data){
        return request({
            url,
            data,
            method:'post'
        })
    }
}

export default novelRequest