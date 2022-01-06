<template>
    <view class="homePage">
        <view class="home_view" v-if="current === 0">
            <!-- <component :is="currentComponent"></component>   -->
            <home />
        </view>
        <view class="home_view" v-if="current === 1">
            <order />
        </view>
        <view class="home_view" v-if="current === 2">
            <gift />
        </view>
        <view class="home_view" v-if="current === 3">
            <my />
        </view>
        <view class="home_tabbar">
            <view :class="current === index?'active':''" @click="tabBarClick(index)" v-for='(item,index) in tabBarList ' :key='index' class="tabbar_item">
                <view :class="item.icon"></view>
                <text class="tabbar_item_text">{{item.name}}</text>
            </view>
        </view>
    </view>
</template>

<script>
import home from '../layout/home.vue';
import order from '../layout/order.vue';
import gift from '../layout/gift.vue';
import my from '../layout/my.vue';

export default {
    name: 'index',
    data() {
        return {
            currentComponent: home,
            current: 0,
            tabBarList: [{
                icon: 'iconfont tabbar_item_icon icon-zhuye',
                name: '首页',
                component: home,
            }, {
                icon: 'iconfont tabbar_item_icon icon-quanbudingdan',
                name: '日历',
                component: order,
            }, {
                icon: 'iconfont tabbar_item_icon icon-xueshengqingjia',
                name: '礼品',
                component: gift,
            }, {
                icon: 'iconfont tabbar_item_icon icon-wode',
                name: '我的',
                component: my,
            }]

        }
    },
    components: {
        home,
        order,
        gift,
        my
    },
    onPageScroll(e) {
        // debugger
        let that = this;
        console.log(e.scrollTop);
        // that.showTopTitle = e.scrollTop > 180
    },
    methods: {
        tabBarClick(i) {
            console.log('当前点击的是:', i);
            if (i === this.current) {
                return
            }
            this.current = i;
            //微信api - 震动
            wx.vibrateShort()
            // wx.vibrateLong();
        }
    },
    onShareAppMessage: function () {
        return {
            title: '小卿开发小程序',
            desc: '最具人气的小程序开发联盟!',
            path: '/pages/index/index'
        }
    },
    onShow() {
        console.log(this.navigationStyle);
    },
    onPullDownRefresh() {

        if (this.current === 0) {
            uni.stopPullDownRefresh();
        } else {
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        }
    },
}
</script>

<style lang='scss'>
.homePage {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #f8f9fc;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .home_tabbar {
        height: 130rpx;
        width: 90%;
        background-color: #ffffff;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, -0.81);
        position: absolute;
        border-radius: 70rpx;
        left: 50%;
        bottom: 3%;
        transform: translate(-50%, 0%);

        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .active {
            color: #5dcbf5;
        }
        .tabbar_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100rpx;
            .tabbar_item_icon {
                font-size: 44rpx;
                margin-bottom: 4rpx;
            }
            .tabbar_item_text {
                font-size: 22rpx;
            }
        }
    }
}
</style>
