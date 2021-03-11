import React, { useState, setState , useEffect } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolBar";
import { useForm } from 'react-hook-form';
import "react-quill/dist/quill.snow.css";
import * as API from '../API/knowledgeBaseAPI';
import './KBForm.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
export default function TPPediaForm(props) {

    const { register, handleSubmit, errors, reset , setValue } = useForm();

    const [articleForm, setArticleForm] = useState('')
    

    const notify = () => toast.success("Article Successfully Added", {positon: toast.POSITION.TOP_RIGHT});

    const handleChange = value => {
        setArticleForm(value);
        setValue("article_description",value)
    };

    
    const onSubmit = (data) => {
        let artForm = {

            ARTICLE_TITLE: data.article_title,
            POSTED_BY: props.user?.infoObject.given_name + (' ') + props.user?.infoObject.family_name,
            KNOWLEDGE_BASE_NUMBER: data.article_knowledge_base_number,
            ARTICLE_DESCRIPTION: data.article_description
        }

        API.postArticle(artForm).then(res => {
            props.updateList(res.data)
            props.close();
            notify();
            reset()
            console.log(res.data)
        }).catch(e => console.log(e.message))
    };

    // useEffect(() =>
    //     {
    //         setArticleForm(props.listState)
    //     }, [props.listState])

    return (
        <>
            <div style={{ zIndex: '100' }} className="tppedia-form">
                <div className="form-title">
                    <span>WFM Knowledge Base Form</span>
                </div>
                <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-title">
                        <div className="add-form-title">
                            <label>Article Title :</label>
                            <input className="form-control" type="text" name="article_title" ref={register} required/>
                        </div>
                    </div>
                    <div className="input-form articletext" style={{ marginBottom: '0', display: 'contents' }}>
                        <label>Article Description :</label>
                        <EditorToolbar />
                        <input type="text" 
                            name="article_description"
                            ref={register}
                            style={{display: 'none'}}/>
                        
                        <ReactQuill
                            theme="snow"
                            onChange={handleChange}
                            value={articleForm}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="forms-action">
                        <button className="cancel-btn" style={{ marginRight: "12px" }} onClick={props.close} type="button">
                            Close
                    </button>
                        <button className="submit-btn" >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}