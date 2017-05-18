const phantom = require('phantom');

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
        _page.property('customHeaders', { 'header': token });
        _page.property('viewportSize' , { width: vwidth, height: vheight });
        _page.property('clipRect', { top: top, left: left, width: width, height: height });
        return _page.open(url);
    }).then(function (status) {
        _page.render(imageName, {format: 'jpeg', quality: '90'});
        return status;
    });
}
