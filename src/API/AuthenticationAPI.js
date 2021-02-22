import interceptor from './-interceptor'

export const validateAppAPI = async param => {
    return await interceptor.authenticationAxios().post('/Authentication/ValidateApps' , param)
}

// CALL API IN ONCE NA MAG 401 IRERETURN AS UNAUTHORIZED 
// URL NG PROJECT , LALAGYAN NG TOKEN , YUN YUNG IGEGET ILALAGAY SA LOCAL STORAGE.
// URL MAGKAKAROON NG TOKEN DON TAS SASAVE SA LOCAL STORAGE
// TAS DOON GEGET NG MGA DATA SA API