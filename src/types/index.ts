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

export type ItemList = {
  supplierCode: string;
  barCode: string;
  incomingDate: string;
  supplierNm: string;
  productNm: string;
  buyingProductNm: string;
  optionNm: string;
  orderQuantity: number;
  optionText: string;
  incomingQuantity: number;
  incomingIssueText: string;
  checker: string;
  notYetIncome: number;
  imageUrl: string;
  productCode: string;
  optionCode: string;
};
