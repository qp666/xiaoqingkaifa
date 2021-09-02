<template>
    <view class="content">
        <view>
            <uni-calendar :insert="true" :lunar="true" :start-date="'2019-3-2'" :end-date="'2019-5-20'" @change="change"></uni-calendar>
        </view>
        <view class="weather">
            <text class="title">{{title}}</text>
            <text class="title">{{text}}</text>
        </view>
    </view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar_1.3.16/uni-calendar.vue';
export default {
    data() {
        return {
            title: '首页',
            text: '',
            list: {}
        }
    },
    components: {
        uniCalendar
    },
    methods: {
        change(e) {
            console.log('change', e);
        },
        sendGet() {
            uni.request({
                url: 'http://www.weather.com.cn/data/cityinfo/101280601.html',
                success: res => {
                    console.log(res)
                    if (res.statusCode === 200) {
                        let obj = res.data.weatherinfo

                        this.title = `${obj.city}今日的天气-${obj.weather}`
                        this.text = `今日最高温度为${obj.temp2},最低温度为${obj.temp1}`
                    }
                }
            })

        }
    },
    onShow() {
        this.sendGet()
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
.weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rpx;
}
</style>
