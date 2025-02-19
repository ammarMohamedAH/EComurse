import Slider from "react-slick";
import sidImg1 from "../../assets/slider-image-1.jpeg";
import sidImg2 from "../../assets/slider-image-2.jpeg";
import sidImg3 from "../../assets/slider-image-3.jpeg";
import blog1 from "../../assets/blog-img-1.jpeg";
import blog2 from "../../assets/blog-img-2.jpeg";


export default function Header() {
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="w-4 h-2 bg-gray-300 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600 "
        onClick={onClick}
      >
      </button>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="w-4 h-2 bg-gray-300 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600 "
        onClick={onClick}
      >
        
      </button>
    );
  };
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600"></div>
    ),
   
    appendDots: () => (
      <div className="flex justify-center mt-4 " >
        <div className="flex justify-center gap-4 mt-7">
          <PrevArrow onClick={() => document.querySelector("header .slick-prev")?.click()} />
          <NextArrow onClick={() => document.querySelector("header .slick-next")?.click()} />
        </div>
      </div>
    ),
  };

  const sliderImages = [sidImg1, sidImg2, sidImg3];
  const blogImages = [blog1, blog2];

  return (
    <header className="my-4 flex  md:block">
      <div className="container flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <Slider {...settings}>
            {sliderImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  className="md:h-[400px] w-full object-cover"
                  alt={`Slider image`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-1/3 flex flex-col mt-10 md:mt-0">
          {blogImages.map((image, index) => (
            <img
              key={index}
              src={image}
              className="md:h-[200px] w-full object-cover shadow-md"
              alt={`Blog image`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
