<template>
    <view class="content">
        <image class="logo" src="/static/dangyuan.jpeg"></image>
        <view>
            <text class="title">{{title}}</text>
        </view>
        <button @click="btnFun">按钮震动</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: '信息页面'
        }
    },
    onLoad() {

    },
    methods: {
        btnFun() {
            // wx.vibrateShort()
			// wx.vibrateLong();
        }
    }
}
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
