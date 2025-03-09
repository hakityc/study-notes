# ubuntu安装mongodb

## 一、下载安装包 [地址](https://www.mongodb.com/try/download/community-kubernetes-operator)

## 二、安装

### 1. 安装.deb文件

使用dpkg命令来安装.deb文件。例如：

```bash
sudo dpkg -i package_name.deb
```

将package_name.deb替换为您的.deb文件名。

### 2. 解决依赖问题

如果在安装过程中出现依赖问题，您可以使用apt-get来解决：

```bash
sudo apt-get install -f
```

这个命令会尝试修复任何未满足的依赖关系。

### 3. 确认安装成功

您可以通过列出已安装的包来确认.deb文件是否已成功安装：

```bash
dpkg -l | grep package_name
```

替换package_name为您安装的软件包名称。

## 三、配置

### 1. 创建数据和日志目录

MongoDB需要一个数据目录来存储数据库文件，以及一个日志目录来记录操作日志。作为root用户，您可以创建这些目录并设置适当的权限：

```bash
创建数据目录
sudo mkdir -p /var/lib/mongo
sudo chown -R mongodb:mongodb /var/lib/mongo

创建日志目录
sudo mkdir -p /var/log/mongodb
sudo chown -R mongodb:mongodb /var/log/mongodb
这里，mongodb是MongoDB进程运行的系统用户和组。如果您的系统中没有这个用户和组，您需要创建它们：
```

```bash
添加MongoDB用户和组（如果不存在）
sudo groupadd mongodb
sudo useradd -r -g mongodb -d /var/lib/mongo mongodb
```

### 2. 配置mongod服务

MongoDB的配置文件通常位于/etc/mongod.conf。您需要创建或编辑这个文件来指定数据和日志目录：

```bash
sudo nano /etc/mongod.conf
```

在配置文件中，您可以添加以下内容：

```yaml
storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1 # 您可以在这里设置允许连接的IP地址
```

## 四、启动服务

配置完成后，您可以启动MongoDB服务：

```bash
sudo systemctl start mongod
```

确保mongod服务在系统启动时自动启动：

```bash
sudo systemctl enable mongod
```

 验证MongoDB配置
您可以通过检查服务状态来验证MongoDB是否正在运行：

```bash
sudo systemctl status mongod
```

## 五、安装MongoDB Shell

MongoDB Shell是MongoDB的命令行工具，用于与MongoDB进行交互。您可以使用apt-get来安装MongoDB Shell：

### 1. 安装 MongoDB Shell

```bash
sudo apt install mongodb-mongosh
```

### 2. 验证安装

安装完成后，您可以再次运行以下命令来检查 mongosh 命令的版本：

```bash
mongosh --version
```

## 六、设置管理员用户

### 1. 启动MongoDB Shell

```bash
mongosh
```

### 2. 连接到admin数据库

```bash
use admin
```

### 3. 创建用户

在admin数据库中创建一个名为root的用户，并赋予管理员权限。以下是创建用户的命令：

```bash
db.createUser({
  user: "root",
  pwd: "yourStrongPasswordHere",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "root", db: "admin" }
  ]
})
```

请将yourStrongPasswordHere替换为一个强密码。

+ userAdminAnyDatabase角色允许用户在任何数据库中创建、删除和管理用户。
+ readWriteAnyDatabase角色允许用户在任何数据库中读写数据。
+ dbAdminAnyDatabase角色允许用户在任何数据库中执行管理操作，如修整、重建索引等。
+ root角色是MongoDB中的超级用户角色，具有所有数据库的所有权限。

### 4. 验证用户创建

您可以列出admin数据库中的所有用户来验证root用户是否已成功创建：

```bash
db.getUsers()
```

### 5. 退出MongoDB Shell

```bash
exit
```
