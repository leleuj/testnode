function message(v) {

    var obj = {};
    obj.old = v;

    return new Promise(function(resolve, reject) {

        var wait = Math.floor(Math.random() * 1000);

        setTimeout(function () {
            console.info('waited: ' + wait + 'ms');

            obj.new = obj.old;
            console.info('setted: ' + obj.old + ' / ' + obj.new);
        }, wait);

        resolve(obj);
    });
}

const promises = [];

for (var i = 1; i < 100; i++) {
    promises.push(message(i))
}

Promise.all(promises).then(function (objs) {

    setTimeout(function () {
        objs.forEach(function(obj) {
            console.info(obj);
        });

    }, 5000);

});
