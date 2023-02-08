<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>
 
<script>
export default {
    data() {
        return {
            url: ''//指向网页跳转的连接
        }
    },
    onLoad(options) {
        var that = this
        that.url = `https://lab.lalkk.com/web/bd/?q=${options.url}`
        console.log('options.url',options,that.url)
    },
    methods: {

    }
}
</script>