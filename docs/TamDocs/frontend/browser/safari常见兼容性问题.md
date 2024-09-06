# Safari兼容性问题

##  ios 设置100vh 出现滚动条问题

参考链接：https://stackoverflow.com/a/54178261/20505934

解决方法：

```vue
<template>
    <div ref="appContainerRef" class="container">
    </div>
</template>

<script>
  onMounted(()=>{
      if (navigator.userAgent.match(/Safari/) && navigator.userAgent.match(/iPhone|iPad/) && appContainerRef.value) {
        appContainerRef.value.style.height = `${window['innerHeight']}px`
      }
  })
</script>

<style>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
</style>
```