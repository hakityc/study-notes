# [memos](https://github.com/usememos/memos)

## 1. 安装
>
> 先安装[docker](https://docs.docker.com/engine/install/ubuntu/)
>
> Memos 服务的部署
>仓库地址： <https://github.com/usememos/memos>

a. 先在服务器创建一个目录用来存储 Memos 数据。

```bash
mkdir /vars/server/memos
```

b. 拉取[Memos镜像](https://hub.docker.com/r/neosmemo/memos)

```bash
docker pull neosmemo/memos
```

c. 运行 Memos 服务

```bash
docker run -d --name memos -p 5230:5230 -v /vars/server/memos/:/var/opt/memos neosmemo/memos:latest
```

## 2. 使用

a. 直接访问 Memos 服务

```bash
http://your-ip:5230
```

b. utools+Memos（推荐🌟）

安装utools的memos插件，配置memos服务地址和token后，搭配超级面板使用。
