const app=getApp();
const config = require('../../config.js');

Page({

  getId: e => {
    let self = this;
    let Id = e.currentTarget.dataset.id;
    app.globalData.songId = Id;
    app.globalData.switchSong = true;
    console.log(app.globalData.songId);
    wx.switchTab({
      url: '../play/play'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    loading:false,
    list:[],
  },

  inputing:function(e){
    this.setData({
      value:e.detail.value
    });
  },

  bindSearch:function(){
    let self = this;
    console.log(this);

    if (self.data.value == ""){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '输入不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else {
      this.setData({
        loading: !self.data.loading
      });

      wx.request({
        url: config.config.searchByNameUrl,
        data: { keyword: self.data.value },

        success: e => {
          if (e.statusCode == 200) {
            self.setData({
              list: e.data.showapi_res_body.pagebean.contentlist,
              loading: !self.data.loading
            });

            wx.setStorageSync('songlist', e.data.showapi_res_body.pagebean.contentlist);
          }
        }
      });
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})