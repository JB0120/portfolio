$(function(){
  //32개의 이미지를 한줄로 작성하는 코드
  for(var i = 1; i <= 32; i++){
    var imgEl = `<img src="img/main${i}.png" alt="메인베너${i}">`
    $(".banner").append(imgEl);
  }

  $(".banner > img").each(function(){
    var i = $(this).index();
    $(this).hover(
      function(){
        if(i==0 || i==1 || i==2 || i==3 || i==8 || i==9 || i==10 || i==11 || i==16 || i==17 || i==18 || i==19 ){
          $("#banner_back > img:nth-child(1)").addClass("on");
        }else if(i==4 || i==5 || i==12 || i==13){
          $("#banner_back > img:nth-child(2)").addClass("on");
        }else if(i==6 || i==7 || i==14 || i==15){
          $("#banner_back > img:nth-child(3)").addClass("on");
        }else if(i==24 || i==25){
          $("#banner_back > img:nth-child(4)").addClass("on");
        }else if(i==26){
          $("#banner_back > img:nth-child(5)").addClass("on");
        }else if(i==27){
          $("#banner_back > img:nth-child(6)").addClass("on");
        }else if(i==20 || i==21 || i==22 || i==23 || i==28 || i==29 || i==30 || i==31){
          $("#banner_back > img:nth-child(7)").addClass("on");
        }
        
      },function(){
        if(i==0 || i==1 || i==2 || i==3 || i==8 || i==9 || i==10 || i==11 || i==16 || i==17 || i==18 || i==19 ){
          $("#banner_back > img:nth-child(1)").removeClass("on");
        }else if(i==4 || i==5 || i==12 || i==13){
          $("#banner_back > img:nth-child(2)").removeClass("on");
        }else if(i==6 || i==7 || i==14 || i==15){
          $("#banner_back > img:nth-child(3)").removeClass("on");
        }else if(i==24 || i==25){
          $("#banner_back > img:nth-child(4)").removeClass("on");
        }else if(i==26){
          $("#banner_back > img:nth-child(5)").removeClass("on");
        }else if(i==27){
          $("#banner_back > img:nth-child(6)").removeClass("on");
        }else if(i==20 || i==21 || i==22 || i==23 || i==28 || i==29 || i==30 || i==31){
          $("#banner_back > img:nth-child(7)").removeClass("on");
        }
      }
    );
  });

  $(".banner > img").hover(
    function(){
      $("#banner_back > img:last-child").css("opacity","0")
    },function(){
      $("#banner_back > img:last-child").css("opacity","0.2")
    }
  );



  //전시이미지 슬라이드
  //$("#exhibitions > .btn > li").click(function(){ 
    //var i = $(this).index();
    //var pos = i*-1260;
    //$("#exhibitions .wrap").stop().animate({"left":pos+"px"},500);
  //});

  
  //왼쪽 화살표버튼
  $("#exhibitions .prev").click(function(){
    if($("#exhibitions .largeBox").is(":animated")) return false;
    var last = $("#exhibitions .largeBox > .box").last();
    $("#exhibitions .largeBox").prepend(last).css("left","-420px").animate({"left":0},500)
  });

  //오른쪽 화살표버튼
  $("#exhibitions .next").click(function(){
    if($("#exhibitions .largeBox").is(":animated")) return false;
    leftSlide();
  });

  //왼쪽방향으로 슬라이드되는 코드
  function leftSlide(){
    var first = $("#exhibitions .largeBox > .box").first();
    $("#exhibitions .largeBox").animate({"left":"-420px"},500,function(){
      $(this).append(first).css("left",0);
    })
  }

  //자동슬라이드
  var timer = setInterval(leftSlide,4000);

  $("#exhibitions .largeBox > .box").hover(
    function(){
      clearInterval(timer);
    },
    function(){
      timer = setInterval(leftSlide,4000);
    }
  )

  $("#exhibitions .btn").hover(
    function(){
      clearInterval(timer);
    },
    function(){
      timer = setInterval(leftSlide,4000);
    }
  )

 
  //exhibits_bg scroll
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    var exhibitsTop = $("#exhibits").offset().top;

    if(scroll >= exhibitsTop - 200){
      $("#exhibits > .bg").addClass("on");
    }else{
    $("#exhibits > .bg").removeClass("on");
    };

    if(scroll >= exhibitsTop - 100){
      $("#news > .bg").addClass("on");
    }else{
    $("#news > .bg").removeClass("on");
    };
  });
  
  $(".familysite1 > p").click(function(){
    $(".familysite1, .familysite1 > ul").toggleClass("on")
  });
  $(".familysite2 > p").click(function(){
    $(".familysite2, .familysite2 > ul").toggleClass("on")
  });
  
  $(function(){
    $(".nav > li").hover(
      function(){
      $(".nav > li").removeClass("on")
      $(this).addClass("on")
    },function(){
      $(this).removeClass("on")
    }
    );
  });
});

