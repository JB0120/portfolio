$(function(){
  $("nav > .icon > li:nth-child(2)").click(function(){
    $(".login").toggleClass("on")
  });

  $(".login").click(function(){
    $(".login_page").css("display","block")
  });
  $(".login_top > .close").click(function(){
    $(".login_page").css("display","none")
  });

  $("#tour > .contents .box i").click(function(){
    $(this).toggleClass("on")
  });
});