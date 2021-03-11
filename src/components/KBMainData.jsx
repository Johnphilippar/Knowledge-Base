import React, { useState, useEffect } from 'react';
import './KBMainData.scss';
import KBFormEdit from './KBEditForm';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import * as KbAPI from '../API/knowledgeBaseAPI';
import * as commentAPI from '../API/CommentAPI';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Comment from './Comment';


toast.configure()

export default function TPPediaData(props) {


    const [editArticleModal, setEditArticleModal] = useState(false)

    const [articleDescription, setArticleDescription] = useState('');

    const closeEditModal = () => {
        setEditArticleModal(false)
    }

    const notify = () => toast.success("Article Successfully Added", { positon: toast.POSITION.TOP_CENTER });

    const refreshPage = () => {
        window.location.reload(false)
    }

    const getArticleDescriptionData = (param) => {
        KbAPI.getArticleDescription({ KnowledgeBaseNumber: param }).then(res => {
            setArticleDescription(res.data)
            console.log(res.data);
        }).catch(e => {
            console.log(e.message);
        })
    }

    const deleteArticle = () => {

        const data = {
            param_obj: props.data.KNOWLEDGE_BASE_ID
        }

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this article?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => (KbAPI.deleteArticle(data).then(res => {
                        refreshPage()
                    }))
                },
                {
                    label: 'no'
                }
            ]
        });
    };

    useEffect(() => {
        getArticleDescriptionData()
    }, [])

    return (
        <>
            <div className="tppedia-container-data">
                <div className="tppedia-main-body-data">
                    <div className="details">
                        <div className="user-data">
                            <div className="item-title">
                                <span>{props.data?.ARTICLE_TITLE}</span>
                            </div>
                            <span style={{ marginLeft: '0' }}>Uploaded By: <span style={{ fontWeight: 'normal', margin: '0' }}>{props.data?.POSTED_BY}</span> </span>
                            <span>Uploaded Date: <span style={{ fontWeight: 'normal', margin: '0' }}>
                                {moment(props.data?.DATE_SUBMITTED).format("MMMM DD YYYY")}
                            </span></span>
                            <span>Knowledge Base Number: <span style={{ fontWeight: 'normal', margin: '0' }}>{props.data?.KNOWLEDGE_BASE_CODE}</span></span>

                            {
                                props.user?.permission?.ROLE_NAME === "USER" ? "" :
                                    <button className="btn" onClick={() => deleteArticle()}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                            }

                            {
                                props.user?.permission?.ROLE_NAME === "USER" ? "" :
                                    <button className="btn" onClick={() => setEditArticleModal(true)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                            }

                            <Modal style={{ zIndex: '1000' }} isOpen={editArticleModal}>
                                <KBFormEdit close={closeEditModal} artEdit={props.data} artDescEdit={props.article} postedUser={props.user} />
                            </Modal>

                        </div>
                    </div>
                    <div className="description">
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.article) }}></p>
                    </div>
                    <Comment getComment2={props.comment} getKbID={props.data?.KNOWLEDGE_BASE_ID}></Comment>
                </div>
            </div>
        </>
    )
}