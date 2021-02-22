import React from 'react'
import ErrorImg from '../image/unauthorized.png';
import './Error401.scss'

export default function Error401() {
    return (
        <div>
            <img className="errorImage" src={ErrorImg} alt=""/>
        </div>
    )
}
