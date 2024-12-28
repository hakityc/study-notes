import { LinkCardTag } from "../enums/LinkCard.ts";
export type LinkCard = {
  title: string;
  desc?: string;
  link: string;
  icon?: string;
  code?: string;
  tags?: LinkCardTag[];
  style?: {
    cardStyle?: {
      backgroundColor?: string;
      color?: string;
    };
    descStyle?: {};
  };
};

type TreeNode = {
  title: string;
  cards?: LinkCard[];
  children?: TreeNode[];
};

export type Tree = TreeNode[];
