function strToImg(str){
    var ar = [];
    str.split('').forEach(function(c){
        var n = c.charCodeAt();
        if(n < 128) {
            ar.push(n);
        }
        else {
            ar.push(128);
            ar.push((0xff00 & n) >> 8); // 前
            ar.push((0xff & n)); // 後
        }
    });
    var width = Math.ceil(Math.sqrt(ar.length / 3));
    var cv = $("<canvas>").attr({
        width: width,
        height: width
    });
    var ctx = cv[0].getContext("2d");
    var imgData = ctx.getImageData(0, 0, width, width),
        cnt = 0;
    for(var i = 0; i < ar.length; i++){
        var i4 = i * 4;
        for(var o = 0; o < 3; o++){
            imgData.data[i4 + o] = ar[cnt++] || 0;
        }
        imgData.data[i4 + 3] = 255; // 透過を指定するとputImageDataで画素値が変わる現象がある
    }
    ctx.putImageData(imgData, 0, 0);
    return cv[0].toDataURL("image/png").replace(/^[^,]+;base64,/, '');
}
