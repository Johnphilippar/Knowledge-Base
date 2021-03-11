import interceptor from './-interceptor'

export const getComments = async params => {
    return await interceptor.authAxios().get('/Comment' , {params})
}

export const postComment = async param => {
    return await interceptor.authAxios().post('/Comment', param)
}