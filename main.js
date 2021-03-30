(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").appendTo(h).text("文字列を画像データに変換します。");
    var h1 = $("<div>").appendTo(h),
        h2 = $("<div>").appendTo(h);
    rpgen3.addTab(h,{
        list: {
            "文字列→画像": h1,
            "画像→文字列": h2
        }
    });
    $("<button>",{
        text: "変換するボタン"
    }).appendTo(h1).click(main);
    var h_result = $("<div>").appendTo(h1);
    var inputStr = rpgen3.addInputText(h1,{
        title: "input",
        placeholder: "ここに変換したい文字列を入力",
        textarea: true,
        hankaku: false
    });
    function main(){
        var result = rpgen3.strToImg(inputStr());
        $("<button>",{text:"ダウンロード"}).appendTo(h_result.empty()).on("click",function(){
            var a = $("<a>",{
                href: result,
                download: "data.png"
            })[0].click();
        });
        $("<img>").appendTo(h_result.append("<br>")).attr({
            src: result
        });
    }
    $("<input>").appendTo(h2).attr({
        type: "file"
    }).on("change",loadImg);
    var h_result2 = $("<div>").appendTo(h2);
    function loadImg(e){
        var file = e.target.files[0];
        if(!file) return;
        var blobUrl = window.URL.createObjectURL(file);
        var img = new Image();
        img.onload = function(){
            rpgen3.addInputText(h_result2.empty(),{
                title: "output",
                value: rpgen3.imgToStr(img),
                textarea: true,
                readonly: true,
                hankaku: false
            });
        };
        img.src = blobUrl;
    }
})();
