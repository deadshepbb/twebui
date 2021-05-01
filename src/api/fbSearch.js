import http from '@/libs/http.js'
// 获取斐波那契数列
export const getRecursive = (params) => {
    return http.ajaxPostFbData("/api/Recursive", params)
}
