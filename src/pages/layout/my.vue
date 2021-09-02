<template>
    <view class="my_content">
        <view class="top_back_img">
            <view class="top_name mlos-flex-start">
                <image style="width:70rpx;height:70rpx;margin-right:10rpx" src="https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210811/5fgvf4wez9iti2b2ckq2.png" alt="">
                    <!-- <image style="width:70rpx;height:70rpx;margin-right:10rpx" src="../../static/dangyuan.jpeg" alt=""> -->
                    <text class="title">{{title}}</text>
            </view>
        </view>
        <view class="my_view">
            <view class="my_view_item  mlos-flex-start" v-for="(item,index) in list" :key="index">
                <image style="width:50rpx;height:50rpx;margin-right:20rpx;margin-left:80rpx" src="https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210811/5fgvf4wez9iti2b2ckq2.png" alt="">
                    <text class="my_view_item_title">{{title}}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: '第一企业小卿集团',
            list: [1, 2, 3]
        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">
.my_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .top_back_img {
        padding-top: 100rpx;
        padding-left: 50rpx;

        height: 320rpx;
        width: 100%;
        background-image: url(https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210811/znanne3emugvmt3tf8v1.png);
        background-repeat: no-repeat;
        background-size: 100% 320rpx;
        .top_name {
            .title {
                font-size: 44rpx;
                color: #cc8e35;
                font-weight: bold;
            }
        }
    }

    .my_view {
        width: 85%;
        // background-color: #fff;
        position: absolute;
        top: 220rpx;
        .my_view_item {
            width: 100%;
            height: 220rpx;
            background-color: #fff;
            margin-bottom: 60rpx;
            border-radius: 10rpx;
            box-shadow: 0 16rpx 16rpx rgba(10, 16, 20, 0.24),
                0 0 16rpx rgba(10, 16, 20, 0.12);

            .my_view_item_title {
                font-weight: bold;
                color: #ffa801;
            }
        }
    }
}
</style>
