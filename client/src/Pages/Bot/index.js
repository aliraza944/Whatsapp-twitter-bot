import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Bot.css";
const Bot = () => {
  const [upload, setUpload] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const fd = new FormData();
    fd.append("image", upload.file);
    fd.append("mango", upload.post);

    console.log([...fd]);
    console.log(upload);
    axios
      .post("http://localhost:5000/post/upload", fd, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="postfields">Please Enter your post</Label>
          <Input
            type="textarea"
            wrap="off"
            cols="30"
            rows="5"
            onChange={(e) => {
              setUpload({ ...upload, post: e.target.value });
            }}
          ></Input>
        </FormGroup>
        <Input
          type="file"
          name="post"
          onChange={(e) => {
            setUpload({ ...upload, file: e.target.files[0] });
          }}
        ></Input>

        <Button> Submit</Button>
      </Form>
    </div>
  );
};

export default Bot;
