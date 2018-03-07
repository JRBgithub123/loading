var load=new Vue({
    el:"#load",
    data:{
      showPc:1,
      showPhone:0,
      showIphone:0,
      showAndroid:0,
    },
    methods:{
      //判断设备类型
      browserRedirect(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        // var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        // var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        // var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        // var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        // var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        // document.writeln("您的浏览设备为：");
          if ( bIsIphoneOs ||  bIsAndroid || bIsIpad) {
            if(bIsIphoneOs){
              console.log("iphone");
              this.showIphone=1;
            }else if(bIsAndroid){
              console.log("android");
              this.showAndroid=1;
            }
            //console.log("phone");
            this.showPhone=1;
            this.showPc=0;
          } else {
            console.log("pc");
            this.showPc=1;
            this.showPhone=0;
          }
        },
    },
    mounted:function(){
      this.browserRedirect();
      var oHtml = document.documentElement;
      getFont();
      function getFont() {
       var screenWidth = oHtml.clientWidth;
       var screenHeight = oHtml.clientHeight;
       //console.log(screenWidth);
       if(screenWidth<=1024){
           if (screenHeight / screenWidth < 1.6) {
              screenWidth = screenHeight / 1.6;
              }
              oHtml.style.fontSize = screenWidth / (750 / 40) + 'px';
              console.log(oHtml.style.fontSize);
            }
       }
    }


});
