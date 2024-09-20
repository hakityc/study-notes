import path from 'path';
import fs from 'fs';

type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
};

export const autoGenerateStructure = (options: {
  basePath?: string;
  filterIndexMd?: boolean; // 控制是否过滤 index.md
  filterEmptyDirs?: boolean; // 控制是否过滤空文件夹
  excludePattern?: string[]; // 用于匹配文件名的字符串数组
}) => {
  const { basePath, filterIndexMd, filterEmptyDirs, excludePattern } = options;

  if (!basePath) {
    throw new Error('basePath is required');
  }

  const docsPath = path.resolve(__dirname, `../../${basePath}`);

  // 遍历子目录并生成对应的 sidebar 结构
  const getSidebar = (dir: string, relativePath = ''): Array<SidebarItem> => {
    const sidebar: Array<SidebarItem> = [];
    const files = fs.readdirSync(dir);

    // 如果文件夹为空且需要过滤空文件夹，则返回空数组
    if (filterEmptyDirs && files.length === 0) {
      return [];
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      // 如果是文件夹，递归生成
      if (stat.isDirectory()) {
        const items = getSidebar(fullPath, path.join(relativePath, file));
        // 只有当 items 不为空时才加入 sidebar
        if (items.length > 0 || !filterEmptyDirs) {
          sidebar.push({
            text: file,
            collapsed: true,
            items
          });
        }
      } else if (stat.isFile() && file.endsWith('.md')) {
        // 如果 filterIndexMd 为 true，过滤 index.md 文件
        if (filterIndexMd && file === 'index.md') {
          return;
        }

        // 如果 excludePattern 存在且文件名不包含任何一个字符串，则跳过该文件
        if (excludePattern && excludePattern.some(pattern => file.includes(pattern))) {
          return;
        }

        // 处理 Markdown 文件并加入到侧边栏
        sidebar.push({
          text: file.replace('.md', ''),
          link: `/${basePath}${path.join(relativePath, file).replace(/\\/g, '/')}`
        });
      }
    });

    return sidebar;
  };

  // 读取 TamDocs 目录下的子目录（如 frontend 和 devtool）
  const directories = fs.readdirSync(docsPath).filter((dir) => {
    return fs.statSync(path.join(docsPath, dir)).isDirectory();
  });

  // 根据子目录生成每个子目录的 sidebar 配置
  const sidebarConfig: Record<string, Array<SidebarItem>> = {};

  directories.forEach((subDir) => {
    const fullSubDirPath = path.join(docsPath, subDir);
    const sidebarItems = getSidebar(fullSubDirPath, subDir);
    // 只有当 sidebarItems 不为空时才加入 sidebarConfig
    if (sidebarItems.length > 0) {
      sidebarConfig[`/TamDocs/${subDir}/`] = sidebarItems;
    }
  });

  const navConfig: Array<{ text: string; link: string }> = directories.map((dir) => ({
    text: dir,
    link: `/TamDocs/${dir}/`
  }));

  return {
    nav: navConfig,
    sidebar: sidebarConfig,
  };
};
