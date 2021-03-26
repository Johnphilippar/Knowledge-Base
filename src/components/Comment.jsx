import React , {useState , useEffect} from 'react'
import './Comment.scss';
import { useForm } from 'react-hook-form';
import * as API from '../API/CommentAPI';
import { ToastContainer, toast } from 'react-toastify';



toast.configure()
export default function Comment(props) {

    const { register, handleSubmit, setValue , reset} = useForm();

    const notify = () => toast.success("Article Successfully Added", { positon: toast.POSITION.TOP_RIGHT });
    const [commentForm , setCommentForm] = useState(props.getComment2)

    const onSubmit = (data) => {
        let empCommentForm = {
            KNOWLEDGE_BASE_ID: (props.getKbID),
            COMMENTS: data.emp_comment,
            // COMMENT_BY: props.user?.infoObject.given_name + (' ') + props.user?.infoObject.family_name
            COMMENT_BY: 'JOHN PHILIP PAR'
        }
        API.postComment(empCommentForm).then(res => {
            reset();
        }).catch(e => console.log(e.message))
        setCommentForm(commentForm => [...commentForm,empCommentForm])
    };

    useEffect(() => {
        setCommentForm(props.getComment2)
    },[props.getComment2])

    return (
        <div>
            <div className="comments">
                <div className="comments-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control" placeholder="Add Comments" name="emp_comment" ref={register} />
                        <button className="comment-btn">Submit</button>
                    </form>
                </div>
                <div className="employee-comments">
                    <ul className="comments-ul">
                        {
                            commentForm.map(obj =>
                                <li className="comments-li">
                                    <p>{obj.COMMENT_BY}</p>
                                    <div className="employee-active-comment">
                                        <span>{obj.COMMENTS}</span>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}