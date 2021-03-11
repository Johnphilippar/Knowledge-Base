import interceptor from './-interceptor'

export const getRecentUpload = async () => {
    return await interceptor.authAxios().get('/KnowledgeBase')
}
export const getArticleDescription = async params => {
    return await interceptor.authAxios().get('/KnowledgeBase/ArticleDescription' , {params})
}

export const postArticle = async param => {
    return await interceptor.authAxios().post('/KnowledgeBase' , param)
}
export const putArticle = async param => {
    return await interceptor.authAxios().put('/KnowledgeBase' , param)
}
export const deleteArticle = async params => {
    return await interceptor.authAxios().delete('/KnowledgeBase' , {params})
}





