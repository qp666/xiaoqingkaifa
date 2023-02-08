<template>
    <view class="content">
        <view class="bigBox">
            <view class="title"> 请告诉全知全能的神,你想问什么问题 </view>
            <view class="bottom">
                <input v-model="speakValue" class="speak" type="text">
                <view @click="helpMe" class="bBtn">
                    请帮帮我
                </view>
            </view>
            <view v-if="isTrue" class="goOut tracking-in-expand-fwd">
                去吧,全知全能神已经给出你答案了
            </view>
            <view v-if="isTrue" class="answer">
                <view class="answerLeft" @click="clear">搞错了,再来</view>
                <view class="answerRight jello-horizontal" @click="tiaozhuan">前往答案之地</view>
            </view>
        </view>
    </view>
</template>

<script>
var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
import uniCalendar from '@/components/uni-calendar_1.3.16/uni-calendar.vue';
export default {
    data() {
        return {
            speakValue: '',
            isTrue: false
        }
    },
    onLoad() {

    },
    methods: {
        clear() {
            this.speakValue = '';
            this.isTrue = false;
        },
        tiaozhuan() {
            console.log('speakValue', Base64.encode(this.speakValue))
            // uni.navigateTo({
            //     url: `/pages/baidu/web?url=${Base64.encode(this.speakValue)}`,
            // })
            uni.setClipboardData({
                data: `https://lab.lalkk.com/web/bd/?q=${Base64.encode(this.speakValue)}`
            });
            setTimeout(() => {
                uni.showToast({ title: '粘贴到浏览器打开即可获得答案', icon: 'none', duration: 2000 })
            }, 10)

        },
        helpMe() {
            if (this.speakValue) {
                this.isTrue = true
            }
        }
    },
    onPullDownRefresh() {
        // console.log('下拉刷新成功');
        // this.list = [1, 2, 3, 4, 5, 6, 7]
        // setTimeout(function () {
        //     uni.stopPullDownRefresh();
        // }, 1000);
        uni.navigateTo({
            url: `/pages/index/index`,
        })
    },
    onShareAppMessage: function () {
        return {
            title: '全知全能',
            desc: '不管任何问题都可以得到答案!',
            path: '/pages/baidu/index'
        }
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

.bigBox {
    .title {
        font-size: 20px;
        font-weight: bold;
        margin: 40px 0px;
    }
    .bottom {
        display: flex;
        // align-content: center;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 20px;
        overflow: hidden;

        .speak {
            margin: 0px 10px;
            flex: 1;
        }

        .bBtn {
            height: 50px;
            width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: #0094ff;
        }
    }

    .goOut {
        margin-top: 50px;
        text-align: center;
    }

    .answer {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        view {
            height: 40px;
            width: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            color: #fff;
        }
        .answerLeft {
            background-color: red;
            border: 1px solid red;
        }
        .answerRight {
            border: 1px solid #0094ff;
            background-color: #0094ff;
        }
    }
}

/* ----------------------------------------------
 * Generated by Animista on 2023-2-8 10:16:26
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation tracking-in-expand-fwd
 * ----------------------------------------
 */
.tracking-in-expand-fwd {
    -webkit-animation: tracking-in-expand-fwd 1.5s
        cubic-bezier(0.215, 0.61, 0.355, 1) both;
    animation: tracking-in-expand-fwd 1.5s cubic-bezier(0.215, 0.61, 0.355, 1)
        both;
}
@-webkit-keyframes tracking-in-expand-fwd {
    0% {
        letter-spacing: -0.5em;
        -webkit-transform: translateZ(-700px);
        transform: translateZ(-700px);
        opacity: 0;
    }
    40% {
        opacity: 0.6;
    }
    100% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 1;
    }
}
@keyframes tracking-in-expand-fwd {
    0% {
        letter-spacing: -0.5em;
        -webkit-transform: translateZ(-700px);
        transform: translateZ(-700px);
        opacity: 0;
    }
    40% {
        opacity: 0.6;
    }
    100% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 1;
    }
}

/* ----------------------------------------------
 * Generated by Animista on 2023-2-8 10:26:44
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

.jello-horizontal {
    -webkit-animation: jello-horizontal 0.9s infinite both;
    animation: jello-horizontal 0.9s infinite both;
}
/**
 * ----------------------------------------
 * animation jello-horizontal
 * ----------------------------------------
 */
@-webkit-keyframes jello-horizontal {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
    30% {
        -webkit-transform: scale3d(1.25, 0.75, 1);
        transform: scale3d(1.25, 0.75, 1);
    }
    40% {
        -webkit-transform: scale3d(0.75, 1.25, 1);
        transform: scale3d(0.75, 1.25, 1);
    }
    50% {
        -webkit-transform: scale3d(1.15, 0.85, 1);
        transform: scale3d(1.15, 0.85, 1);
    }
    65% {
        -webkit-transform: scale3d(0.95, 1.05, 1);
        transform: scale3d(0.95, 1.05, 1);
    }
    75% {
        -webkit-transform: scale3d(1.05, 0.95, 1);
        transform: scale3d(1.05, 0.95, 1);
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}
@keyframes jello-horizontal {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
    30% {
        -webkit-transform: scale3d(1.25, 0.75, 1);
        transform: scale3d(1.25, 0.75, 1);
    }
    40% {
        -webkit-transform: scale3d(0.75, 1.25, 1);
        transform: scale3d(0.75, 1.25, 1);
    }
    50% {
        -webkit-transform: scale3d(1.15, 0.85, 1);
        transform: scale3d(1.15, 0.85, 1);
    }
    65% {
        -webkit-transform: scale3d(0.95, 1.05, 1);
        transform: scale3d(0.95, 1.05, 1);
    }
    75% {
        -webkit-transform: scale3d(1.05, 0.95, 1);
        transform: scale3d(1.05, 0.95, 1);
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}
</style>
