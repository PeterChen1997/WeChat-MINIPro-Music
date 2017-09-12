(function(module) {
  let exports = module.exports={};
  //接口ID
  let appid = 45938;
  //接口密钥
  let secret = "bb8bab7e5e9940188f331c390235c44e";
  //GET方式的参数
  let param = "?showapi_appid=" + appid + "&showapi_sign=" + secret;
  //热门榜单接口
  let hotUrl = "https://route.showapi.com/213-4" + param;
  //根据歌名、人名查询歌曲接口
  let searchByNameUrl = "https://route.showapi.com/213-1" + param;
  let searchByIdUrl = "https://route.showapi.com/213-2" + param;

  //console.log(hotUrl);

  module.exports = {
    config: {
      hotUrl: hotUrl,
      searchByNameUrl:searchByNameUrl,
      searchByIdUrl:searchByIdUrl
    }
  }; 
}) (module);