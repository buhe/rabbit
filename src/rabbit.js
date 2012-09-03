window.rabbit = {}

window.rabbit.Thread = function(runnable,callback){
    this.runnable = runnable;
    this.callback = callback;
}

window.rabbit.Thread.prototype = {
    start: function(){
        var self = this;
        var worker = new Worker("../src/worker.js");
        worker.postMessage(this.runnable)
        worker.onmessage = function(result){
            var data = result.data;
            self.callback(data)
        }
    }
}

window.rabbit.SimpleThreadPool = function(core ,max){
    this.core = core;
    this.max = max;
    this.workCount = 0;
}

window.rabbit.SimpleThreadPool.prototype ={

    execute: function(runnable,callback){
        if(this.workCount < this.core){
            return this.addWorker(runnable,callback);
        }else if(this.addQueue(runnable,callback)){
        }else{
            this.reject(runnable,callback);
        }
    },

    addWorker: function(runnable,callback){
        var thread = new rabbit.Thread(runnable,callback)
        thread.start()
    },

    addQueue: function(runnable,callback){

    },

    reject: function(runnable,callback){
        runnable.run();
    }
}