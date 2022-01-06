<template>
    <view class="content">

        <van-toast id="van-toast" />
        <view class="uni-padding-wrap">
            <view class="page-section swiper" :style="{height:imgheights}">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item v-for='(item,index) in swiperImageList ' :key='index' class="banneritem">
                            <view class="banneritem_li swiper-item uni-bg-red">
                                <image mode="scaleToFill" :src="item" alt="">
                            </view>
                        </swiper-item>
                        <!-- <swiper-item class="banneritem">
                            <view class="banneritem_li swiper-item uni-bg-green">
                                <image mode="aspectFill" src="https://qp666.github.io/zsj-%E7%BD%91%E6%98%93%E6%B8%B8%E6%88%8F%E4%B8%BB%E9%A1%B5/upload/zsj_banner05.jpg" alt="">
                            </view>
                        </swiper-item>
                        <swiper-item class="banneritem">
                            <view class="banneritem_li swiper-item uni-bg-blue">
                                <image mode="aspectFill" src="https://qp666.github.io/zsj-%E7%BD%91%E6%98%93%E6%B8%B8%E6%88%8F%E4%B8%BB%E9%A1%B5/upload/zsj_banner03.jpg" alt="">
                            </view>
                        </swiper-item> -->
                    </swiper>
                </view>
            </view>
        </view>
        <view class="middle_content">
            <view v-for='(item,index) in middleList ' :key='index' class="delivery_item">
                <image :src="item.image" alt="">
                    <!-- <text class="delivery_item_names">{{item.names}}</text>
                    <text class="delivery_item_name">{{item.name}}</text> -->
            </view>
        </view>

        <view class="bottom_content">
            <view class="bottom_content_item" v-for='(item,index) in moneyList ' :key='index'>
                <view class="money_content">
                    <view class="money_content_top">
                        <view :class="item.icon"></view>
                        <text>{{item.name}}</text>
                    </view>
                    <view class="money_content_bottom">
                        <view class="left_text">
                            <text class="left_big_text">{{item.money}}</text>
                            <text>{{item.moneyReamrk}}</text>
                        </view>
                        <view class="right_btn">
                            <view @click="btnClick(index)" class="button">{{item.btnText}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            title: '首页',
            swiperImageList: [
                'https://ossweb-img.qq.com/upload/adw/image/977/20210903/9688cce25a8b7d414afb95a9fb5998c6.jpeg',
                'https://ossweb-img.qq.com/upload/adw/image/20210830/972494aaa891de13e83cfa6c299e3165.jpeg',
                'https://ossweb-img.qq.com/upload/adw/image/977/20210903/7f1088e063505bfcf01a0a9415bf1f44.jpeg',
                'https://ossweb-img.qq.com/upload/adw/image/20210827/3dd1f13cbcccf4d4b3b1812b3a810e65.jpeg',
                'https://img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_66ebce2530ea2800397936b6e3c00b91/0',
                // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-11-13%2F5fae23dc73f31.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633570316&t=230bca4596dc95d7ab52d1f0bc895843',
                // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F55%2Fb0%2F3a%2F55b03a586734f099b2e988fc344403af.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633570316&t=733a8f371c1c69f2a27a46ff20e93435'
                // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.soumeitu.com%2Fwp-content%2Fuploads%2F2020%2F07%2F5f053d0bb5cc9.jpg&refer=http%3A%2F%2Fwww.soumeitu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633570316&t=a36a8a52431712020167c0bb50955f75',
                // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.soumeitu.com%2Fwp-content%2Fuploads%2F2020%2F07%2F5f179e9eba4c3.jpg&refer=http%3A%2F%2Fwww.soumeitu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633570316&t=cd8f0e27497f34f65a30d2aed9faad34',
                // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-11-13%2F5fae23dc73f31.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633570316&t=230bca4596dc95d7ab52d1f0bc895843',
                // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F55%2Fb0%2F3a%2F55b03a586734f099b2e988fc344403af.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633570316&t=733a8f371c1c69f2a27a46ff20e93435'

                // --------
                // 'https://uploadstatic.mihoyo.com/contentweb/20210616/2021061612200040357.jpg',
                // 'https://uploadstatic.mihoyo.com/contentweb/20210616/2021061612185745407.jpg',
                // 'https://uploadstatic.mihoyo.com/contentweb/20210603/2021060312070518742.jpg',
                // 'https://uploadstatic.mihoyo.com/contentweb/20210608/2021060812353785357.jpg'
            ],
            background: ['color1', 'color2', 'color3'],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            imgheights: '520rpx',
            middleList: [{
                image: 'https://game.gtimg.cn/images/lol/act/img/champion/Ryze.png',
                name: '瑞 兹',
                names: '符文法师'
            },
            {
                image: 'https://game.gtimg.cn/images/lol/act/img/champion/Teemo.png',
                name: '提 莫',
                names: '迅捷斥候'
            },
            {
                image: 'https://game.gtimg.cn/images/lol/act/img/champion/Ashe.png',
                name: '艾 希',
                names: '寒冰射手'
            }],
            moneyList: [{
                name: '储值余额',
                moneyReamrk: '元',
                money: '0',
                icon: 'iconfont icon-tuiketuikuan',
                btnText: '立即充值'
            },
            {
                name: '会员积分',
                moneyReamrk: '分',
                money: '999999',
                icon: 'iconfont icon-chengchangjilu',
                btnText: '积分兑换'
            },
            {
                name: '已出账单',
                moneyReamrk: '元',
                money: '1123',
                icon: 'iconfont icon-yiwancheng',
                btnText: '查看账单'
            },
            {
                name: '未出账单',
                moneyReamrk: '元',
                money: '23223',
                icon: 'iconfont icon-weifukuan',
                btnText: '查看账单'
            }]
        }
    },
    created() {
        console.log('123123');

        // this.imageLoad();
    },

    methods: {
        imageLoad() {
            // var that = this;
            wx.getSystemInfo({
                success: (res) => {
                    //我们设计图片的尺寸是750*388
                    var width = res.windowWidth;//获取当前屏幕的宽度
                    var rao = 750 / width; //图片宽度／屏幕的宽度
                    var height = 388 / rao; //图片高度／比例
                    this.imgheights = height * 2 + 'rpx';
                    console.log(this.imgheights);
                    // that.setData({
                    //     'imgheights': height //设置等比缩放的宽度
                    // })
                },
            })
        },
        btnClick(index) {
            if (index === 0) {
                this.$toast('暂未提供充值~');
                // uni.showToast({
                //     icon: 'none',
                //     title: '暂未提供充值',
                //     duration: 2000
                // });
            } else {
                this.$toast('想兑换啥?想的美');
                // uni.showToast({
                //     icon: 'none',
                //     title: '想兑换啥?想的美',
                //     duration: 2000
                // });
            }

        }
    },

}
</script>

<style lang="less">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-bottom: 280rpx;
    overflow-y: auto;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
.uni-padding-wrap {
    width: 100%;
    .page-section-spacing {
        height: 100%;
    }
    .swiper {
        width: 100%;
        height: 100%;
        .banneritem {
            width: 100%;
            height: 100%;
            .banneritem_li {
                width: 100%;
                height: 100%;
                image {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}

.middle_content {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: -100rpx;
    position: relative;
    z-index: 1;
    .delivery_item {
        width: 28%;
        height: 200rpx;
        background-color: #fff;
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, -0.81);
        image {
            // width: 100rpx;
            // height: 100rpx;
            width: 100%;
            height: 100%;
        }
        .delivery_item_names {
            font-size: 18rpx;
        }
        .delivery_item_name {
            font-size: 28rpx;
            font-weight: bold;
        }
    }
}
.bottom_content {
    width: 100%;
    .bottom_content_item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40rpx;

        .money_content {
            width: 86%;
            // background: #4f869e;
            padding: 20rpx;
            height: 150rpx;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
                0 6px 20px 0 rgba(0, 0, 0, -0.81);
            border-radius: 20rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .money_content_top {
                display: flex;
                align-items: center;
                font-size: 23rpx;
                .iconfont {
                    margin-right: 10rpx;
                }
            }

            .money_content_bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left_text {
                    font-size: 24rpx;
                    .left_big_text {
                        font-size: 40rpx;
                        margin-right: 12rpx;
                    }
                }

                .right_btn {
                    .button {
                        height: 70rpx;
                        width: 220rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50rpx;
                        background-color: #50869d;
                        color: #fff;
                        font-size: 25rpx;
                    }
                }
            }
        }
    }
}
</style>
