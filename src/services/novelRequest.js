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
    }
}

export default novelRequest