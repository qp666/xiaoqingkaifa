<template>
    <view class="aview" style="display: flex;flex-direction: column;align-items: center;justify-content:center">
        <!-- <button @click="getImg">生成海报</button> -->
        <!-- <view class="bview" style="opacity: 1;"> -->
        <page-loading :loading="pageModel.loading.on" :title="pageModel.loading.title"></page-loading>
        <image class="image_canvas" mode="widthFix" :style="{height:(page.posterHeightInfo.height+'rpx'),width:(page.posterHeightInfo.width+'rpx')}" :src="tempFilePath" @click="previewImage"></image>

        <view class="tankuangCanvas">
            <canvas class="canvas" v-show="true" :style="{height:(page.posterHeightInfo.height/2+'px'),width:(page.posterHeightInfo.width/2+'px')}" canvas-id="myCanvas" id="myCanvas"></canvas>
        </view>

        <!-- <view class="big_btn_box"> -->
        <view class="btn_box_fixed">
            <view class="page-button" v-if="tempFilePath" style="display: flex;flex-direction: column;align-items: center;justify-content:center" @tap="toSavePoster(tempFilePath)">保存海报</view>
        </view>
        <!-- </view> -->
    </view>
</template>


<script>
export default {
    name: "shareStudio",

    props: {},

    data() {
        return {
            canvasJson: {},
            page: {
                // width: "375px",
                // height: "700px",
            },

            tempFilePath: "",
            is_activity: false,//是否有活动
        };
    },

    methods: {
        previewImage() {
            uni.previewImage({
                current: this.tempFilePath, // 当前显示图片的http链接
                urls: [this.tempFilePath] // 需要预览的图片http链接列表
            })
        },
        downloadFilePromise(url, key, shibai) {
            let self = this;
            console.log("downloadFilePromise");
            return new Promise(function (resolve, reject) {
                if (!url || url == "null") {
                    self.canvasJson[key] = shibai;
                    resolve();
                } else {
                    let downloadurl = "";
                    if (url.includes("http")) {
                        downloadurl = url;
                    }

                    //
                    uni.downloadFile({
                        url: downloadurl, //仅为示例，并非真实的资源
                        success: (res) => {
                            if (res.statusCode === 200) {
                                self.canvasJson[key] = res.tempFilePath;
                                resolve();
                            }
                        },
                        fail(res) {
                            uni.hideLoading();
                        },
                    });
                }
            });
        },
        // 计算海报长度
        toCalcCanvasHeight(ctx) {
            let that = this;

            return new Promise((resolve, reject) => {
                let _canvasInfo = {
                    width: 750,
                }; //画板信息

                _canvasInfo.height = 992;

                // // 计算店铺名称底栏位置
                // ctx.setTextAlign('center')
                // ctx.setTextBaseline('middle');
                // ctx.font = 'normal bold 32px PingFang';
                // ctx.setFillStyle('#2c2923');
                // ctx.setFontSize(32);
                // let _storeNameWidth = ctx.measureText('that.info.shopName');

                // _canvasInfo.storeNameWidth = (_storeNameWidth.width + 40); // 加上左右padding

                resolve(_canvasInfo);
            });
        },
        //绘制海报
        async drawImg() {
            // ctx.setLineWidth(1);
            // ctx.moveTo(10, 30);
            // ctx.lineTo(200, 30);
            // ctx.stroke();
            const ctx = uni.createCanvasContext("myCanvas");
            let _posterHeightInfo = await this.toCalcCanvasHeight(ctx);

            let have_badge = true; //有徽章
            let have_list = '';//无榜单
            let listArr = [1, 2, 3] //榜单数组
            let studio_height = 266; //工作室盒子高度
            let coupon_height = 583; //优惠券盒子高度
            let commodity_height = 583; //商品盒子高度
            let list_height = 465; //工作室高度
            let coupon_back_height = 455; //优惠券背景盒子高度
            let commodity_back_height = 453; //优惠券背景盒子高度
            // let coupon_title_height = 521 //优惠券标题
            //有徽章的高度则要加68 
            if (have_badge) {
                _posterHeightInfo.height += 68
                studio_height += 68
                coupon_height += 68
                commodity_height += 68
                list_height += 68
                coupon_back_height += 68
                commodity_back_height += 68
                // coupon_title_height += 68
            }

            //有榜单的高度累加
            if (Array.isArray(listArr)) {

                switch (listArr.length) {
                    case 1:
                        have_list = 1;
                        _posterHeightInfo.height += 60
                        studio_height += 60
                        coupon_height += 60
                        commodity_height += 60
                        coupon_back_height += 60
                        commodity_back_height += 60
                        // coupon_title_height += 60

                        break;
                    case 2:
                        have_list = 2;
                        _posterHeightInfo.height += 60
                        studio_height += 60
                        coupon_height += 60
                        commodity_height += 60
                        coupon_back_height += 60
                        commodity_back_height += 60
                        // coupon_title_height += 60
                        break;
                    case 3:
                        have_list = 3;
                        _posterHeightInfo.height += 100
                        studio_height += 100
                        coupon_height += 100
                        commodity_height += 100
                        coupon_back_height += 100
                        commodity_back_height += 100
                        // coupon_title_height += 100
                        break;
                    default:
                        have_list = ''
                }

            }

            //如果有优惠券模块
            let have_coupon = true
            if (have_coupon) {
                _posterHeightInfo.height += 298
                commodity_height += 298
                commodity_back_height += 298
                // coupon_title_height += 298
            }
            //如果有活动模块
            if (this.is_activity) {
                _posterHeightInfo.height += (251 + 12)
                // commodity_height += (251 + 20)
                // commodity_back_height += (251 + 20)
                coupon_height += (251 + 12)
                commodity_height += (251 + 12)
                coupon_back_height += (251 + 12)
                commodity_back_height += (251 + 12)
            }

            let commodityList = [1, 2];
            if (Array.isArray(commodityList) && commodityList.length === 2) {
                _posterHeightInfo.height += (327 + 24)  //(盒子高度327+24上边距)
            }

            // 把高度信息搞上去

            this.$set(this.page, 'posterHeightInfo', _posterHeightInfo);

            // 开始绘制
            this.Loading('正在绘制...');

            // 清空画板
            ctx.clearRect(0, 0, _posterHeightInfo.width, _posterHeightInfo.height);

            // 初始化 画整个背景
            ctx.setTextBaseline('top');
            if (this.is_activity) {
                ctx.fillStyle = '#C7130D'
            } else {
                ctx.fillStyle = '#2c2923'
            }
            ctx.fillRect(0, 0, _posterHeightInfo.width, _posterHeightInfo.height)


            //先画优惠券与促销商品背景
            //优惠券背景图
            // ctx.drawImage(this.canvasJson.receive_coupons, 24 / 2, 583 / 2, 702 / 2, 234 / 2);
            ctx.drawImage(this.canvasJson.receive_coupons, 24 / 2, coupon_back_height / 2, 702 / 2, 234 / 2);
            //促销商品
            // ctx.drawImage(this.canvasJson.commodity_title, 24 / 2, 879 / 2, 702 / 2, 184 / 2);
            ctx.drawImage(this.canvasJson.commodity_title, 24 / 2, commodity_back_height / 2, 702 / 2, 184 / 2);

            if (this.is_activity) {
                ctx.drawImage(this.canvasJson.activity_back_image, 0, (studio_height + 199 + 20) / 2, 750 / 2, 251 / 2);
            }

            // 把左上角宝藏工作室分享背景图放上去
            ctx.drawImage(this.canvasJson.left_background, 0, 0, 750 / 2, 266 / 2);

            //左上角名字背景
            ctx.drawImage(this.canvasJson.left_name_background, 31 / 2, 37 / 2, 386 / 2, 52 / 2);

            //左上角用户头像
            ctx.beginPath(); //开始绘制
            //先画个圆
            ctx.arc((33 + 24) / 2, (40 + 24) / 2, 48 / 4, 0, Math.PI * 2);
            ctx.setFillStyle('#ffffff')
            ctx.fill()//保证图片无bug填充
            // ctx.clip();//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
            ctx.drawImage(this.canvasJson.love_small, 33 / 2, 40 / 2, 48 / 2, 48 / 2) // 
            ctx.restore();

            //左上角名字推荐
            ctx.setFillStyle("#E0D6C5");
            ctx.textAlign = "left"; // 设置位置
            ctx.font = 'normal 400 12px PingFang'; // 字体样式
            ctx.fillText("来自不知名用户的推荐", 99 / 2, (45 + 4) / 2);


            //右边二维码
            ctx.save(); // 先保存
            this.roundRect(ctx, 511 / 2, 18 / 2, 163 / 2, 163 / 2, 6 / 2, '#fff')
            ctx.clip(); //进行裁剪
            ctx.drawImage(this.canvasJson.facai, 511 / 2, 18 / 2, 163 / 2, 163 / 2);
            ctx.restore();


            //扫码进入工作室图片
            ctx.drawImage(this.canvasJson.right_code_go, 674 / 2, 18 / 2, 36 / 2, 163 / 2);

            //   //扫码进入工作室图片
            // ctx.drawImage(this.canvasJson.right_code_go, 300 , 200 , 36, 163 );

            //工作室数据展示背景
            const grd = ctx.createLinearGradient(0, 0, 666 / 2 / 2, 0)
            grd.addColorStop(0, '#FCE8D2')
            grd.addColorStop(1, '#FDD1A1')

            this.roundRect(ctx, 41 / 2, 199 / 2, 666 / 2, studio_height / 2, 12 / 2, grd)


            //工作室数据展示背景左上角圆图
            ctx.drawImage(this.canvasJson.studio_circle, 526 / 2, 199 / 2, 180 / 2, 166 / 2);

            //工作室头像
            //左上角用户头像
            ctx.beginPath(); //开始绘制
            // //先画个圆
            ctx.arc((70 + 51) / 2, (231 + 51) / 2, 102 / 4, 0, Math.PI * 2);
            ctx.setFillStyle('#ffffff')
            ctx.fill()//保证图片无bug填充
            ctx.drawImage(this.canvasJson.love_small, 70 / 2, 231 / 2, 102 / 2, 102 / 2)
            ctx.restore();

            let pinpai_logo_width = 183;
            if (true) {
                //品牌小logo
                ctx.drawImage(this.canvasJson.brand_logo, 183 / 2, 244 / 2, 70 / 2, 30 / 2)
                pinpai_logo_width += 78
            }

            //工作室名称
            ctx.setFillStyle("#513604");
            ctx.textAlign = "left"; // 设置位置
            ctx.font = 'normal bold 16px PingFang';; // 字体样式
            ctx.setFontSize(16);
            ctx.fillText("蛛丝马迹工作室", (pinpai_logo_width - 4) / 2, 241 / 2);

            //等级标志
            let arr = [1, 2, 3, 4]
            let xin_x = 183;
            let xin_y = 293;
            if (arr.length) {
                for (let i = 0; i < arr.length; i++) {
                    ctx.drawImage(this.canvasJson.crown_small, xin_x / 2, xin_y / 2, 26 / 2, 26 / 2)
                    xin_x += 28;
                }
            }

            //等级值文字
            ctx.setFillStyle("#61420A");
            ctx.textAlign = "left"; // 设置位置
            ctx.font = 'normal 400 11px PingFang';; // 字体样式
            ctx.setFontSize(11);
            ctx.fillText("2555品牌值", xin_x / 2, xin_y / 2);

            //工作室数据展示
            ctx.setFillStyle("#61420A");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal 400 12px PingFang';; // 字体样式
            ctx.setFontSize(12);
            ctx.fillText("累计销量", (90 + 70 / 2) / 2, 409 / 2);

            ctx.setFillStyle("#61420A");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal 400 12px PingFang';; // 字体样式
            ctx.setFontSize(12);
            ctx.fillText("浏览量", (260 + 72 / 2) / 2, 409 / 2);

            ctx.setFillStyle("#61420A");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal 400 12px PingFang';; // 字体样式
            ctx.setFontSize(12);
            ctx.fillText("回头客", (428 + 72 / 2) / 2, 409 / 2);

            ctx.setFillStyle("#61420A");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal 400 12px PingFang';; // 字体样式
            ctx.setFontSize(12);
            ctx.fillText("口碑评分", (584 + 96 / 2) / 2, 409 / 2);

            ctx.setFillStyle("#503709");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal bold 14px PingFang';; // 字体样式
            ctx.setFontSize(14);
            ctx.fillText("1.8万件", (92 + 69 / 2) / 2, 365 / 2);

            ctx.setFillStyle("#503709");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal bold 14px PingFang';; // 字体样式
            ctx.setFontSize(14);
            ctx.fillText("1.4万人", (247 + 98 / 2) / 2, 365 / 2);

            ctx.setFillStyle("#503709");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal bold 14px PingFang';; // 字体样式
            ctx.setFontSize(14);
            ctx.fillText("200人", (425 + 79 / 2) / 2, 365 / 2);

            ctx.setFillStyle("#503709");
            ctx.textAlign = "center"; // 设置位置
            ctx.font = 'normal bold 14px PingFang';; // 字体样式
            ctx.setFontSize(14);
            ctx.fillText("4.9分", (597 + 70 / 2) / 2, 365 / 2);

            //三根线
            ctx.drawImage(this.canvasJson.xiantiao, 207 / 2, 381 / 2, 1 / 2, 61 / 2);
            ctx.drawImage(this.canvasJson.xiantiao, 385 / 2, 381 / 2, 1 / 2, 61 / 2);
            ctx.drawImage(this.canvasJson.xiantiao, 544 / 2, 381 / 2, 1 / 2, 61 / 2);
            //  let have_badge = false;
            if (have_badge) {
                //开始绘制徽章
                ctx.setFillStyle("#503709");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal bold 14px PingFang';; // 字体样式
                ctx.setFontSize(14);
                ctx.fillText("徽章", 65 / 2, 469 / 2);

                let badge_width = 145;
                // let badge_height = 465;
                if (true) {
                    //企业认证徽章
                    ctx.drawImage(this.canvasJson.enterprise_badge, badge_width / 2, 465 / 2, 102 / 2, 36 / 2);
                    // ctx.drawImage(this.canvasJson.enterprise_badge, 145 / 2, 465 / 2, 102 / 2, 36 / 2);
                    badge_width += (102 + 16)
                }
                //个人认证徽章
                // ctx.drawImage(this.canvasJson.personal_badge, 145 / 2, 465 / 2, 102 / 2, 36 / 2);
                if (true) {
                    // //1年工作室认证
                    // ctx.drawImage(this.canvasJson.one_studio_badge, 263 / 2, 465 / 2, 118 / 2, 36 / 2);
                    // //2年工作室认证
                    // ctx.drawImage(this.canvasJson.two_studio_badge, 263 / 2, 465 / 2, 118 / 2, 36 / 2);
                    // //3年工作室认证
                    // ctx.drawImage(this.canvasJson.three_studio_badge, 263 / 2, 465 / 2, 118 / 2, 36 / 2);
                    // //4年工作室认证
                    // ctx.drawImage(this.canvasJson.four_studio_badge, 263 / 2, 465 / 2, 118 / 2, 36 / 2);
                    //5年工作室认证
                    ctx.drawImage(this.canvasJson.five_studio_badge, badge_width / 2, 465 / 2, 118 / 2, 36 / 2);
                    badge_width += (118 + 16)
                }


                if (true) {
                    //保证金认证
                    // ctx.drawImage(this.canvasJson.bond_badge, 397 / 2, 465 / 2, 92 / 2, 36 / 2);
                    ctx.drawImage(this.canvasJson.bond_badge, badge_width / 2, 465 / 2, 92 / 2, 36 / 2);
                }
            }


            if (Array.isArray(listArr) && listArr.length) {
                //开始绘制上榜
                ctx.setFillStyle("#503709");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal bold 14px PingFang';; // 字体样式
                ctx.setFontSize(14);
                // ctx.fillText("上榜", 65 / 2, 533 / 2);
                ctx.fillText("上榜", 65 / 2, list_height / 2);

                listArr.map((item, index) => {
                    //奖杯图片
                    // ctx.drawImage(this.canvasJson.list_trophy, 146 / 2, 535 / 2, 21 / 2, 24 / 2);
                    if (index === 0) {
                        ctx.drawImage(this.canvasJson.list_trophy, 146 / 2, list_height / 2, 21 / 2, 24 / 2);
                    } else if (index === 1) {
                        ctx.drawImage(this.canvasJson.list_trophy, 427 / 2, list_height / 2, 21 / 2, 24 / 2);
                    } else if (index === 2) {
                        ctx.drawImage(this.canvasJson.list_trophy, 146 / 2, (list_height + 42) / 2, 21 / 2, 24 / 2);
                    }

                    ctx.setFillStyle("#503709");
                    ctx.textAlign = "left"; // 设置位置
                    ctx.font = 'normal 400 12px PingFang';; // 字体样式
                    ctx.setFontSize(12);
                    // ctx.fillText("工作室品牌值榜第1名", 171 / 2, 535 / 2);
                    if (index === 0) {
                        ctx.fillText("工作室品牌值榜第1名", 171 / 2, (list_height - 2) / 2);
                    } else if (index === 1) {
                        ctx.fillText("工作室品牌值榜第1名", 452 / 2, (list_height - 2) / 2);
                    } else if (index === 2) {
                        ctx.fillText("工作室品牌值榜第1名", 171 / 2, (list_height + 40) / 2);
                    }
                })
            }


            if (have_coupon) {

                //优惠券标题
                ctx.setFillStyle("#FFD5A7");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal bold 15px PingFang';; // 字体样式
                ctx.setFontSize(15);
                // ctx.fillText("大额优惠券限时领", 64 / 2, 649 / 2);
                ctx.fillText("大额优惠券限时领", 64 / 2, (coupon_height - 64) / 2);

                //优惠券内容大盒子
                // this.roundRect(ctx, 24 / 2, 711 / 2, 702 / 2, 180 / 2, 12 / 2, '#fff8f1')

                this.roundRect(ctx, 24 / 2, coupon_height / 2, 702 / 2, 180 / 2, 12 / 2, '#fff8f1')


                //优惠券的循环展示
                let arr1 = [1, 2, 3]
                // ctx.clip();//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                let coupons_x = 49;
                let coupons_y = coupon_height + 30;
                //  let coupons_y = 743 ; //
                arr1.map((item, index) => {
                    ctx.drawImage(this.canvasJson.receive_coupons_item, coupons_x / 2, coupons_y / 2, 204 / 2, 116 / 2)
                    ctx.setFillStyle("#846A41");
                    ctx.textAlign = "left"; // 设置位置
                    ctx.font = 'normal 400 11px PingFang';; // 字体样式
                    ctx.setFontSize(11);
                    // ctx.fillText("满减优惠券", (coupons_x + 10) / 2, 818 / 2);
                    ctx.fillText("满减优惠券", (coupons_x + 10) / 2, (coupons_y + 71) / 2);

                    //满减
                    if (index === 0) {
                        ctx.setFillStyle("#503709");
                        ctx.textAlign = "left"; // 设置位置
                        ctx.font = 'normal bold 12px PingFang';; // 字体样式
                        ctx.setFontSize(12);
                        // ctx.fillText("￥", (coupons_x + 10) / 2, 775 / 2);
                        ctx.fillText("￥", (coupons_x + 10) / 2, (coupons_y + 28) / 2);

                        ctx.setFillStyle("#503709");
                        ctx.textAlign = "left"; // 设置位置
                        ctx.font = 'normal bold 20px PingFang';; // 字体样式
                        ctx.setFontSize(20);
                        // ctx.fillText("10", (coupons_x + 34) / 2, 762 / 2);
                        ctx.fillText("10", (coupons_x + 34) / 2, (coupons_y + 18) / 2);

                        //折扣
                    } else {

                        ctx.setFillStyle("#503709");
                        ctx.textAlign = "left"; // 设置位置
                        ctx.font = 'normal bold 20px PingFang';; // 字体样式
                        ctx.setFontSize(20);
                        // ctx.fillText("9.7", (coupons_x + 10) / 2, 762 / 2);
                        ctx.fillText("9.7", (coupons_x + 10) / 2, (coupons_y + 18) / 2);


                        let coupon_zhe = ctx.measureText("9.7").width
                        console.log('coupon_zhe', coupon_zhe);
                        ctx.setFillStyle("#503709");
                        ctx.textAlign = "left"; // 设置位置
                        ctx.font = 'normal bold 12px PingFang';; // 字体样式
                        ctx.setFontSize(12);
                        // ctx.fillText("折", (coupons_x + 69) / 2, 774 / 2);
                        ctx.fillText("折", (coupons_x / 2 + coupon_zhe + 6), (coupons_y + 27) / 2);
                    }
                    coupons_x += (20 + 204);
                    console.log(coupons_x);
                })
            }
            //商品促销标题
            ctx.setFillStyle("#FFD5A7");
            ctx.textAlign = "left"; // 设置位置
            ctx.font = 'normal bold 15px PingFang';; // 字体样式
            ctx.setFontSize(15);
            // ctx.fillText("限时促销超划算", 68 / 2, 945 / 2);
            ctx.fillText("限时促销超划算", 68 / 2, (commodity_height - 66) / 2);

            //商品促销展示
            let arr2 = [1, 2];
            let commodity_x = 24;
            // let commodity_y = 1007;
            let commodity_y = commodity_height;

            arr2.map((item, index) => {
                this.roundRect(ctx, commodity_x / 2, commodity_y / 2, 702 / 2, 327 / 2, 12 / 2, '#fff');

                //商品图片
                ctx.save(); // 先保存
                this.roundRect(ctx, (commodity_x + 24) / 2, (commodity_y + 24) / 2, 160 / 2, 160 / 2, 12 / 2, '#ccc');
                ctx.clip(); //进行裁剪
                ctx.drawImage(this.canvasJson.facai, 48 / 2, (commodity_y + 24) / 2, 160 / 2, 160 / 2);
                ctx.restore();
                //如果有预售
                let have_preSale = true;
                let have_list_bz = true;
                let name_width = 232;
                if (have_preSale) {
                    //预售
                    ctx.drawImage(this.canvasJson.commodity_pre_sale, (commodity_x + 208) / 2, (commodity_y + 38) / 2, 56 / 2, 28 / 2);
                    name_width += (56 + 8)
                }

                if (have_list_bz) {
                    //上榜
                    ctx.drawImage(this.canvasJson.products_on_the_list, (commodity_x + 208 + 8 + 56) / 2, (commodity_y + 38) / 2, 56 / 2, 28 / 2);
                    name_width += (56 + 8)
                }
                //商品标题
                ctx.setFillStyle("#333333");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 13px PingFang'; // 字体样式
                ctx.setFontSize(13);
                // ctx.fillText("金陵有座东君书院", (commodity_x + 336) / 2, (commodity_y + 39) / 2);
                ctx.fillText("金陵有座东君书院", name_width / 2, (commodity_y + 39) / 2);


                //商品规格
                ctx.setFillStyle("#999999");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 12px PingFang'; // 字体样式
                ctx.setFontSize(12);
                ctx.fillText("5人 民国 情感 欢乐 阵营 新本格 民国 情感...", (commodity_x + 208) / 2, (commodity_y + 87) / 2);

                //商品在售金额¥符号
                ctx.setFillStyle("#FA6400");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 10px PingFang'; // 字体样式
                ctx.setFontSize(10);
                ctx.fillText("¥", (commodity_x + 207) / 2, (commodity_y + 147) / 2);

                //商品在售金额值
                ctx.setFillStyle("#FA6400");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 16px PingFang'; // 字体样式
                ctx.setFontSize(16);
                ctx.fillText("396.42", (commodity_x + 219) / 2, (commodity_y + 135) / 2);


                //商品之前金额值
                let moneywidth = ctx.measureText("396.42").width
                console.log('16', ctx.measureText("396.42").width);
                ctx.setFillStyle("#999999");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 10px PingFang'; // 字体样式
                ctx.setFontSize(10);
                ctx.fillText("¥300.00", ((commodity_x + 219 + 8) / 2 + moneywidth), (commodity_y + 147) / 2);

                //商品之前金额值删除线
                let old_moneywidth = ctx.measureText("¥300.00").width
                ctx.beginPath();
                ctx.rect(((commodity_x + 219 + 4) / 2 + moneywidth), (commodity_y + 147 + 12) / 2, old_moneywidth, 1);
                ctx.fillStyle = '#ccc';
                ctx.fill();

                let del_width = ctx.measureText("¥300.00").width
                //商品限时特价标志
                ctx.drawImage(this.canvasJson.commodity_time_limit, ((commodity_x + 219 + 8 + 8) / 2 + del_width + moneywidth), (commodity_y + 138) / 2, 82 / 2, 26 / 2);

                //商品浏览量与已售详情
                ctx.setFillStyle("#999999");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 10px PingFang'; // 字体样式
                ctx.setFontSize(10);
                ctx.fillText("5623浏览丨已售452", (commodity_x + 208) / 2, (commodity_y + 187) / 2);
                // console.log('1111111',ctx.measureText("5人 民国 情感 欢乐 阵营 新本格 民国 情感...").width);
                //商品详情背景
                this.roundRect(ctx, (commodity_x + 24) / 2, (commodity_y + 231) / 2, 654 / 2, 72 / 2, 12 / 2, '#f1f1f1');

                //商品详情文字
                ctx.setFillStyle("#333333");
                ctx.textAlign = "left"; // 设置位置
                ctx.font = 'normal 400 12px PingFang'; // 字体样式
                ctx.setFontSize(12);
                ctx.fillText("机制特别强，整体还是不错，需要每个点调整一下，比较...", 63 / 2, (commodity_y + 255) / 2);

                commodity_y += (327 + 23);
            })




            //底部的logo
            ctx.drawImage(this.canvasJson.bottom_logo, 222 / 2, (_posterHeightInfo.height - 40 - 24) / 2, 306 / 2, 40 / 2);
            // this.darwRoundRect(20, 20, 200, 100, 10, ctx, 'red')
            //绘制成图片
            ctx.draw(true, this.toimage());
        },
        // 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
        roundRect(ctx, x, y, w, h, r, fillColor, strokeColor) {
            // 开始绘制
            ctx.beginPath()

            // 绘制左上角圆弧 Math.PI = 180度
            // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
            ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

            // 绘制border-top
            // 移动起点位置 x终点、y终点
            ctx.moveTo(x + r, y)
            // 画一条线 x终点、y终点
            ctx.lineTo(x + w - r, y)
            // ctx.lineTo(x + w, y + r)

            // 绘制右上角圆弧
            ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

            // 绘制border-right
            ctx.lineTo(x + w, y + h - r)
            // ctx.lineTo(x + w - r, y + h)

            // 绘制右下角圆弧
            ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

            // 绘制border-bottom
            ctx.lineTo(x + r, y + h)
            // ctx.lineTo(x, y + h - r)

            // 绘制左下角圆弧
            ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

            // 绘制border-left
            ctx.lineTo(x, y + r)
            // ctx.lineTo(x + r, y)

            if (fillColor) {
                // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
                ctx.setFillStyle(fillColor)
                // 对绘画区域填充
                ctx.fill()
            }

            if (strokeColor) {
                // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
                ctx.setStrokeStyle(strokeColor)
                // 画出当前路径的边框
                ctx.stroke()
            }

            // if (gradient) {
            //     const grd = ctx.createLinearGradient(0, 0, gradient.width, 0)
            //     grd.addColorStop(0, gradient.aColor)
            //     grd.addColorStop(1, gradient.bColor)

            //     // Fill with gradient
            //     ctx.setFillStyle(grd)
            //     ctx.fill()
            // }
            // 关闭一个路径
            ctx.closePath()

            // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore

            // ctx.clip()

        },
        roundRect1(ctx, x, y, w, h, r, type) { //绘制圆角矩形(无填充色))
            let self = this;
            ctx.save();

            if (w < 2 * r) {
                r = w / 2;
            }
            if (h < 2 * r) {
                r = h / 2;
            }
            ctx.beginPath();
            ctx.setFillStyle("#ccc");
            ctx.setStrokeStyle('#fff');
            ctx.setFillStyle("#ccc");
            ctx.setLineWidth(1);
            ctx.setFillStyle("#ccc");
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            // if(type === 1){ //type : 1 左边不画圆角
            // 	ctx.arcTo(x, y + h, x, y);
            // 	ctx.arcTo(x, y, x + w, y);
            // }else{
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            // }

            // ctx.stroke();
            // ctx.closePath();
        },
        toimage() {
            console.log("toimage");
            setTimeout(() => {
                wx.canvasToTempFilePath(
                    {
                        x: 0,
                        y: 0,
                        destWidth: (this.page.posterHeightInfo.width) * 2,
                        destHeight: (this.page.posterHeightInfo.height) * 2,
                        canvasId: "myCanvas",
                        fileType: "png",
                        success: (res) => {
                            this.Loading(false);
                            this.tempFilePath = res.tempFilePath;
                            // this.toSavePoster(res.tempFilePath);
                        },
                        fail: (err) => {
                            console.log(err);
                            this.Loading(false);
                        },
                    },
                );
            }, 300);
        },
        toSavePoster(tempFilePath) {
            console.log('tempFilePath', tempFilePath);
            this.Loading()
            wx.saveImageToPhotosAlbum({
                filePath: tempFilePath,
                success: (res1) => {
                    uni.showToast({
                        title: "保存成功",
                        icon: "icon",
                    });
                    this.Loading(false)
                    setTimeout(() => {
                        wx.previewImage({
                            current: tempFilePath, // 当前显示图片的http链接
                            urls: [tempFilePath], // 需要预览的图片http链接列表
                        });
                    }, 500);
                },

                fail: (res) => {
                    this.Loading(false)
                    // this.$emit("loading", 0);
                    if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                        uni.showToast({
                            title: "下载失败",
                            icon: "none",
                        });
                    } else {
                        uni.showModal({
                            title: "是否要打开设置页",
                            content: "请到小程序设置中打开相册授权",
                            success: (res) => {
                                if (res.confirm) {
                                    this.onOpenSetting();
                                }
                            },
                        });
                    }
                },
            });
        },
    },

    computed: {},

    filters: {},
    mounted() {
        this.$nextTick(() => {
            this.Loading('下载素材');
            // let is_activity = true;
            //保证金徽章
            let a1 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/86nvlfdmd7zsuk1i424q.png",
                "bond_badge",
                false
            )
            //1年工作室徽章
            let a2 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/38qi4sbha9jgwnfl2vc3.png",
                "one_studio_badge",
                false
            )
            //企业认证徽章
            let a3 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/pq29k160gdc6m6d42lm7.png",
                "enterprise_badge",
                false
            )
            //工作室旁圆圈
            let a4 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/2yx4eq86hghwkniktxao.png",
                "studio_circle",
                false
            )
            //上榜奖杯
            let a5 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/u7mjfc5ng8mgghsl8d25.png",
                "list_trophy",
                false
            )
            let a6 = ''
            if (this.is_activity) {
                //左上角名字背景图(红色)
                a6 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/0mb0gb8v85n6iydmueie.png",
                    "left_name_background",
                    false
                )
            } else {
                //左上角名字背景图 
                a6 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/dyhb0b46p5qc9jozaf0m.png",
                    "left_name_background",
                    false
                )
            }

            //左上角背景
            let a7 = '';
            if (this.is_activity) {
                //左上角背景(红色)
                a7 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/6x4cka94kiy4gsirjcfr.png",
                    "left_background",
                    false
                )
            } else {
                a7 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/qofgyh1ivx65w9vpzwsd.png",
                    "left_background",
                    false
                )
            }

            //领优惠券背景栏
            let a8 = '';
            if (this.is_activity) {
                //领优惠券背景栏(红色)
                a8 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/qmimbem5yybapafx1ppd.png",
                    "receive_coupons",
                    false
                )
            } else {
                a8 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/fgmatoqj6qf98orqmbt9.png",
                    "receive_coupons",
                    false
                )
            }
            //商品标题背景栏
            let a9 = '';
            if (this.is_activity) {
                //商品标题背景栏(红色)
                a9 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/imep6d462ufm108nmq0c.png",
                    "commodity_title",
                    false
                )
            } else {
                a9 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/w00c3xkpyjkzlgye7jtc.png",
                    "commodity_title",
                    false
                )
            }
            //扫码进入工作室
            let a10 = '';
            if (this.is_activity) {
                //(红色)
                a10 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/ankb2tfzbqw1qrvmo9es.png",
                    "right_code_go",
                    false
                )
            } else {
                a10 = this.downloadFilePromise(
                    "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/2a7avjcatvon51vphux0.png",
                    "right_code_go",
                    false
                )
            }
            //底部logo
            let a11 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/n4z9mua6zhlvtf7jg8s2.png",
                "bottom_logo",
                false
            )
            //领券优惠券每项背景
            let a12 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/vgcp9n8j7u8iwmam2uyj.png",
                "receive_coupons_item",
                false
            )
            //品牌标志
            let a13 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/fwp39rgkxu49399fjqpm.png",
                "brand_logo",
                false
            )
            //钻石标志
            let a14 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/7eqwimnlzb79bgh5iffb.png",
                "diamonds_small",
                false
            )
            //皇冠标志
            let a15 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/jj5ctf1ld7mrsbuhibff.png",
                "crown_small",
                false
            )
            //爱心标志
            let a16 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/4ii0lv455c6ff0cftzsg.png",
                "love_small",
                false
            )
            //个体户徽章
            let a17 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/3velgvqgf1lnu9lg7kbc.png",
                "personal_badge",
                false
            )
            //2年工作室徽章
            let a18 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/74f9do6f6ld5v07r6whq.png",
                "two_studio_badge",
                false
            )
            //3年工作室徽章
            let a19 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/ql3k1ho29d3wuju1j4xg.png",
                "three_studio_badge",
                false
            )
            //4年工作室徽章
            let a20 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/4xl8azy0ohgcbcyvpl58.png",
                "four_studio_badge",
                false
            )
            //5年工作室徽章
            let a21 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/mx1yb85o839lkmcpcumd.png",
                "five_studio_badge",
                false
            )
            //商品上榜标志
            let a22 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/lf1zmgjaci8fz1vdmg2g.png",
                "products_on_the_list",
                false
            )
            //商品预售标志
            let a23 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/3cpf5t5me4or9ux93fcv.png",
                "commodity_pre_sale",
                false
            )
            //商品限时特价标志
            let a24 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/ummad6g05u7p2s3lqid0.png",
                "commodity_time_limit",
                false
            )
            //发财背景图
            let a25 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210813/etacx736zisr88exyqq3.png",
                "facai",
                false
            )
            //线条
            let a26 = this.downloadFilePromise(
                "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/jkvn7hcopicg8rhz7tcs.png",
                "xiantiao",
                false
            )

            Promise.all([a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26]).then((result) => {
                if (this.is_activity) {
                    this.downloadFilePromise(
                        "https://xiaoheitan.oss-cn-shenzhen.aliyuncs.com/attached/shop0/image/20210814/yh3mpu055lwy12jksk65.png",
                        "activity_back_image",
                        false
                    ).then((result) => {
                        console.log(this.canvasJson, result)
                        this.drawImg();
                    })
                } else {
                    console.log(this.canvasJson, result)
                    this.drawImg();
                }

            }).catch((error) => {
                this.Loading(false);
                console.log('error', error)
            })
            // 
        });
    },
    created() { },

    watch: {},

    components: {},
};
</script>

<style lang="scss">
// .bview {
//     width: 375px;
//     height: 800px;
// }
.aview {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    position: relative;
}
.tankuangCanvas {
    width: 750rpx;
    height: 100%;
    position: fixed;
    left: -200%;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    // #myCanvas {
    //     width: 457px;
    //     height: 646px;
    // }
}

.image_canvas {
    padding-bottom: 136rpx;
}
.page-button {
    // margin-top: 24rpx;

    width: 480rpx;
    height: 88rpx;
    opacity: 1;
    background: #100503;
    border-radius: 50rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    // margin-bottom: 24rpx;
}

.btn_box_fixed {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0rpx;
    // padding: 24rpx 0rpx 48rpx;
    min-height: 136rpx;
    background: #fff;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
// .big_btn_box {
//     width: 100%;
//     padding-bottom: constant(safe-area-inset-bottom);
//     padding-bottom: env(safe-area-inset-bottom);
// }
</style>
