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
    
    const notify = () => toast.success("Article Successfully Edit", {positon: toast.POSITION.TOP_RIGHT});

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
            notify()
        }).catch(e => console.log(e.message))
    };

    return (
        <>

            <div style={{ zIndex: '100' }} className="tppedia-form">
                <div className="form-title">
                    <span>WFM Knowledge Base Form</span>
                </div>
                {
                    console.log(props)
                }
                <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-form">
                        <div className="form">
                            <label>Article Title :</label>
                            <input className="form-control" type="text" name="article_title" defaultValue={props.artEdit.ARTICLE_TITLE} ref={register} />
                        </div>
                        {/* {errors.position && <p>{errors.position.message}</p>} */}

                        {/* <div className="form">
                            <label>Date Submitted :</label>
                            <input className="form-control" type="date" name="article_date_submitted" ref={register} />
                        </div> */}
                    </div>
                    <div className="input-form articletext" style={{ marginBottom: '0', display: 'block' }}>
                        <label>Article Description :</label>
                        {/* <CKEditor
                            editor={ClassicEditor}
                            data={articleText}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                setArticleText(data)
                            }}
                        /> */}
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
                    <div className="forms-action">
                        <button className="cancel-btn" style={{ marginRight: "12px" }} onClick={refreshPage} type="button">
                            Close
                    </button>
                        <button className="submit-btn">Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}