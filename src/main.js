import Vue from 'vue'
import App from './App'
import pageLoading from '@/dist/loading/loading.vue';
Vue.config.productionTip = false

App.mpType = 'app'


Vue.component('page-loading', pageLoading);
// 全局ui方法
// 提示框
Vue.prototype.$toast = (_str, _time) => {
  if (_time === undefined) {
    _time = 2000;
  };

  uni.showToast({
    title: _str,
    icon: 'none',
    duration: _time
  });
};
// 注入器
Vue.mixin({
  data: function () {
    return {
      pageModel: {
        pop: {},
        loading: {
          on: false,
          timeOut: '',
          title: ''
        }
      }
    }
  },
  methods: {
    PopUp(_target) {
      let that = this;

      if (!!!_target) {
        console.log('请传入弹窗名字');
        return;
      };

      if (typeof that.pageModel.pop[_target] != 'object') {
        that.$set(that.pageModel.pop, _target, { on: false });
      };

      that.$set(that.pageModel.pop[_target], 'on', !that.pageModel.pop[_target].on);
    },
    Loading(_isLoading, _time) {
      let that = this;
      _time = _time || 10000; // 如果是开启loading,则_time代表的是loading超时时间，反之为loading延时关闭时间

      if (_isLoading === false) {
        _time = 500; // 默认收到关闭加载500ms后自动关闭(已废弃)
        clearTimeout(that.pageModel.loading.timeOut);
        that.$set(that.pageModel.loading, 'on', false);
        that.$set(that.pageModel.loading, 'timeOut', '');
        that.$set(that.pageModel.loading, 'title', '');;
        return;
      } else if (typeof _isLoading === 'string') {
        that.$set(that.pageModel.loading, 'title', _isLoading);
      };

      if (that.pageModel.loading.timeOut != '') {
        return;
      };

      that.$set(that.pageModel.loading, 'on', true);

      // 默认 10 秒后超时自动关闭loading
      that.pageModel.loading.timeOut = setTimeout(() => {
        clearTimeout(that.pageModel.loading.timeOut);
        that.$set(that.pageModel.loading, 'on', false);
        that.$set(that.pageModel.loading, 'timeOut', '');
        that.$set(that.pageModel.loading, 'title', '');
      }, _time);
    },
    // 捕捉touchmove事件
    touchmoveCatcher() {
      return false;
    },

  }
});
const app = new Vue({
  ...App
})
app.$mount()
