import { LinkCardTag } from '../enums/LinkCard.ts';
export type LinkCard = {
    title: string;
    desc?: string;
    link: string;
    icon?: string;
    tags?: LinkCardTag[];
    style?: {
        color?: string,
        backgroundColor?: string
    }
}


type TreeNode = {
    title: string;
    cards?: LinkCard[];
    children?: TreeNode[];
};

export type Tree = TreeNode[];


