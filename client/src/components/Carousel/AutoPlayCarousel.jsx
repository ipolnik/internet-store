import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black", backgroundColor : '#3098ff',
      borderRadius: '50%' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black", backgroundColor : '#3098ff',
      borderRadius: '50%' }}
      onClick={onClick}
    />
  );
}

const functionOriginalId = (prod) => {
  const originalId = {}
  prod.map((prod) => originalId[prod.id] = prod )
  return Object.values(originalId)
};

function AutoPlayCarousel({products}) {

  const funcProdac = functionOriginalId(products);
  const filteredProducts = funcProdac.filter(product => product.type_id === 1);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1570,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
     nextArrow: <SampleNextArrow />,
     prevArrow: <SamplePrevArrow />
  };

  return (
    <Box>
        {/* <h2> Multiple items </h2> */}
        <Slider {...settings}>
          {!filteredProducts.length
          ? <p>Товары по скидке закончились</p>
          : filteredProducts?.map((product) => (
            <CarouselItem 
              key={product.id}
              product={product}
            />

          ))}
        </Slider>
    </Box>
  )
}

export default AutoPlayCarousel