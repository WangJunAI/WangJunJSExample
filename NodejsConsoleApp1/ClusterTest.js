var cluster = require('cluster');


var ClusterTest = {

    Test: function () {
        if (cluster.isMaster) {
            console.log("当前进程 " + process.pid);
            for (var i = 0; i < 10; i++) {
                var worker = cluster.fork();
            }
            setInterval(function () {
                console.log("当前进程 " + cluster.isMaster + "  " + process.pid);
                var workers = cluster.workers;
                for (var key in workers) {
                    workers[key].send("来自主进程的消息" + key+" "+new Date());
                }
            }, 5000);

            process.on('message', function (msg) {
                //console.log("收到" + msg + " " + process.pid + " " + "  workid " + cluster.worker.id);
                //process.send("回发" + "  workid " + cluster.worker.id)
                console.log(msg);
            });
        }
        else {
            console.log("当前进程2 " + process.pid);
            process.on('message', function (msg) {
                console.log("收到" + msg + " " + process.pid + " " + "  workid " + cluster.worker.id);
                process.send("回发" + "  workid " + cluster.worker.id)
            });
        }
    },


}

module.exports = ClusterTest;