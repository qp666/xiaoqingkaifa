<template>
    <view class="mlos-pos-fixed page-loading" v-if="loading">
        <view class="loading-bg mlos-pos-abs" catchtouchmove="touchmoveCatcher"></view>
        <view class="loading-main mlos-pos-abs" catchtouchmove="touchmoveCatcher">
            <view class="loading-main-logo mlos-pos-abs">
                <image class="icon" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1c74d32665f4127b86341009f88e3c3~tplv-k3u1fbpfcp-watermark.image"></image>
            </view>
            <image class="loading-main-rotate mlos-pos-abs" src="https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210803/halzba6j2dvis3p2m08v.png"></image>
        </view>
        <view class="tips mlos-flex-center mlos-pos-abs mlos-radius-18 mlos-fs-20 mlos-fc-fff mlos-bsizing-bb mlos-pl-14 mlos-pr-14" v-if="title">{{title}}</view>
    </view>
</template>
<script type="text/javascript" src="./loading.js"></script>
<style lang="less" scoped>
// @import "@/dist/milleros/ResetStyle";
@import "./loading.less";
</style>