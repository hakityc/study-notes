```markdown
# 记一次Git SSH配置踩坑：解决`Could not resolve hostname github`错误

## 问题现象
执行`git pull`时持续报错：
```bash
ssh: Could not resolve hostname github: nodename nor servname provided, or not known
fatal: 无法读取远程仓库。
请确认您有正确的访问权限并且仓库存在。
```

## 排查过程

### 1. 检查SSH基础配置
```bash
# 验证密钥文件权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*

# 测试SSH连接
ssh -T git@github.com
```
▶️ 确认密钥认证正常（返回`successfully authenticated`）

### 2. 检查代理配置
```bash
# 查看git代理设置
git config --global --get http.proxy
git config --global --get https.proxy

# 临时关闭代理测试
unset http_proxy
unset https_proxy
```
▶️ 排除代理干扰因素

### 3. 关键发现：SSH配置文件
查看`~/.ssh/config`内容：
```ssh-config
# ❌ 问题配置
Host github
    HostName github.com
    IdentityFile ~/.ssh/github_rsa
```

仓库地址配置：
```bash
git remote -v
# 显示 origin git@github.com:somebody/demo.git (fetch)
```

## 故障原因
SSH配置中将`github.com`声明为别名`github`，但仓库地址仍使用原始域名：
```
配置别名: git@github
仓库地址: git@github.com
```

## 解决方案

### 方案一：保持别名配置
修改远程仓库地址适配别名：
```bash
git remote set-url origin git@github:somebody/demo.git
```

### 方案二：修正SSH配置
修改`~/.ssh/config`：
```ssh-config
# ✅ 正确配置
Host github.com
    HostName github.com
    IdentityFile ~/.ssh/github_rsa
    User git
```

## 验证配置
```bash
ssh -T git@github.com
# 预期输出: Hi somebody! You've successfully authenticated...
```

## 原理说明
| 配置项        | 作用                          |
|-------------|-----------------------------|
| `Host`      | 定义连接别名（显示名称）             |
| `HostName`  | 指定实际服务器地址                 |
| `IdentityFile` | 指定对应密钥文件                |

当使用`git@github:somebody/demo.git`时：
1. 解析`Host github`配置
2. 实际连接`github.com`使用指定密钥

## 总结
1. SSH配置中的`Host`需要与仓库地址域名严格对应
2. 多账号环境建议采用不同Host别名：
   ```ssh-config
   Host github-work
       HostName github.com
       IdentityFile ~/.ssh/work_rsa
       
   Host github-personal
       HostName github.com
       IdentityFile ~/.ssh/personal_rsa
   ```
3. 修改配置后建议执行`ssh -T`测试连接

```