/**
 * @description 小说相关操作
 */

export function getSearchRed(key,res){
    var substr="/("+key+")/g"
    return res.replace(eval(substr),"<span style='color:red;'>"+key+"</span>")
}