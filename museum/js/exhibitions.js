$(function(){
  $(".nav > li").hover(
    function(){
    $(".nav > li").removeClass("on")
    $(this).addClass("on")
  },function(){
    $(this).removeClass("on")
    $(".nav > li:nth-child(2)").addClass("on").find(".sub > li:first").addClass("on")
  }
  );

  $(".familysite1 > p").click(function(){
    $(".familysite1, .familysite1 > ul").toggleClass("on")
  });
  $(".familysite2 > p").click(function(){
    $(".familysite2, .familysite2 > ul").toggleClass("on")
  });

  $(".f3 > h2").hover(
    function(){
      $(".f3 img").css("right","-100px").css("opacity","1")
    },
    function(){
      $(".f3 img").css("right","0px").css("opacity","0.9")
    }
  );

  $(".f3 > h2").click(function(){
    $("#floor3").css("display","block"),
    $("#floor3 .map").animate({"opacity":"1"},800)
    $("#floor3 .box1").animate({"left":"80px", "opacity":"1"},500)
    $("#floor3 .box2").animate({"left":"80px", "opacity":"1"},700)
  });
  $("#floor3 i").click(function(){
    $("#floor3").css("display","none")
    $("#floor3 .map").animate({"opacity":"0"},1000)
    $("#floor3 .box1").animate({"left":"80px", "opacity":"0"},500)
    $("#floor3 .box2").animate({"left":"80px", "opacity":"0"},700)
  });

  $(".f2 > h2").hover(
    function(){
      $(".f2 img").css("right","-100px").css("opacity","1")
    },
    function(){
      $(".f2 img").css("right","0px").css("opacity","0.9")
    }
  );

  $(".f2 > h2").click(function(){
    $("#floor2").css("display","block")
    $("#floor2 .map").animate({"opacity":"1"},1000)
    $("#floor2 .box1").animate({"left":"80px", "opacity":"1"},300)
    $("#floor2 .box2").animate({"left":"80px", "opacity":"1"},600)
    $("#floor2 .box3").animate({"left":"80px", "opacity":"1"},800)
  });
  $("#floor2 i").click(function(){
    $("#floor2").css("display","none")
    $("#floor2 .map").animate({"opacity":"0"},1000)
    $("#floor2 .box1").animate({"left":"80px", "opacity":"0"},500)
    $("#floor2 .box2").animate({"left":"80px", "opacity":"0"},700)
  });


  $(".f1 > h2").hover(
    function(){
      $(".f1 img").css("right","-100px").css("opacity","1")
    },
    function(){
      $(".f1 img").css("right","0px").css("opacity","0.9")
    }
  );

  $(".f1 > h2").click(function(){
    $("#floor1").css("display","block")
    $("#floor1 .map").animate({"opacity":"1"},1000)
    $("#floor1 .box1").animate({"left":"80px", "opacity":"1"},500)
    $("#floor1 .box2").animate({"left":"80px", "opacity":"1"},700)
  });
  $("#floor1 i").click(function(){
    $("#floor1").css("display","none")
    $("#floor1 .map").animate({"opacity":"0"},1000)
    $("#floor1 .box1").animate({"left":"80px", "opacity":"0"},500)
    $("#floor1 .box2").animate({"left":"80px", "opacity":"0"},700)
  });

});