var config = {
    "development1": { //开发环境
        //host: 'http://xing.aparcar.cn:7210',
        gateway: {
            // base: 'http://xing.aparcar.cn:7109', //佐夫
            // base: 'http://xing.aparcar.cn:7181', //吴立
            base: 'http://xing.aparcar.cn:7210', //洪佳培
            // base: 'http://xing.aparcar.cn:7172',
        },
        authhost: 'http://xing.aparcar.cn:7171',
        app_id: 'uNoilxyVl7fO0uMKKqCP',
        wxpay_app_id: 'wx2a82045bffe9e761',
        yhy_h5_pay_url: 'http://qph5pay.com',
        pay_url: 'http://xing.aparcar.cn:7210/gateway',
        notify_url: 'http://xing.aparcar.cn:7114',
    },
    "development": { //开发环境
        //host: 'http://xing.aparcar.cn:7210',
        gateway: {
            // base: 'http://xing.aparcar.cn:7109', //佐夫
            // base: 'http://xing.aparcar.cn:7181', //吴立
            base: 'https://stage.itest.tom-jerry.cn', //洪佳培
            // base: 'http://xing.aparcar.cn:7172',
        },
        authhost: 'https://oauth2.itest.tom-jerry.cn',
        app_id: 'uNoilxyVl7fO0uMKKqCP',
        wxpay_app_id: 'wx2a82045bffe9e761',
        yhy_h5_pay_url1: 'https://eatm.itest.tom-jerry.cn',
        yhy_h5_pay_url: 'http://yhyh5pay.com',
        pay_url: 'https://stage.itest.tom-jerry.cn',
        notify_url: 'https://stage.itest.tom-jerry.cn',
    },
    "production": { //线上环境
        gateway: {
            base: 'https://stage.zhengjiajie.com',
        },
        authhost: 'https://oauth2.zhengjiajie.com',
        app_id: 'GjVbGM7jnS5g',
        wxpay_app_id: 'wx2a82045bffe9e761',
        pay_url: 'https://stage.zhengjiajie.com/gateway',
        notify_url: 'http://a4wgt',
    },
    const: {
        parkType: 697,
        propertyType: 698,
        alipayType: 1202,
        wechatType: 582,
        allType: 4,
        decorationAmount: 1358,
        otherType: 1357,
        extremeSystem: 1388,//极致系统
        propertyManagement: 1387//物管通
    },
}
window.config = config;