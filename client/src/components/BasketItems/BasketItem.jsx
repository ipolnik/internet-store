import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardContent, Typography, CardActions, Button, TextField, CardMedia} from '@mui/material'
import './BasketItem.css'
import {changeQuantity} from '../../store/products/action'

function BasketItem({product}) {

    console.log("first - product")
    const { id, name, price, rating, description, type_id, brand_id, start_date, end_date, createAt, updateAt, ...ProductImages } = product
    const pathImages = ProductImages['ProductImages.img']
    const productImage = useSelector((store) => store.products.productImages)
    console.log("productImage?", productImage)
    //const pathOneImage = `http://127.0.0.1:3100${pathImages}`;

    console.log("first indexs =======", product)
    
    let pathOneImage;
    if(product.length){
        console.log("fail???????????")
        pathOneImage = `https://mebel-tochka.herokuapp.com${product[1][0].img}`;
    } else {
            pathOneImage = `hhttps://mebel-tochka.herokuapp.com${pathImages}`;
        }

    const dispatch = useDispatch()
    const products = useSelector((store)=> store.products)
    

    const deleteHandler = () => {
        
        products.basket = products.basket.filter(item=>item.id !== id)

        dispatch(changeQuantity(products.basket))

        let items = JSON.parse(localStorage.getItem("basketItems")); 
        for (let i =0; i< items.length; i++) {
            

            let item = items[i];

            if (item.id == id) {
                
                items.splice(i, 1);
            }
        }
        items = JSON.stringify(items);
        localStorage.setItem("basketItems", items);
    }
    return (
        <>
          {product.length ?   
          <Card className = 'Card' >
                <CardContent className='Card'>
                    <div >
                        <Typography variant="h5" component="div" className='basket-card-info'>
                            {product[0].name}
                            <CardMedia
                             component="img"
                            height="110"
                             maxWidth="100"
                             image={pathOneImage}
                            alt={product.name}
                             />
                        </Typography>
                    </div>
                    <div className="MuiInput-root">
                        {/*<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:'1', max:'15' }} onChange={quantityHandler}  className = 'inputQuantity' id="standard-basic" type='number' label="количество" variant="standard" />*/}
                        
                    </div>
                    <div variant="h6" component="div">
                        <p>{product[0].description}</p>
                    </div>
                    <div variant="h6" component="div">
                        <b style={{color: "rgb(155, 47, 174)"}}>{product[0].price} ₽</b>
                    </div>
                </CardContent>
                <CardActions>
                    <Button onClick={deleteHandler} size="small" variant="outlined" color="error"><h3>Удалить</h3></Button>
                </CardActions>
            </Card>  :

                <Card className = 'Card' >
                <CardContent className='Card'>
                    <div >
                        <Typography variant="h5" component="div" className='basket-card-info'>
                            {product.name}
                            <CardMedia
                             component="img"
                            height="110"
                             maxWidth="100"
                             image={pathOneImage}
                            alt={product.name}
                             />
                        </Typography>
                    </div>
                    <div className="MuiInput-root">
                        {/*<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:'1', max:'15' }} onChange={quantityHandler}  className = 'inputQuantity' id="standard-basic" type='number' label="количество" variant="standard" />*/}
                        
                    </div>
                    <div variant="h6" component="div">
                        <p maxlength="20">{product.description.slice(0, 120) + "..."}</p>
                    </div>
                    <div variant="h6" component="div">
                        <b style={{color: "rgb(155, 47, 174)"}}>{product.price}₽</b>
                    </div>
                </CardContent>
                <CardActions>
                    <Button onClick={deleteHandler} size="small" variant="outlined" color="error"><h3>Удалить</h3></Button>
                </CardActions>
            </Card>
            }
        </>
    )
}

export default BasketItem