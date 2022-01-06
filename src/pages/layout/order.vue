<template>
    <view class="order_content">
        <view class="page_top">
            <text class="page_title">{{title}}
            </text>
        </view>
        <!-- <image class="logo" src="/static/dangyuan.jpeg"></image> -->
        <view>
            <uni-calendar :insert="true" :lunar="true" :start-date="'1990-3-2'" :end-date="'2088-5-20'" @change="change"></uni-calendar>
            <!-- <van-calendar  :poppable="false" :show-confirm="false" class="calendar" /> -->
        </view>
        <!-- <view>
            <text class="title">{{title}}
                <text class="tltle2">你好啊啊</text>
            </text>
        </view> -->
        <!-- <view>
            <text v-for='(item, index) in list ' :key='index' class="title">{{item}}</text>
        </view> -->
        <!-- <button @click="pullDown">点击下拉刷新</button>
        <navigator open-type="switchTab" url="/pages/index/index">去首页</navigator>
        <button @click="goMessage">去详情页</button> -->
        <view class="states">
            <view>宜:<text style="color: #ffa801;font-size: 56rpx;font-weight: bold;">{{is_yi}}</text></view>
            <view>忌:<text style="color: #ff3f34;font-size: 56rpx;font-weight: bold;">{{is_ji}}</text></view>
        </view>
    </view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar_1.3.16/uni-calendar.vue';
export default {
    data() {
        return {
            title: '日历页面',
            list: ['前端', '后端', '测试', '产品'],
            fulldate: '',
        }
    },
    onLoad() {

    },
    computed: {
        is_yi() {
            let num = Math.floor(Math.random() * 10 + 1);
            // let text = (this.fulldate && num % 2) ? '123' : '456';
            let text = this.fulldate ? (num % 2 ? '吃饭' : '喝水') : '';
            return text
        },
        is_ji() {
            let num = Math.floor(Math.random() * 10 + 1);
            // let text = (this.fulldate && num % 2) ? '123' : '456';
            let text = this.fulldate ? (num % 2 ? '打架' : '出门') : '';
            return text
        },
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
            console.log('change', e);
            this.fulldate = e.fulldate;
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
.order_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .calendar {
        --calendar-height: 500px;
    }
    .page_top {
        width: 100%;
        height: 180rpx;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background-color: #fff;
        .page_title {
            margin-bottom: 50rpx;
            // color: #fff;
            font-size: 37rpx;
        }
    }
    .states {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 20rpx;
    }
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
