import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  id?: string;
  orderQuantity?: number;
  inQuantity?: number;
  filteredData?: any;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SheetData {
  supplierCode: string;
  barCode: string;
  inDate: Date;
  supplierNm: string;
  productNm: string;
  buyingProductNm: string;
  optionNm: string;
  orderQuantity: number;
  optionText: string;
  inQuantity: number;
  inIssueText: string;
  imageUrl: string;
  productCode: string;
}
