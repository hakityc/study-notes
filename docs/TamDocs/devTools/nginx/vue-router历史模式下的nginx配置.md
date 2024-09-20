# vue-router历史模式下的nginx配置

## 根路径访问

nginx配置  

```nginx
location / {
try_files $uri $uri/ /index.html;
}
```

## 非根路径访问

nginx配置  

```nginx
location /app/ {
    alias /path/app/;
    try_files $uri $uri/ /app/index.html;
}
```

打包工具配置(vue-cli/webpack)

```ts
publicPath: '/knowledgeGraph/'
```
