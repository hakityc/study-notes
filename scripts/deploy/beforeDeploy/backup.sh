# # 获取当前所在分支
# branch=$(git rev-parse --abbrev-ref HEAD)

# # 检查当前分支是否为 beta 或 pro 分支
# if [ "$branch" != "beta" ] && [ "$branch" != "pro" ]; then
#     printf "\n⚠️  当前分支为 %s ，不能部署 beta 环境\n\n" "$branch"
#     exit 1
# fi

# # 确认是否是最新版本
# printf "🧐  确定%s为最新版本吗?(y/n)\n\n" "$npm_package_version"
# read answer
# while [ "$answer" != "y" ] && [ "$answer" != "n" ]; do
#     printf "\n🤨  请输入y或者n\n\n"
#     read answer
# done
# if [ "$answer" != "y" ]; then
#     printf "\n😓  请更新version版本后再执行部署\n\n"
#     exit 1
# fi
# printf "\n🥳  好的，正在为你打包文件...\n"
