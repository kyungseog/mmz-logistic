import Image from "next/image";
import { CustomButtonProps } from "../types/index";

const Button = ({ isDisabled, btnType, containerStyles, textStyles, title, handleClick }: CustomButtonProps) => (
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1 ${textStyles}`}>{title}</span>
  </button>
);

export default Button;
