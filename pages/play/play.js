const config = require('../../config.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    song:{},
    isPlaying:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

        this.setData({
          song: { songname: '未选择歌曲' ,singername:'无'}
        });
  },

  playToggle:function() {
    let self = this;
    if (self.data.song.songname == '未选择歌曲') {
      return;
    }

    if (self.data.isPlaying) {
      wx.stopBackgroundAudio();
    }else {
      wx.playBackgroundAudio({
        dataUrl: self.data.song.url || self.data.song.m4a,
        success:function(res){}
      })
    }


    self.setData({
      isPlaying: !self.data.isPlaying
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
    let self = this;

    if (app.globalData.switchSong) {
      if (self.data.isPlaying) {
        wx.stopBackgroundAudio();

        this.setData({
          isPlaying: !this.data.isPlaying
        })
      }
      app.globalData.switchSong = false;
      let songId = app.globalData.songId;
      console.log(songId);


      let songlist = wx.getStorageSync('songlist') || [];
      for (let i = 0; i < songlist.length; i++) {
        if (songlist[i].songid == songId) {
          this.setData({
            song: songlist[i],
            isPlaying: !self.data.isPlaying
          });
          break;
        }
      }
      wx.setStorageSync('curSong', this.data.song);
      wx.playBackgroundAudio({
        dataUrl: self.data.song.url || self.data.song.m4a,
        success: function (res) { }
      });


    }


    
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