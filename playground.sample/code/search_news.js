// 여기는 자바스크립트로 제작하는 파트입니다.
// 이 예시는 웹사이트 크롤링 하는 방법을 예시로 사용했는데요.
// 보여드리는 정보는 다음의 IT뉴스입니다.

var console = require("console");
var request = require("http");
var textLib = require("textLib");

module.exports.function = function search_news (news) { 
  var now = request.getUrl("https://media.daum.net/digital/",{
    "format": 'text',
    "cacheTime": 0
  });

  var Url_List = [];
  var Title_List = [];
  var s = now.split("#article_main\">");
  for(let i = 0;i<s.length;i++){
      if(s[i].match("link_thumb #article_thumb") == "link_thumb #article_thumb"){
        var url = textLib.stripHtml(s[i].split("\" class=\"thumb_g")[0]).split("src=\"")[1];
        if(url[0] != "h"){
          Url_List.push(url);
        }
      }
      if(s[i].match("</a>") != "</a>")continue;
      var res = textLib.stripHtml(s[i].split("</a>")[0]);
      Title_List.push(res);
  }
  let Url_List_Length = Url_List.length;
  //이 소스를 보면 크롤링은 절대 하지 말아야겠다는 생각이 들곘죠?
  //API 씁시다!!!!!!
  //빅스비는 API와 잘 사용하면 아주 강력한 캡슐을 간단하고 빠르게 만들어낼 수 있습니다.
  //서버를 구축하여 서버단에서 크롤링하고 빅스비와 API통신을 할 수 있게 하면 됩니다.
  // **** 빅스비는 항상 외부망 통신을 사용하여 개발을 해야합니다. ****

  var result_value = [];
  for(let i=0;i<Url_List.length;i++){
    result_value.push({
      'img': true,
      'img_url': "https:" + Url_List[i],
      'title': Title_List[i+1]
    });
    console.log("https:" + Url_List[i], Title_List[i+1]);
  }
  for(let i=Url_List_Length+1;i<Title_List.length;i++){
    result_value.push({
      'img': false,
      'img_url': "",
      'title': Title_List[i+1]
    });
    console.log(Title_List[i]);
  }
  return result_value;
}