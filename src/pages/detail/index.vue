<template>
    <view class="content">
        <image class="logo" src="/static/dangyuan.jpeg"></image>
        <view>
            <uni-calendar :insert="true" :lunar="true" :start-date="'2019-3-2'" :end-date="'2019-5-20'" @change="change"></uni-calendar>
        </view>
        <view>
            <text class="title">{{title}}
                <text class="tltle2">你好啊啊</text>
            </text>
        </view>
        <view>
            <text v-for='(item, index) in list ' :key='index' class="title">{{item}}</text>
        </view>
        <button @click="pullDown">点击下拉刷新</button>
        <navigator open-type="switchTab" url="/pages/index/index">去首页</navigator>
        <button @click="goMessage">去详情页</button>
        <view class="iconfont i_coupon"></view>
    </view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar_1.3.16/uni-calendar.vue';
export default {
    data() {
        return {
            title: '详情页面',
            list: ['前端', '后端', '测试', '产品']
        }
    },
    onLoad() {

    },
    methods: {
        pullDown() {
            uni.startPullDownRefresh();
        },
        goMessage() {
            uni.switchTab({
                url: '/pages/message/index'
            });
        },
        change(e) {
            console.log('change',e);
        }
    },
    onPullDownRefresh() {
        console.log('下拉刷新成功');
        this.list = [1, 2, 3, 4, 5, 6, 7]
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
    },
    components: {
        uniCalendar
    }
}
</script>

<style lang="scss" scoped>
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

    .tltle2 {
        color: red;
    }
}
</style>
