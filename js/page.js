//init//
let panelBG = "#f3f3f4"
let panelFG = "#8E9AAF"
function getNews(){
  var date = new Date();
  var dateStr = date.getFullYear()+"-"+('0' + (date.getMonth()+1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2);
  console.log(dateStr)
  fetch("https://gnews.io/api/v4/top-headlines?category=technology&apikey=458547479e862abdd1a22d3575225c60")
   .then(response => response.json())
  .then(data => populateNews(data))
  .catch(error => console.error(error));

}
function populateNews(news)
{
  console.log("fetched "+news.length)
  for (var i=0;i<news.length;i++){
    let mediaBlock = `
    <div class="media" data-url="`+news[i].url+`">
      <a class="pull-left" href="#">
        <img class="media-object" src="`+news[i].image+`">
      </a>
      <div class="media-body">
        <p class="media-heading">`+news[i].title+`</p>
        <p class="media-description">`+news[i].description+`</p>
      </div>
    </div>
    `;
    $("#newsPanel").append(mediaBlock);
  }
}
window.onload=function(){
  $("#mainPanelContent").css("background",panelBG);
  $(".defaultTabParent").css("background",panelBG);
  $(".tabPanel").css("color","black");
  $(".defaultTabParent .tabPanel").css("color",panelFG);
  $("#curDate").html(new Date().toLocaleDateString())
  $(".tabPanel").click(function(){
    $(".panelFromTab").hide();
    let self = $(this);
    let target = $(this).data("for");
    $("#"+target).show();
    $(this).parent().siblings().css("background","white");
    $(this).parent().css("background",panelBG);
    $(".tabPanel").css("color","black");
    $(this).css("color",panelFG);
  })
  $(".card:not(.expCard)").hover(function(){
    $(this).css("cursor","pointer");
  })
  $(".card:not(.expCard)").click(function(){
    let url = $(this).data("url");
    window.open(url,"_blank");
  })
  $("#myBtn").click(function(){
    alert("hi")
  })
  getNews();
}
$(document).on("mouseover",".media",function(){
  $(this).css("background",panelBG)
  $(this).css("cursor","pointer");
  $(this).css("border-radius","5px");
  $(this).attr("title","read detail by clicking it.")
})

$(document).on("mouseout",".media",function(){
  $(this).css("border-radius","");
  $(this).css("background","white")
})

$(document).on("click",".media",function(){
  let url = $(this).data("url");
  window.open(url,"_blank");
})
