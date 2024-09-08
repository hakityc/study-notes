#!/usr/bin/env zx

// rsa路径
// const rsa_path = "C:/Users/LX/.ssh/tyc_rsa"
const rsa_path="C:/Users/Administrator/.ssh/aliyun.rsa"
// 源文件
const source_dir = "build/*"
// 目标目录
const target_dir = "root@139.196.10.107:/usr/local/nginx"

console.log(`🚀 正在部署...`)

await $`scp -i $rsa_path -r $source_dir $target_dir`

console.log(`🎉 部署成功！`)
