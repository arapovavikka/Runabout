// crop.js

var crop = function(base64PictureData, rect_width, rect_height, x_coord, y_coord, callback) {

    var image = new Image();

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    try {
        imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
        imageData = imageDataUrl;
        cordova.exec(
            success,
            error,
            'Canvas2ImagePlugin',
            'saveImageDataToLibrary',
            [imageData]
        );
    }
    catch(e) {
        error(e.message);
    }

    image.src = 'data:image/png;base64,' + base64PictureData;
    image.onload = function(){

        var x_axis_scale = image.width / window.screen.width
        var y_axis_scale = image.height / window.screen.height
        var x_coord_int = x_coord * x_axis_scale;
        var y_coord_int = y_coord * y_axis_scale;
        var rect_width_int = rect_width * x_axis_scale;
        var rect_height_int = rect_height * y_axis_scale

        canvas.width = rect_width_int;
        canvas.height = rect_height_int;

        ctx.drawImage(image,
            x_coord_int, y_coord_int,           
            rect_width_int, rect_height_int,    
            0, 0,                               
            rect_width_int, rect_height_int);   
        var cropped_img_base64 = canvas.toDataURL();
        callback(cropped_img_base64);

        return cropped_img_base64;
    };
};