import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProductsList from '../../components/ProductsSection/ProductsList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getAllProduct, allRatingThunk } from '../../store/products/action';
import { useSelector } from 'react-redux';
import ChatIcon from '../../components/ChatIcon/ChatIcon';
import './Home.css'

function Home() { 
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);
  
  useEffect(() => {
    ( async () => {
      const res = await fetch('http://localhost:3100/api/products', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const products = await res.json();
      dispatch(getAllProduct(products))
    })();

    dispatch(allRatingThunk());
    
  }, [dispatch]);

  const [show, setShow] = useState(true);
  
  return (
    <Box>
         <div className='heroHide'>
        <Button variant="outlined" size="large" onClick={() => setShow(prev => !prev)}>Спрятать</Button>
        </div>
      {show && <Box sx={{ display: 'flex' }}><HeroSection /> </Box>} 
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <ProductsList products={products} />
        
       </Stack>
    </Box>
  );
}

export default Home;
