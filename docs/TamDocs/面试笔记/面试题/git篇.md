# Git面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## 1. 版本控制是什么？常见的版本控制系统有哪些？

<AnswerBlock >

**版本控制**是维护工程蓝图的标准过程，用于跟踪文件变更并支持多人协作开发。通过版本控制，开发者可以随时恢复到任意历史版本。

**常见分类**：  

- **本地版本控制系统**（如RCS）  
- **集中式版本控制系统**（如SVN、CVS）  
- **分布式版本控制系统**（如Git、Mercurial）  

**Git特点**：  

- 分布式存储，每个节点完整镜像仓库  
- 高效处理大项目和分支管理  
- 支持离线操作
</AnswerBlock>

## 2. 简述Git的工作原理和核心组件？

<AnswerBlock >

**核心组件**：  

- **工作区**：本地编辑代码的目录  
- **暂存区**：临时存放待提交的文件变更（.git/index）  
- **本地仓库**：最终存储提交历史的数据库（.git目录）  
- **远程仓库**：共享协作的中央仓库（如GitHub）  

**工作流程**：  

1. 修改文件（工作区）  
2. `git add` 提交到暂存区  
3. `git commit` 保存到本地仓库  
4. `git push` 同步到远程仓库
</AnswerBlock>

## 3. 列举Git常用命令（至少10个）？

<AnswerBlock >

**基础操作**：  

- `git init` 初始化仓库  
- `git clone <url>` 克隆远程仓库  
- `git add <file>` 暂存文件  
- `git commit -m "msg"` 提交变更  

**分支管理**：  

- `git branch` 查看分支  
- `git checkout -b <branch>` 创建并切换分支  
- `git merge <branch>` 合并分支  

**远程操作**：  

- `git remote add origin <url>` 添加远程仓库  
- `git push origin <branch>` 推送分支  
- `git pull` 拉取并合并远程变更  

**历史与撤销**：  

- `git log` 查看提交历史  
- `git reset --hard <commit>` 回退版本  
- `git revert <commit>` 撤销提交
</AnswerBlock>

## 4. 解释Git中HEAD、工作树和索引的区别？

<AnswerBlock >

**HEAD**：  

- 指向当前所在分支的指针，通常为`refs/heads/master`  
- 切换分支时，HEAD指向新分支的最新提交  

**工作树**：  

- 实际编辑文件的目录，包含当前工作状态  
- 直接操作文件的地方  

**索引（暂存区）**：  

- 临时存储待提交的变更  
- 通过`git add`将文件加入索引  
- 提交时将索引内容保存到本地仓库  

**关系**：  

工作树 → 暂存区 → 本地仓库 → 远程仓库

</AnswerBlock>

## 5. 如何解决Git合并冲突？

<AnswerBlock >

**冲突场景**：  

- 多人修改同一文件的同一区域  
- 分支修改后提交顺序冲突  

**解决步骤**：  

1. 执行`git merge`发现冲突  
2. 编辑冲突文件，手动修改标记区域：  

    ```bash
    <<<<<<< HEAD
    当前分支修改内容
    =======

    合并分支修改内容
    >>>>>>> branch-name
    ```

3. 保存后执行`git add <file>`标记冲突已解决
4. 提交合并结果：`git commit`  

**工具辅助**：  

- 使用IDE（如VS Code）可视化合并  
- `git mergetool` 调用外部工具
</AnswerBlock>

## 6. 简述fork、clone、branch的区别？

<AnswerBlock >

**fork**：  

- 在代码托管平台（如GitHub）复制他人仓库到自己账号  
- 用于开源协作时创建个人副本  

**clone**：  

- 从远程仓库下载完整代码到本地  
- 包含所有分支和提交历史  

**branch**：  

- 在本地仓库创建独立开发分支  
- 通过`git branch`管理，支持并行开发  

**核心区别**：  

- fork是平台级操作，clone是下载代码，branch是本地分支管理  
- fork产生独立仓库，branch是同一仓库的不同开发路径
</AnswerBlock>

## 7. 比较git pull和git fetch的区别？

<AnswerBlock >

**相同点**：  

- 均用于获取远程仓库更新  

**不同点**：  

| 命令       | 操作                          | 合并方式           |  
|------------|-------------------------------|--------------------|  
| `git fetch`| 仅下载远程更新到本地缓存      | 需手动`git merge`  |  
| `git pull` | 下载并自动合并到当前分支      | 自动执行`fetch + merge` |  

**推荐场景**：  

- 使用`git fetch`后检查更新，再决定是否合并  
- 快速获取并应用更新时使用`git pull`
</AnswerBlock>

## 8. 比较git merge和git rebase的区别？

<AnswerBlock >

**git merge**：  

- 合并分支时生成新的提交（merge commit）  
- 保留所有分支的历史记录  
- 适用于公共分支的合并  

**git rebase**：  

- 将当前分支的提交应用到目标分支的最新提交上  
- 改写提交历史，使分支线性化  
- 适合个人分支的整理  

**核心区别**：  

- merge保留分支分叉历史，rebase重写提交顺序  
- rebase后需谨慎使用`git push --force`
</AnswerBlock>

## 9. 比较git reset和git revert的区别？

<AnswerBlock >

**git reset**：  

- 回退到指定提交，删除后续提交  
- 直接修改分支指针（HEAD）  
- 慎用已公开的提交  

**git revert**：  

- 创建新提交撤销旧提交的影响  
- 保留原提交历史  
- 安全撤销已推送的提交  

**使用场景**：  

- 本地实验性提交用`git reset`  
- 生产环境错误用`git revert`  
</AnswerBlock>

## 10. 简述git stash的作用和使用场景？

<AnswerBlock >

**作用**：  

- 临时保存未提交的工作进度（暂存区和工作区）  
- 支持在不同分支间切换时保留修改  

**常用命令**：  

- `git stash save "message"` 保存进度  
- `git stash list` 查看所有保存的进度  
- `git stash pop` 恢复最新进度并删除  
- `git stash apply` 恢复但保留进度  

**应用场景**：  

- 临时切换分支处理紧急任务  
- 保存未完成的修改以便后续继续开发  
- 解决`git pull`时的冲突前备份工作
</AnswerBlock>
