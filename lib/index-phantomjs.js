const phantom = require('phantom');
const fs = require('fs');

phantom.create().then(function(ph) {
    _ph = ph;
    return takePicture(ph, 'https://github.com/leleuj', 'XXXX-token', 'github-photo.jpeg', 1024, 768, 80, 10, 250, 250);
}).then(function(status) {
    console.log('status : ' + status);
    _ph.exit();
}).catch(function (e) {
    console.log('error: ' + e);
});

/*
 * Return the HTTP status.
 */
function takePicture(ph, url, token, imageName, vwidth, vheight, top, left, width, height) {
    return ph.createPage().then(function(page) {
        _page = page;
        _page.property('onError', function (msg, trace) {
            console.log(msg);
            trace.forEach(function(item) {
                console.log('  ', item.file, ':', item.line);
            });
        });
        _page.property('customHeaders', { 'header': token });
        _page.property('viewportSize' , { width: vwidth, height: vheight });
        _page.property('clipRect', { top: top, left: left, width: width, height: height });
        return _page.open(url);
    }).then(function (status) {
        _page.evaluate(function() {
            return document.title;
        }).then(function (title) {
            console.log('Page title is ' + title);
        });
        _page.evaluate(function() {
            return document.getElementById('canvas');
            $("#save-btn").click(function() {
                return 'ici';
                $("#canvas").get(0).toBlob(function(blob) {
                    return blob;
                });
            });
            return 'default';
        }).then(function (text) {
            console.log('text: ' + text);
            //fs.writeFile('chart.txt', data);
        });

        //_page.render(imageName, {format: 'jpeg', quality: '90'});
        return status;
    });
}
