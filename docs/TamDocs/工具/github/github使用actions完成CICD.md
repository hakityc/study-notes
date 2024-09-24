# GitHub 使用 Actions 完成 CI/CD

## 一、配置

```yaml
name: Build and Deploy on Aliyun

on:
  push:
    branches:
      - main
  # 可选：添加 pull_request 支持
  # pull_request:
  #   branches:
  #     - main

env:
  NODE_VERSION: "18"
  BUILD_DIR: ${{ vars.BUILD_DIR }}
  DEPLOY_USER: ${{ vars.USER }}
  DEPLOY_SERVER: ${{ secrets.SERVER }}
  DEPLOY_PATH: ${{ vars.DEPLOY_PATH }}

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Archive Production Artifact
        uses: actions/upload-artifact@v3
        with:
          name: build-artifact
          path: ${{ env.BUILD_DIR }}

      - name: Check Build Dir
        run: | 
          pwd
          ls -a ${{ env.BUILD_DIR }}

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Download Build Artifact
        uses: actions/download-artifact@v3
        with:
          name: build-artifact

      - name: Deploy to Staging Server
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          ARGS: "-rlgoDzvc -i"
          SOURCE: "/"
          REMOTE_HOST: ${{ env.DEPLOY_SERVER }}
          REMOTE_USER: ${{ env.DEPLOY_USER }}
          TARGET: ${{ env.DEPLOY_PATH }}
          # EXCLUDE: "/dist/, /node_modules/"
          SCRIPT_BEFORE: |
            ls -a
          SCRIPT_AFTER: |
            ls -a
            echo $RSYNC_STDOUT
```

## 二、疑难杂症

### 1. 打包的时候没有按照配置中的路径打包（暂未解决）

**问题描述**：

- 正常情况下，`Build Project` 应该会把项目打包到 `env.BUILD_DIR`，但排查发现打包到了 `xxx/project-name/project-name`。

**临时解决方案**：

- 逐步调试 `Deploy to Staging Server` 中的 `SOURCE`，查看具体路径是什么。

### 2. 新增文件或修改文件名后，没有触发 Vite 的热更新（暂未解决）

**问题描述**：

- 修改文件后，没有触发 Vite 的热更新，需要手动重启服务。

<!-- **临时解决方案**：

- 手动重启服务。
- 检查 Vite 配置文件，确保 `hot: true` 已经启用。
- 确认文件系统监控是否正常工作，可以尝试增加 `watchOptions` 配置，例如：

```javascript
// vite.config.js
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // 检查文件变化的间隔时间（毫秒）
    },
  },
});
``` -->
