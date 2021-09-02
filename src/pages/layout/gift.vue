<template>
    <view class="content">
        <view class="page_top">
        </view>
        <view class="page_title">
            <text class="title_left">礼品卡</text>
            <view class="title_right">
                <view class="item_text">
                    <view class="iconfont icon-yiwancheng"></view>
                    <text>我的礼品卡</text>
                </view>
                <view @click="goHistory" class="item_text">
                    <view class="iconfont icon-woyaofankui"></view>
                    <text>购买历史</text>
                </view>
            </view>
        </view>
        <view class="gift_main">
            <view @click="imageClick" class="gift_item" v-for='(item,index) in imageList ' :key='index'>
                <image :src="item" mode="" />
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: '礼品页面',
            imageList: [
                'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42448dfae06b4e4b9601a1bffb75e722~tplv-k3u1fbpfcp-watermark.image',
                'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8beabd6e91884387a3ae8f3c81b78350~tplv-k3u1fbpfcp-watermark.image',
                'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dee46c6c5d28498482f7c693f5d90d2b~tplv-k3u1fbpfcp-watermark.image',
                'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/898e34cc119b46bca606f2e9f375b527~tplv-k3u1fbpfcp-watermark.image',
                'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/815f5764c71f489296ad4ee7bd862df8~tplv-k3u1fbpfcp-watermark.image',
                'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cbd8a3d8b3f4f31a2461070b642f47f~tplv-k3u1fbpfcp-watermark.image'
            ]
        }
    },
    onLoad() {

    },
    methods: {
        imageClick() {
            uni.showToast({
                icon: 'none',
                title: '...',
                duration: 2000
            });
        },
        //前往历史页面
        goHistory() {
            console.log('购买历史');
            uni.navigateTo({
                url: '/pages/history/index'
            });
        }
    }
}
</script>

<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .page_top {
        width: 100%;
        height: 180rpx;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background-color: #fff;
    }

    .page_title {
        box-sizing: border-box;
        padding: 0rpx 20rpx 20rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 1px solid #eceef0;
        box-shadow: 0 1px 1px #fff;
        .title_left {
            font-size: 48rpx;
            font-weight: bold;
            color: #4f535c;
        }

        .title_right {
            font-size: 28rpx;
            color: #588ba1;
            display: flex;
            .item_text {
                display: flex;
                align-items: center;
                margin-right: 20rpx;
                .iconfont.icon-yiwancheng {
                }

                text {
                }
            }
        }
    }

    .gift_main {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        box-sizing: border-box;
        padding: 50rpx 0rpx 300rpx;

        .gift_item {
            width: 44%;
            height: 480rpx;
            border: 1px solid #eceef0;
            box-shadow: 0 1px 1px #fff;
            margin-bottom: 20rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
