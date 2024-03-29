import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, FormControl,Grid, Paper, Rating, TextareaAutosize } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCommentDatabaseAndStore, getAllCommentsFromDatabase } from "../../store/products/action";
import { getUsersLogin } from "../../store/auth/action";
import { useParams } from "react-router-dom";
import BasicRating from "../ProductsSection/BasicRating";
import { Box, Stack } from "@mui/system";
import BasicRatingReadOnly from "../ProductsSection/BasicRatingReadOnly";

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
  dispatch(getAllCommentsFromDatabase(id)) 
  }, [id]);

  useEffect(() => {
    
    ( async () => {
      const res = await fetch('https://mebel-tochka.herokuapp.com/api/allLogins', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const logins = await res.json();
      dispatch(getUsersLogin(logins));
    })();
      }, [dispatch]);
  
  const userDataInfo = useSelector((store) => store.auth.userData);
  const allComments = useSelector((store) => store.products);
  const allRating = useSelector((store) => store.products.allRating);
  const filterComments = allComments.comment.filter((comment) => comment.product_id === +id);
  const usersLogins = useSelector((store) => store.auth.usersLogins);
  
  const userRating = allRating.filter(el => el.product_id === +id);
  const rating = userRating.filter(el => el.user_id === filterComments.user_id);

  const [inputs, setInputs] = useState("");
  const inputHandler = (e) => {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const newComment = {
  user_id: userDataInfo.id,
  content: inputs.content,
  product_id: id,
  }; 

  return (
    <div>
      <h1> Написать отзыв о товаре </h1>
      <FormControl style={{ padding: '10px' }}


      >
        <TextareaAutosize 
          name="content"
          value={inputs.content}
          aria-label="minimum height"
          minRows={10}
          placeholder="Я очень доволен приобретенным товаром"
          style={{ width: 700, height: 100 }}
          onChange={inputHandler}
          
        />
        <br />
        <Button
          type="button"
          onClick={() => dispatch(addCommentDatabaseAndStore(newComment, id))}
          // onClick={() => dispatch(getCommentOneProductAction(newComment))}
        >
          Добавить комментарий
        </Button>
      </FormControl > 
      <br /> <br />
      {filterComments
        ? filterComments.map((el) => (
            <Paper key={el.id} style={{ padding: "-5px -5px" }}>
              
              <Grid container wrap="nowrap" spacing={2} >
                
                <Grid item>
                  {/* <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt={`${userDataInfo.login}`}
                    src="/broken-image.jpg"
                  /> */}
                  <Avatar src="/broken-image.jpg" />
                </Grid>
                   <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {userDataInfo.user_id}
                  </h4>
                  <b> {usersLogins?.filter(elems => elems.id === el.user_id)[0]?.login } </b>
                  <p style={{ textAlign: "left", color: "blue" }}>
                  <Stack direction="row" spacing={2} alignItems="center" margin="0 0 16px">
                  <Rating name="read" value={userRating?.filter(elems => elems.user_id === el.user_id)[0]?.rating} precision={0.5} readOnly onChange={inputHandler}/>
               </Stack > 
                    {el?.content } 
                  </p>
                  
                   {el.createdAt.slice(0, 10)}
                 </Grid>
               </Grid>
               
               <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
               
             </Paper>
          ))
        : ''}
    </div>
  );
};

export default Comments;
