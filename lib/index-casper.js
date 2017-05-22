var casper = require('casper').create({
    clientScripts:  [
        'jquery.min.js',
        'FileSaver.min.js',
        'canvas-toBlob.js',
        'Chart.bundle.min.js'
    ],
    verbose: true,
    logLevel: "debug",
    pageSettings: {
        webSecurityEnabled: false
    }
});
casper.start('http://localhost:8080');

casper.then(function() {

    var r = this.evaluate(function() {
        return document.querySelector('#result').innerHTML;
    });
    console.log('### r: ' + r);

    //casper.page.injectJs('injected.js');
    //const r = this.click('#save-btn');
    //console.log('button clicked: ' + r);
});

casper.on('capture.saved', function(targetPath) {
    console.log('capture.saved: ' + targetPath);
});

casper.on('click', function(selector) {
    console.log('click: ' + selector);
});

casper.on('downloaded.file', function(targetPath) {
    console.log('downloaded.file: ' + targetPath);
});

casper.on('page.resource.received', function(response) {
    console.log('page.resource.received: ' + response.url);
});

casper.on('resource.received', function(response) {
    console.log('resource.received: ' + response.url);
});

casper.on('navigation.requested', function(url, navigationType, navigationLocked, isMainFrame) {
    console.log('navigation.requested: ' + navigationLocked);
});

casper.run();