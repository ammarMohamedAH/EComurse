import Loading from '../Loading/Loading';
import useApidata from './../../Hooks/useApidata';

export default function Catrgories() {
    const { data,isError,isLoading,error} = useApidata('https://ecommerce.routemisr.com/api/v1/categories',"categories");

    if (isLoading) {
        return(
            <Loading></Loading>
        )
    }
    if (isError) {
        return(
            <div className='text-center font-bold text-3xl text-red-500'>{error.message}</div>
        )
    }


  return (
    <div className="grid grid-cols-3 gap-6 p-24">
        {data?.data?.data.map((cat,index)=><Cat key={index} cat={cat}></Cat>)}
      
    </div>
  );
}

function Cat({cat}) {
  return (
    <>
      <div className="card border rounded-md">
        <div className="card-img">
          <img
            className="aspect-4/3 object-cover w-full h-[300px]"
            src={cat.image}
          />
        </div>
        <div className="card-body py-5">
          <p className="text-green-700 text-3xl font-medium my-auto text-center">
           {cat.name}
          </p>
        </div>
      </div>
    </>
  );
}
