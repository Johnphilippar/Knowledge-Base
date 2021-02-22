import interceptor from './-interceptor'

export const getRecentUpload = async () => {
    return await interceptor.authAxios().get('/TestDB')
}
export const getArticleDescription = async params => {
    return await interceptor.authAxios().get('/TestDB/ArticleDescription' , {params})
}

export const postArticle = async param => {
    return await interceptor.authAxios().post('/TestDB' , param)
}
export const putArticle = async param => {
    return await interceptor.authAxios().put('/TestDB' , param)
}
export const deleteArticle = async params => {
    return await interceptor.authAxios().delete('/TestDB' , {params})
}





