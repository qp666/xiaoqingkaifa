<script>
export default {
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    }
}
</script>

<style lang='scss'>
@import "/wxcomponents/vant/dist/common/index.wxss";
/*每个页面公共css */
@import url("./static/fonts/iconfont.css");

@import url("./static/css/index.scss");
</style>
