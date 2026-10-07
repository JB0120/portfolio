$(function(){
  $(".toggleBtn").click(function(){
    $("article:nth-child(3)").toggleClass("on")
  });

  $(window).resize(function(){
    var winWd = $(window).width();
    if(winWd > 480){
      $("article:nth-child(3)").removeClass("on");
    }
  });


  $(".gnb li:nth-child(1)").click(function(){
    $("#furniture, #chairs").css("display","block"),
    $("#lighting, #lamps, #accessories, #kitchen").css("display","none")
  });

  $(".gnb li:nth-child(2)").click(function(){
    $("#lighting, #lamps").css("display","block"),
    $("#furniture, #chairs, #accessories, #kitchen").css("display","none")
  });

  $(".gnb li:nth-child(3)").click(function(){
    $("#accessories, #kitchen").css("display","block"),
    $("#furniture, #chairs, #lighting, #lamps").css("display","none")
  });
});