# 一份前端够用的 Linux 命令

![参考链接](https://github.com/mqyqingfeng/Blog/issues/239)

## 1. 查看系统版本、内核信息

```bash
# 查看系统版本
cat /etc/os-release

# 查看内核版本
uname -r

# 查看系统架构
arch

# 查看系统和内核的详细信息
uname -a

# 查看 Linux 发行版信息
lsb_release -a
```

## 2. linux 解压文件

```bash
# 解压 tar.gz 文件
tar -zxvf file.tar.gz

# 解压 zip 文件
unzip file.zip
```
