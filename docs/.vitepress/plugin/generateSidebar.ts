import path from 'path';
import fs from 'fs';

type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
};

type GenerateSidebarOptions = {
  basePath?: string;
  collapsed?: boolean; // 控制是否默认折叠
  filterIndexMd?: boolean; // 控制是否过滤 index.md
  filterEmptyDirs?: boolean; // 控制是否过滤空文件夹
  excludePattern?: string[]; // 用于匹配文件名的字符串数组
  // customOrder?: string[]; // 自定义排序的文件夹名
  customOrder?: Map<string, string[]>; // 自定义排序的文件夹名
};

type GenerateNavOptions = {
  basePath?: string;
  collapsed?: boolean; // 控制是否默认折叠
  customOrder?: string[]; // 自定义排序的文件夹名

};

// 根据自定义排序对文件夹进行排序
const sortByCustomOrder = (items: string[], customOrder?: string[]): string[] => {
  if (!customOrder || customOrder.length === 0) {
    return items.sort((a, b) => a.localeCompare(b)); // 默认字母排序
  }

  // 将自定义排序的文件夹放在前面，剩下的按字母顺序排在后面
  const inOrderArray = items.filter(item => customOrder.includes(item));
  const notInOrderArray = items.filter(item => !customOrder.includes(item)).sort((a, b) => a.localeCompare(b));
  return [...inOrderArray.sort((a, b) => customOrder.indexOf(a) - customOrder.indexOf(b)), ...notInOrderArray];
};

// 生成 sidebar 配置
export const generateSidebar = (options: GenerateSidebarOptions): Record<string, Array<SidebarItem>> => {
  const { basePath, filterIndexMd, filterEmptyDirs, excludePattern, customOrder } = options;

  if (!basePath) {
    throw new Error('basePath is required');
  }

  const docsPath = path.resolve(__dirname, `../../${basePath}`);

  // 遍历子目录并生成对应的 sidebar 结构
  const getSidebar = (dir: string, relativePath = ''): Array<SidebarItem> => {
    const sidebar: Array<SidebarItem> = [];
    let files = fs.readdirSync(dir);

    // 如果文件夹为空且需要过滤空文件夹，则返回空数组
    if (filterEmptyDirs && files.length === 0) {
      return [];
    }

    // 获取当前目录的自定义排序规则
    const parentCustomOrder = customOrder?.get(relativePath) || [];

    // 使用当前目录的排序规则
    files = sortByCustomOrder(files, parentCustomOrder);

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
            collapsed: options.collapsed,
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

  // 读取 TamDocs 目录下的子目录
  let directories = fs.readdirSync(docsPath).filter((dir) => {
    return fs.statSync(path.join(docsPath, dir)).isDirectory();
  });

  // 使用顶级目录的排序规则
  const rootCustomOrder = customOrder?.get('') || [];
  directories = sortByCustomOrder(directories, rootCustomOrder); // 对顶级目录进行排序

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

  return sidebarConfig;
};
// export const generateSidebar = (options: GenerateSidebarOptions): Record<string, Array<SidebarItem>> => {
//   const { basePath, filterIndexMd, filterEmptyDirs, excludePattern, customOrder } = options;

//   if (!basePath) {
//     throw new Error('basePath is required');
//   }

//   const docsPath = path.resolve(__dirname, `../../${basePath}`);

//   // 遍历子目录并生成对应的 sidebar 结构
//   const getSidebar = (dir: string, relativePath = ''): Array<SidebarItem> => {
//     const sidebar: Array<SidebarItem> = [];
//     let files = fs.readdirSync(dir);

//     // 如果文件夹为空且需要过滤空文件夹，则返回空数组
//     if (filterEmptyDirs && files.length === 0) {
//       return [];
//     }

//     files = sortByCustomOrder(files, customOrder); // 排序文件或目录

//     files.forEach((file) => {
//       const fullPath = path.join(dir, file);
//       const stat = fs.statSync(fullPath);

//       // 如果是文件夹，递归生成
//       if (stat.isDirectory()) {
//         const items = getSidebar(fullPath, path.join(relativePath, file));
//         // 只有当 items 不为空时才加入 sidebar
//         if (items.length > 0 || !filterEmptyDirs) {
//           sidebar.push({
//             text: file,
//             collapsed: true,
//             items
//           });
//         }
//       } else if (stat.isFile() && file.endsWith('.md')) {
//         // 如果 filterIndexMd 为 true，过滤 index.md 文件
//         if (filterIndexMd && file === 'index.md') {
//           return;
//         }

//         // 如果 excludePattern 存在且文件名不包含任何一个字符串，则跳过该文件
//         if (excludePattern && excludePattern.some(pattern => file.includes(pattern))) {
//           return;
//         }

//         // 处理 Markdown 文件并加入到侧边栏
//         sidebar.push({
//           text: file.replace('.md', ''),
//           link: `/${basePath}${path.join(relativePath, file).replace(/\\/g, '/')}`
//         });
//       }
//     });

//     return sidebar;
//   };

//   // 读取 TamDocs 目录下的子目录
//   let directories = fs.readdirSync(docsPath).filter((dir) => {
//     return fs.statSync(path.join(docsPath, dir)).isDirectory();
//   });

//   directories = sortByCustomOrder(directories, customOrder); // 对顶级目录进行排序

//   // 根据子目录生成每个子目录的 sidebar 配置
//   const sidebarConfig: Record<string, Array<SidebarItem>> = {};

//   directories.forEach((subDir) => {
//     const fullSubDirPath = path.join(docsPath, subDir);
//     const sidebarItems = getSidebar(fullSubDirPath, subDir);
//     // 只有当 sidebarItems 不为空时才加入 sidebarConfig
//     if (sidebarItems.length > 0) {
//       sidebarConfig[`/TamDocs/${subDir}/`] = sidebarItems;
//     }
//   });

//   return sidebarConfig;
// };

// 生成 nav 配置
export const generateNav = (options: GenerateNavOptions): Array<{ text: string; link: string }> => {
  const { basePath, customOrder } = options;

  if (!basePath) {
    throw new Error('basePath is required');
  }

  const docsPath = path.resolve(__dirname, `../../${basePath}`);

  // 读取 TamDocs 目录下的子目录
  let directories = fs.readdirSync(docsPath).filter((dir) => {
    return fs.statSync(path.join(docsPath, dir)).isDirectory();
  });

  directories = sortByCustomOrder(directories, customOrder); // 对顶级目录进行排序

  const navConfig: Array<{ text: string; link: string }> = directories.map((dir) => ({
    text: dir,
    link: `/TamDocs/${dir}/`,
    collapsed: options.collapsed
  }));

  return navConfig;
};
