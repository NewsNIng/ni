    /** 
     * 照片选择 时时刻刻伴随在Ta的身边
     * @param {Function} fn 图片选择回调 (err, [...imgs])
     * @param {Number} more 图片最大选择数量（仅在选择相册时有效）
     */
    var getGallery = function (fn, more) {

        plus.nativeUI.actionSheet({
            cancel: "取消",
            buttons: [{
                title: "照相机",
                style: "destructive"
            }, 
            // {
            //     title: "最近相片"
            // },
             {
                title: "相册"
            }]
        }, function (e) {
            var index = e.index;
            if (index <= 0) { // 按下取消 或者 返回键
                return;
            }
            
            if (index === 1) {
                var cmr = plus.camera.getCamera();
                cmr.captureImage(function (p) {
                    plus.io.resolveLocalFileSystemURL(p, function (entry) {
                        var img_name = entry.name;
                        var img_path = entry.toLocalURL();
                        fn && fn(null, [img_path], [img_name]);
                    }, function (e) {
                        fn && fn(e.message);
                    });
                }, function (e) {
                    fn && fn(e.message);
                }, {
                    filename: '_doc/camera/',
                    index: 1
                });
            } else {
                var system = true;
                // if (index === 2) {
                //     system = true;
                // }
                plus.gallery.pick(function (data) {
                    if (more) {
                        var imgs = [];
                        for (var a = 0; a < data.files.length; a++) {
                            imgs.push(data.files[a]);
                        }
                        data = imgs;
                    }
                    fn && fn(null, data);
                }, function (e) {
                    fn && fn(e.message);
                }, {
                    filter: "image",
                    multiple: !!more,
                    system: system,
                    maximum: more,
                    onmaxed: function () {
                        plus.nativeUI.toast('您最多能选择' + more + '张');
                    }
                });
            }
        });


    };


    export default getGallery