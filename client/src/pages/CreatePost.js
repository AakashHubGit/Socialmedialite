import React, {  useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/createPost.css";

function CreatePost() {

  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

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
    axios
      .post("https://social-media-lite.onrender.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    <Form className="formContainer">
      <label htmlFor="title">Title:</label>
      <ErrorMessage name="title" component="span" />
      <Field
        autoComplete="off"
        id="title"
        name="title"
        placeholder="Enter the title"
      />
      
      <label htmlFor="postText">Description:</label>
      <ErrorMessage name="postText" component="span" />
      <Field
        as="textarea"
        autoComplete="off"
        id="postText"
        name="postText"
        placeholder="Write your post here..."
      />

      <button type="submit">Create Post</button>
    </Form>
  </Formik>
</div>

  );
}

export default CreatePost;