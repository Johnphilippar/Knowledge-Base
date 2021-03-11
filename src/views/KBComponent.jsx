import React, { useState, useEffect } from 'react';
import './KBComponent.scss';
import { Link } from 'react-router-dom';
import config from '../../package.json';
import BarcLogo from '../image/BARC-LOGO.svg';
import KnowledgeBaseIcon from '../image/Knowledge-Base.svg';
import tpIcon from '../image/tp-logo.png';
import KBMainData from '../components/KBMainData';
import Modal from 'react-modal';
import KBForm from '../components/KBForm';
import * as KbAPI from '../API/knowledgeBaseAPI';
import * as CommentAPI from '../API/CommentAPI';
import DOMPurify from 'dompurify';
import moment from 'moment';
import Comment from '../components/Comment';
Modal.setAppElement('#root');

export default function KBSearchPage(props) {

    const [addArticleModal, setAddArticleModal] = useState(false);

    const [recentUpload, setRecentUpload] = useState([]);

    const [articleDescription, setArticleDescription] = useState('');

    const [arrayIndex, setArrayIndex] = useState(0);

    const [searchItem, setSearchItem] = useState('');

    const [empComments, setEmpComments] = useState([]);

    const articleItemClick = (index, param) => {
        setArrayIndex(index)
        getArticleDescriptionData(param);
        getEmployeeComments(param)
    }

    const closeModal = () => {
        setAddArticleModal(false)
    }

    const getRecentUploadData = () => {
        KbAPI.getRecentUpload().then(res => {
            setRecentUpload(res.data)
            getArticleDescriptionData(res.data[0].KNOWLEDGE_BASE_ID)
            getEmployeeComments(res.data[0].KNOWLEDGE_BASE_ID)
        }).catch(e => {
            console.log(e.message);
        })
    }

    const getArticleDescriptionData = (param) => {
        KbAPI.getArticleDescription({ KnowledgeBaseNumber: param }).then(res => {
            setArticleDescription(res.data)
        }).catch(e => {
            console.log(e.message);
        })
    }

    const getEmployeeComments = (param) => {
        CommentAPI.getComments({ KNOWLEDGE_BASE_ID: param }).then(res => {
            setEmpComments(res.data)
        }).catch(e => {
            console.log(e.message);
        })
    }

    const handleUpdate = (newValue) => {
        setRecentUpload(newValue)
    }

    useEffect(() => {
        getRecentUploadData()
    }, [])

    const getArticleData = data => {
        setRecentUpload([data, ...recentUpload])
        getArticleDescriptionData(data.KNOWLEDGE_BASE_ID)
        setArrayIndex(0);
        console.log(data)
    };




    return (

        <div className="tppedia-container-searchpage">
            <div className="tppedia-header-searchpage">
                <div className="title">
                    <img src={KnowledgeBaseIcon} alt="" />
                    <span>Knowledge Base</span>
                    <div className="line"></div>
                    <div className="barc-logo">
                        <img src={BarcLogo} alt="" />
                    </div>
                </div>
            </div>
            <div className="tppedia-main-body-searchpage">
                <div className="tppedia-search-list">
                    <div className="tppedia-item">
                        <ul>
                            <div className="tppedia-search">
                                <i className="fa fa-search"></i>
                                <input type="text" className="form-control" placeholder="Search" onChange={event => { setSearchItem(event.target.value) }} />
                                {
                                    props.currentUser?.permission?.ROLE_NAME === "USER" ? "" :
                                        <button onClick={() => setAddArticleModal(true)}>
                                            <span>Add Article</span>
                                            <i class="fas fa-plus"></i>
                                        </button>
                                }
                                <Modal isOpen={addArticleModal}>
                                    <KBForm close={closeModal} updateList={data => getArticleData(data)} listState={recentUpload} user={props.currentUser} />
                                </Modal>
                            </div>
                            {
                                recentUpload && recentUpload?.filter((obj) => {
                                    if (searchItem == "") {
                                        return obj
                                    } else if (obj.ARTICLE_TITLE.toLowerCase().includes(searchItem.toLowerCase())) {
                                        return obj
                                    } else if (obj.POSTED_BY.toLowerCase().includes(searchItem.toLowerCase())) {
                                        return obj
                                    } else if (obj.KNOWLEDGE_BASE_CODE.toLowerCase().includes(searchItem.toLowerCase())) {
                                        return obj
                                    }
                                }).map((obj, i) =>
                                    <li key={i} className={recentUpload[arrayIndex].KNOWLEDGE_BASE_ID == obj.KNOWLEDGE_BASE_ID ? "active" : "inactive"} onClick={() => articleItemClick(i, obj.KNOWLEDGE_BASE_ID)}>
                                        <div className="tppedia-item-title">
                                            <span className="item-title" >{obj.ARTICLE_TITLE}</span>
                                            <span>Posted By: <p>{obj.POSTED_BY}</p></span>
                                            <span>Date Posted: <p> {moment(obj.DATE_SUBMITTED).format("MMMM DD YYYY")} </p></span>
                                            <span>Knowledge Base Number: <p>{obj.KNOWLEDGE_BASE_CODE}</p></span>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="tppedia-feature-item-body">
                    <KBMainData data={recentUpload[arrayIndex]} article={articleDescription} comment={empComments} user={props.currentUser} />
                </div>
            </div>
        </div>
    )
}


