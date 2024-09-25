
type TreeNode = {
    title: string;
    cards?: {
        title: string;
        desc?: string;
        link: string;
        icon?: string;
        tips?: string;
    }[];
    children?: TreeNode[];
};

export type Tree = TreeNode[];


