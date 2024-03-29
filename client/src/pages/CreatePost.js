import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material"; // Import CircularProgress from Material-UI
import "../css/createPost.css";

function CreatePost() {
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };
  const [loading, setLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    setLoading(true); // Set loading to true when form is submitted
    axios
      .post("https://social-media-lite.onrender.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request is completed
      });
  };

  return (
    <div className="createPostPage">
      {loading && ( // Render circular loading indicator while data is being submitted
        <div className="loader-container">
          <CircularProgress />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit} className="formContainer">
            <div className="inputGroup">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter the title"
                className={errors.title ? "inputError" : ""}
              />
              {errors.title && (
                <span className="errorMessage">{errors.title}</span>
              )}
            </div>

            <div className="inputGroup">
              <label htmlFor="postText">Description</label>
              <textarea
                id="postText"
                name="postText"
                value={values.postText}
                onChange={handleChange}
                placeholder="Write your post here..."
                className={errors.postText ? "inputError" : ""}
              />
              {errors.postText && (
                <span className="errorMessage">{errors.postText}</span>
              )}
            </div>

            <button type="submit" className="submitButton">
              Create Post
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePost;
