import Image from "next/image";
import CustomButton from "./CustomButton";

const Hero = () => {
  const handleScroll = () => {};

  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto">
      <div className="flex-1 pt-36 sm:px-16 px-6">
        <h1 className="2xl:text-[72px] sm:text-[64px] text-[50px] font-extrabold">MOOMOOZ Warehouse System!</h1>

        <p className="text-[27px] text-black-100 font-light mt-5">남대문 입고 상품 확인프로그램</p>
        <p className="text-[20px] text-black-100 font-light mt-5">[]일 기준</p>
        {/* <CustomButton
          title="거래선별 확인"
          containerStyles="bg-sky-500 text-white rounded-full mt-10"
          handleClick={handleScroll}
        /> */}
      </div>
    </div>
  );
};

export default Hero;
