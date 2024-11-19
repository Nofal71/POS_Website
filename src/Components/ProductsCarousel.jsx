import React from "react";
import Slider from "react-slick";

function ProductsCarousel({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container mx-auto max-w-screen-lg py-8">
      <Slider {...settings}>
        {data &&
          data.map((e, i) => (
            <div key={i} className="px-4">
              <div className="card bg-white rounded-lg shadow-lg overflow-hidden">
                <figure className="p-4">
                  {[".jpg", ".png", ".jpeg"].some((ext) =>
                    e.img.includes(ext)
                  ) ? (
                    <img
                      src={e.img}
                      alt={e.name || "Product"}
                      className="rounded-md w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="skeleton w-full h-48 bg-gray-300 rounded-md"></div>
                  )}
                </figure>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default ProductsCarousel;
