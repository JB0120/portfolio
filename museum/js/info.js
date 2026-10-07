$(function(){
  $(".nav > li").hover(
    function(){
    $(".nav > li").removeClass("on")
    $(this).addClass("on")
  },function(){
    $(this).removeClass("on")
    $(".nav > li:first").addClass("on").find(".sub > li:first").addClass("on")
  }
  );

  $(".familysite1 > p").click(function(){
    $(".familysite1, .familysite1 > ul").toggleClass("on")
  });
  $(".familysite2 > p").click(function(){
    $(".familysite2, .familysite2 > ul").toggleClass("on")
  });
  
});