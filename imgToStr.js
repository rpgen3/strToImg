function imgToStr(img){
    var width = img.width,
        height = img.height;
    var cv = $("<canvas>").attr({
        width: width,
        height: height
    });
    var ctx = cv.get(0).getContext('2d');
    ctx.drawImage(img,0,0);
    var data = ctx.getImageData(0, 0, width, height).data;
    var ar = [];
    for(var i = 0; i < data.length; i++){
        var i4 = i * 4;
        for(var o = 0; o < 3; o++){
            ar.push(data[i4 + o]);
        }
    }
    var str = '';
    for(var p = 0; p < ar.length; p++){
        var n = ar[p];
        if(n < 128){
            str += String.fromCharCode(n);
        }
        else if(n === 128){
            str += String.fromCharCode((ar[p + 1] << 8) + ar[p + 2]);
            p += 2;
        }
    }
    return str.replace(/\0+$/,'');
}
