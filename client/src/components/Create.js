import React from 'react'
import {Helmet} from "react-helmet";
import {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {createAction} from "../store/asyncMethods/PostMethods";
import {useSelector, useDispatch} from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader";

function Create(props) {
    const dispatch = useDispatch();
    const {user:{_id, name}} = useSelector(state => state.AuthReducer);

    const [currentImage, setCurrentImage] = useState("");

    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: '',
        description: '',
        image: '',
    })


    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })

        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug)
    }

    const slugHandle= (e) => {
        setSlug(e.target.value)
        setSlugButton(true)
    }

    const handleURL = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'))
    }

    const [imagePreview, setImagePreview] = useState('');

    const fileHandle = (e) => {
        // console.log(e.target.files[0].name);
        if(e.target.files.length !== 0){
            setCurrentImage(e.target.files[0].name);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }

        reader.readAsDataURL(e.target.files[0]);

        setState({ 
            ...state,
            [e.target.name] : e.target.files[0]
        })
        }
        
    }

    const handleDescription = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }

    const createPost = (e) => {
        e.preventDefault();
        // console.log("state:>>>>", state)
        // console.log("slug:>>>>", slug)
        // console.log("value:>>>>", value)

        const {title, description, image} = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);
        dispatch(createAction(formData));
    }

    const { createErrors, redirect, loading } = useSelector((state) => state.PostReducer);

    useEffect(() => {
		if (redirect) {
			props.history.push('/dashboard');
		}
		if (createErrors?.length !== 0) {
			createErrors.map((err) => toast.error(err.msg));
		}
	}, [createErrors, redirect]);

    
    return (
        <div className="create mt-100">
            <Helmet>
                <meta name="description" content="Craete a new post" />
                <title>Create new post</title>
            </Helmet>
            <Toaster 
               position="top-center"
               reverseOrder={false} 
               toastOptions={{
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: 'red',
                  fontSize: 20,
                },
              }}
            />

{!loading ? 
        <div className="container">
        <form onSubmit={createPost}>
            <div className="row ml-minus-15 mr-minus-15">
                <div className="col-6 p-15">
                    <div className="card">
                        <h3 className="card__h3">Create a new post</h3>

                        <div className="group">
                            <label htmlFor="title">Post Title</label>
                            <input
                                type="text"
                                name="title"
                                value={state.title}
                                onChange={handleInput}
                                id="title"
                                placeholder="Post title ..."
                                className="group__control"
                            />
                        </div>
                        <div className="group">
                            {currentImage ?
                                <label htmlFor="image" className="image__label">Choosing Image : {currentImage}</label>
                                :
                                <label htmlFor="image" className="image__label">Choose Image</label>
                            }

                            <input
                                type="file"
                                name="image"
                                id="image"
                                placeholder="Post title ..."
                                onChange={fileHandle}
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="body">Post body</label>
                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                id="body"
                                placeholder="Post body ..."
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="description">Meta Description</label>
                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                className="group__control"
                                placeholder="meta description..."
                                maxLength="150"
                                defaultValue={state.description}
                                onChange={handleDescription}
                                onKeyUp={(e) =>
                                    setState({ ...state, description: e.target.value })
                                }
                            />
                            <div className="row">
                                <p className="length">{state.description ? state.description.length : ''}</p>
                                <p>{state.description ? "/max-length: 150"  : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 p-15">
                    <div className="card">
                        <div className="group">
                            <label htmlFor="slug">Post URL</label>
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                value={slug}
                                onChange={slugHandle}
                                className="group__control"
                                placeholder="Post URL..."
                            />
                        </div>
                        <div className="group">
                            {slugButton ?
                                <button onClick={handleURL} className="btn btn-default">Update Slug</button>
                                :
                                ""
                            }
                        </div>
                        <div className="group">
                            <div className="imagePreview">
                                {imagePreview ?
                                    <img src={imagePreview} alt="imagePreview"/>
                                    :
                                    ""
                                }
                            </div>
                        </div>


                        <div className="group">
                            <input
                                type="submit"
                                value="Create post"
                                className="btn btn-default btn-block"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    :
    <Loader />
}

        </div>
    )
};

export default Create
