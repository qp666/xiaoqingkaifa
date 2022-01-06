<template>
    <view class="my_content">
        <!--pages/my/my.wxml-->
        <view class="my-container">
            <!-- 头部 -->
            <view class="header">
                <image class="avatar" :src="userInfo.avatarUrl ? userInfo.avatarUrl :'../../static/imgs/qinglogo.png'"></image>
                <!-- <view @tap="goLogin" :class="nickname">{{userInfo.nickName ? userInfo.nickName : '点击登录'}}</view> -->
            </view>
            <!-- 提示 -->
            <view class="tips">
                <view class="left">
                    <view class="title">{{userInfo.study_hour ? userInfo.study_hour : '0'}}</view>
                    <view class="subtitle">我的粉丝</view>
                </view>
                <view class="middle">
                    <view class="title">{{userInfo.follow_count ? userInfo.follow_count : '0'}}</view>
                    <view class="subtitle">我的关注</view>
                </view>
                <view class="right">
                    <view class="title">{{userInfo.mailList_count ? userInfo.mailList_count : '0'}}</view>
                    <view class="subtitle">我的礼品</view>
                </view>
            </view>
            <!-- 菜单cell -->
            <view class="cells">
                <view class="cell">
                    <view>
                        <text>当前版本</text>
                    </view>
                    <view>
                        <text class="versionNumber">{{versionNumber}}</text>
                    </view>
                </view>
                <view class="cell">
                    <view>
                        <text>粉丝中心</text>
                    </view>
                    <image src="../../static/imgs/arrow@2x.png"></image>
                </view>
                <view class="cell">
                    <view>
                        <text>消息提醒</text>
                    </view>
                    <image src="../../static/imgs/arrow@2x.png"></image>
                </view>
                <view class="cell">
                    <view>
                        <text>清除缓存</text>
                    </view>
                    <image src="../../static/imgs/arrow@2x.png"></image>
                </view>
                <view class="cell">
                    <view>
                        <text>商务合作</text>
                    </view>
                    <image src="../../static/imgs/arrow@2x.png"></image>
                </view>
                <view @tap="makeCall" class="cell">
                    <view>
                        <text>在线客服</text>
                    </view>
                    <image src="../../static/imgs/arrow@2x.png"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import config from '../../../package.json'
export default {
    data() {
        return {
            userInfo: {},
            title: '第一企业小卿集团',
            list: [1, 2, 3],
            versionNumber: config.version,
        }
    },
    onLoad() {

    },
    methods: {
        makeCall() {
            wx.makePhoneCall({
                phoneNumber: '110' //仅为示例，并非真实的电话号码
            })
        }
    }
}
</script>

<style lang="scss">
.my_content {
    padding-bottom: 280rpx;
    .my-container {
        position: relative;
    }

    .cell .versionNumber {
        font-size: 40rpx;
        color: #900;
        font-weight: bold;
        margin-right: 10rpx;
    }

    .header {
        width: 750rpx;
        height: 440rpx;
        background-color: #5c94f8;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .avatar {
        width: 176rpx;
        height: 176rpx;
        border-radius: 50%;
    }

    .nickname {
        margin-top: 30rpx;
        font-size: 21px;
        color: #fff;
    }

    .tips {
        position: absolute;
        top: 400rpx;
        left: 32rpx;
        right: 32rpx;
        border-radius: 12rpx;
        height: 174rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .title {
        text-align: center;
        font-size: 26px;
        color: #333;
    }

    .subtitle {
        margin-top: 10rpx;
        text-align: center;
        font-size: 12px;
        color: #a8a8a8;
        font-weight: bold;
    }

    .left,
    .middle,
    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .middle {
        position: relative;
    }

    .middle::before {
        content: "";
        position: absolute;
        left: 0;
        top: 30rpx;
        height: 62rpx;
        width: 3rpx;
        background-color: #ebebeb;
    }

    .middle::after {
        content: "";
        position: absolute;
        right: 0;
        top: 30rpx;
        height: 62rpx;
        width: 3rpx;
        background-color: #ebebeb;
    }

    .cells {
        background-color: #fff;
        border-radius: 12rpx;
        margin-top: 160rpx;
        margin-left: 32rpx;
        margin-right: 32rpx;
        height: 730rpx;
        margin-bottom: 32rpx;
    }

    .cell {
        height: 120rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f8f8f8;
        padding: 0rpx 20rpx;
    }

    .cell text {
        font-size: 30rpx;
        color: #333;
    }

    .cell image {
        width: 48rpx;
        height: 48rpx;
    }
}
</style>
