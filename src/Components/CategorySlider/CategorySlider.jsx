
import Slider from "react-slick";
import useApidata from "../../Hooks/useApidata";

export default function CategorySlider() {

 
  let {data,isError}=useApidata("https://ecommerce.routemisr.com/api/v1/categories","categories")

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
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 932, 
        settings: {
          slidesToShow: 5, 
        }
      },
      {
        breakpoint: 740, 
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 400, 
        settings: {
          slidesToShow: 1,         }
      }
    ],
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    arrows: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600"></div>
    ),
   
    appendDots: () => (
      <div className="flex justify-center mt-4 " >
        <div className="flex justify-center gap-4 mt-7">
          <PrevArrow onClick={() => document.querySelector(".category .slick-prev")?.click()} />
          <NextArrow onClick={() => document.querySelector(".category .slick-next")?.click()} />
        </div>
      </div>
    ),
  };

  return (
    <div className=" sm:my-12 block category"> 
     {isError?"":
      <Slider {...settings}>
      {data?.data?.data.map((cat)=><CategoryItem key={cat._id} ele={cat}></CategoryItem>)}
      </Slider>
     }
    </div>
  )
}

function CategoryItem({ele}) {
return(
  <div>
    <img src={ele.image} className="object-cover xs:h-[250px] xs:w-[200px]" alt="" />
    <h3 className="text-left font-bold text-xl">{ele.name}</h3>
  </div>
)
}