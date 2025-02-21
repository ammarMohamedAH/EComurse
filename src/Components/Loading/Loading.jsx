import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full fixed top-0 left-0 h-screen bg-[rgba(102,218,87,0.2)] z-50 flex justify-center items-center ">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="1"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
