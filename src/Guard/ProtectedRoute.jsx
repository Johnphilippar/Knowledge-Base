import React, { useEffect , useState} from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import * as packageConfig from '../../package.json';
import {validateAppAPI} from '../API/AuthenticationAPI'

export default function ProtectedRoute({ AuthenticateUser, component: Component, ...rest}) {
    let location = useLocation();
    let query = new URLSearchParams(location.search);
    let TOKEN = query.get("token");

    const [getUserData , setGetUserData] = useState('')

    useEffect(() => {
        SaveUserToken()
            .then(() => {
                validateAppAPI({
                    securityToken : TOKEN,
                    appID : packageConfig.configuration.AppId
                }).then((res) => {
                    setGetUserData(res.data)
                    console.log(res.data)
                })
                // AuthenticateUser({
                //     securityToken : TOKEN,
                //     appID : packageConfig.configuration.AppId
                // })

            })
    }, []);

    const SaveUserToken = () => new Promise((resolve, reject) => {
        localStorage.setItem("token", TOKEN);
        resolve()
    })

    const isAuthorized = () => {
        return window.localStorage.getItem('token') !== "";
    }

    return (
        <Route {...rest} render={
            props => {
                return <Component {...props} currentUser={getUserData}/>
            }
        }/>
    );
}

// const mapStateToProps = (state, props) => {
//     return {
//         props: {
//             ...props,
//             currentUser: state.authentication
//         }
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         AuthenticateUser: param => dispatch(AuthenticateUser(param))
//     }
// }
