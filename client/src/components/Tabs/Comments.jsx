import React, { useState } from "react";
import {Avatar,Button, Divider, FormControl, Grid,Paper, TextareaAutosize} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { addCommentDatabaseAndStore } from "../../store/products/action"
import { deepOrange } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userDataInfo = useSelector((store) => store.auth.userData)
  const allComments = useSelector((store) => store.products.comment)
  console.log("Comments ~ allcomments", allComments)
  const allRating = useSelector((store) => store.products.allRating)
  console.log("Comments ~ allRating", allRating)
 
  const [inputs, setInputs] = useState('');
  const inputHandler = (e) => {
    setInputs((prev) => ({...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const newComment = {
    user_id: userDataInfo.id,
    content: inputs.content,
    product_id: id,
  }
  console.log("Comments ~ content", newComment)

  return (
    <div >
      <h1> Написать отзыв о товаре </h1>
      <FormControl sx={{border: "1px solid grey", boxShadow: 20, borderRadius: 20 }} className="contactUsBox" >

        <TextareaAutosize 
          name="content"
          value={inputs.content} 
          aria-label="minimum height"
          minRows={10}
          placeholder="Я очень доволен приобретенным товаром"
          style={{ width: 900 }}
          onChange={inputHandler}
          />
<br />
      <Button type="button"
       onClick={() => dispatch(addCommentDatabaseAndStore(newComment, id))}> 
      Добавить комментарий</Button>
      </FormControl>
      <br /> <br />


      {allComments ? allComments.map((el) => 
            <Paper key={el.id} style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                

<Avatar
  sx={{ bgcolor: deepOrange[500] }}
  alt={`${userDataInfo.login}`}
  src="/broken-image.jpg"
/>
    
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{userDataInfo.user_id}</h4>
                <p style={{ textAlign: "left", color: "blue" }}>
                
                {el.content}
                </p>
                     {/* posted 1 minute ago */}
               </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </Paper>
            )
          : null}
 
    </div>
  );
};

export default Comments;