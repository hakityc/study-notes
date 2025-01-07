import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const treePath = path.resolve(__dirname, "../docs/static/tree.json");

const getIconUrl = () => {
  try {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../docs/static/tree.json"), "utf8")).data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

//扁平处理数据
const analyzeUrlData = () => {
  const tree = getIconUrl();
  if (!tree) {
    console.error("Tree data is undefined");
    return [];
  }
  const flatter = (tree) => {
    let flatArray = [];

    function traverse(node) {
      if (node.cards) {
        node.cards = node.cards.map((card) => {
          const code = card.title.replace(/\./g, "-").replace(/\s/g, "-").toLowerCase();
          return {
            title: card.title,
            code: code,
            icon: card.icon || "",
          };
        });
        flatArray = flatArray.concat(node.cards);
      }
      if (node.children) {
        node.children.forEach((child) => traverse(child));
      }
    }

    tree.forEach((root) => traverse(root));
    return flatArray;
  };
  const flatCardsArray = flatter(tree);
  return flatCardsArray;
};


//下载icon
const downloadIcon = async () => {
  const array = analyzeUrlData();
  const download = async (url, dest, cb) => {
    try {
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        response.pipe(file);
      });
      await new Promise((resolve, reject) => {
        file.on("finish", () => {
          file.close(resolve);
        });
        file.on("error", (err) => {
          // reject(err);
          console.log('错误:',err)
        });
      });
      cb(null);
    } catch (err) {
      try {
        fs.promises.unlink(dest);
      } catch (unlinkErr) {
        // 处理文件删除错误
      }
      cb(err.message);
    }
  };

  for (const item of array) {
    if (item.icon && !item.icon.includes("svg")) {
      await download(item.icon, path.resolve(__dirname, `../docs/assets/icon/${item.code}.png`), (err) => {
        if (err) {
          console.error(`Failed to download icon from ${item.icon}: ${err}`);
        } else {
          console.log(`Successfully downloaded icon from ${item.icon}`);
        }
      });
    }
  }
};

//扁平处理数据
const transformData = () => {
  const tree = getIconUrl();
  if (!tree) {
    console.error("Tree data is undefined");
    return [];
  }
  const transformer = (tree) => {

    function traverse(node) {
      if (node.cards) {
        node.cards = node.cards.map((card) => {
          const code = card.title.replace(/\./g, "-").replace(/\s/g, "-").toLowerCase();
          return {
            title: card.title,
            code: code,
            icon: card.icon || "",
            ...card
          };
        });
      }
      if (node.children) {
        node.children.forEach((child) => traverse(child));
      }
    }

    tree.forEach((root) => traverse(root));
    return tree;
  };
  const newArray = transformer(tree);

  // 将 newArray 写回 tree.json 文件
  try {
    const fileData = JSON.parse(fs.readFileSync(treePath, "utf8"));
    fileData.data = newArray;
    console.log(newArray);
    fs.writeFileSync(treePath, JSON.stringify(fileData, null, 2), "utf8");
    console.log("Data successfully written to tree.json");
  } catch (error) {
    console.error("Error writing to tree.json:", error);
  }
};

const main = async () => {
  downloadIcon()
};

await main();