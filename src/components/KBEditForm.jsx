import React, { useState, setState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolBar";
import { useForm } from 'react-hook-form';
import "react-quill/dist/quill.snow.css";
import * as API from '../API/knowledgeBaseAPI';
import './KBEditForm.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

export default function TPPediaForm(props) {

    const { register, handleSubmit, errors, reset, setValue } = useForm();

    const [editArticleForm, setEditArticleForm] = useState('')

    const [tags , setTags] = useState([]);

    const notify = () => toast.success("Article Successfully Edit", { positon: toast.POSITION.TOP_RIGHT });

    const addTags = event => {
        if (event.target.value != "") {
            setTags([...tags, event.target.value])
            event.target.value = "";
        }
    };

    const removeTags = removeIndex => {
        setTags(tags.filter((_, index) => index != removeIndex));
    };

    const handleChange = value => {
        setEditArticleForm(value);
        setValue("article_description", value)
    };
    const refreshPage = () => {
        window.location.reload();
    }
    const onSubmit = (data) => {
        // props.resetLoadingProgress();
        // props.setShowLoading(true)
        // const fd = new FormData();
        let artForm = {

            KNOWLEDGE_BASE_ID: props.artEdit.KNOWLEDGE_BASE_ID,
            ARTICLE_TITLE: data.article_title,
            POSTED_BY: props.postedUser?.infoObject.given_name + (' ') + props.postedUser?.infoObject.family_name,
            POSITION: data.article_position,
            // DATE_SUBMITTED: data.article_date_submitted,
            KNOWLEDGE_BASE_NUMBER: data.article_knowledge_base_number,
            ARTICLE_DESCRIPTION: data.article_description
        }

        API.putArticle(artForm).then(res => {
            props.getUpdateList(res.data)
            notify()
            props.close()
            reset()
        }).catch(e => console.log(e.message))
    };

    return (
        <>

            <div style={{ zIndex: '100' }} className="tppedia-edit-form">
                <div className="form-title">
                    <span>WFM Knowledge Base Form</span>
                </div>
                <form className="article-edit-form" onSubmit={handleSubmit(onSubmit)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                    <div className="edit-title">
                        <div className="title-edit-form">
                            <label>Article Title :</label>
                            <input className="form-control" type="text" name="article_title" defaultValue={props.artEdit.ARTICLE_TITLE} ref={register} />
                        </div>
                        <div className="edit-form-main-tags">
                            <div className="edit-form-title">
                                <label>Add Tags :</label>
                            </div>
                            <div className="edit-form tags">
                                <ul>
                                    {
                                        tags.map((tag, index) =>
                                            <li key={index}>
                                                <span>{tag}</span>
                                                <i className="material-icons" onClick={() => removeTags(index)}>close</i>
                                            </li>
                                        )}

                                </ul>
                                <input type="text" placeholder="Put some tags here" onKeyUp={e => e.key == "Enter" ? addTags(e) : null} />
                            </div>
                        </div>
                    </div>
                    <div className="edit-description articletext" style={{ marginBottom: '0', display: 'contents' }}>
                        <label>Article Description :</label>
                        <EditorToolbar />
                        <input type="text"
                            name="article_description"
                            ref={register}
                            style={{ display: 'none' }} />

                        <ReactQuill
                            theme="snow"
                            onChange={handleChange}
                            defaultValue={props.artDescEdit}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="edit-form-action">
                        <button className="cancel-btn" style={{ marginRight: "12px" }} onClick={props.close} type="button">
                            Close
                    </button>
                        <button className="submit-btn">Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}