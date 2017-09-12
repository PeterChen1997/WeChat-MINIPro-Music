const config = require('../../config.js');
let app = getApp();

let formatSeconds = value => {
  let time = parseFloat(value);
  let m = Math.floor(time/60);
  let s = time - m*60;

  return [m,s].map(formatNumber).join(':');

  function formatNumber(n) {
    n = n.toString();
    return n[1]?n:'0'+n;
  }
}



Page({
  getId: e => {
    let self = this;
    // console.log(e);
    let Id = e.currentTarget.dataset.id;
    app.globalData.songId = Id;
    console.log(app.globalData.songId);
    wx.switchTab({
      url: '../play/play'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    board:'',
    songlist:[],
    loading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let topid = options.type;
    this.setData({
      loading:true
    })

    wx.request({
      
      data:{topid:topid},
      url: config.config.hotUrl+ '&topid='+topid,
      success: e => {
        if(e.statusCode == 200) {
          let songlist= e.data.showapi_res_body.pagebean.songlist;
          for(let i = 0;i < songlist.length;i++){
            songlist[i].seconds = formatSeconds(songlist[i].seconds);
          }

          self.setData({
            board:e.data.showapi_res_body.pagebean.songlist[0].albumpic_big,
            songlist:songlist,
            loading:false
          });

          wx.setStorageSync('songlist', songlist);
        }
      },
      fail: err => {
        console.log(err);
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // let Id = app.globalData.songId;
    // console.log(this.data);
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