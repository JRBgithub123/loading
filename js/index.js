var load=new Vue({
    el:"#load",
    data:{
      playStatus:1,
      showPc:1,
      showPhone:0,
      showIphone:0,
      showAndroid:0,
      showPic1:0,
      showPic2:0,
      showPic3:0,
      beforeScroll:0,
      afterScroll:0,
      direction:0   //滚动方向默认为0 向下
    },
    methods:{
      //判断设备类型
      browserRedirect:function(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
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
        play:function () {
          var _this=this;
          this.playStatus=0;
            this.$nextTick(function(){
                console.log(_this.$refs.audioE);
                _this.$refs.audioE.play();
            });
        },
        pause:function () {
          var _this=this;
            this.playStatus=1;
            this.$nextTick(function(){
                _this.$refs.audioE.pause();
              });
        }
    },
    mounted:function(){
      var _this=this;
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
       var danMuObj=$(".section3 .danmu");
       var length=danMuObj.length;
       var danmus=[];
       //console.log(danmus);
       //监听滚动条事件
       window.onscroll=function(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            console.log(scrollTop);
            //判断滚动方向
            _this.afterScroll=scrollTop;
            if(_this.beforeScroll>=_this.afterScroll){
                console.log("向上");
                _this.direction=1;
                _this.beforeScroll=_this.afterScroll;
                var right=0;
                for(var i=0;i<length;i++){
                   right=parseInt($(".section3 .danmu").eq(i).css("right"));
                   danmus[i]=right;
                }
                console.log(danmus);
            }else if(_this.beforeScroll<_this.afterScroll){
                console.log("向下");
                _this.direction=0;
                _this.beforeScroll=_this.afterScroll;
                var right1=0;
                for(var j=0;j<length;j++){
                   right1=parseInt($(".section3 .danmu").eq(j).css("right"));
                   danmus[j]=right1;
                }
                console.log(danmus);
            }
            //控制弹幕滑动
            if(scrollTop>=800&&_this.direction==0){//向左滚动
                for(var m=0;m<length;m++){
                  danMuObj.eq(m).css({
                      "right":danmus[m]+1
                  });
                }
            }else if(scrollTop<=2400&&_this.direction==1){//向右滚动
              for(var k=0;k<length;k++){
                danMuObj.eq(k).css({
                    "right":danmus[k]-1
                });
              }
            }

            if(scrollTop>=550){
              _this.showPic1=1;
            }
            if(scrollTop>=1900){
                _this.showPic2=1;
            }
            if(scrollTop>=2540){
                _this.showPic3=1;
            }

       };

    }
});
