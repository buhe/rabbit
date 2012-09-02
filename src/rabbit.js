window.rabbit = {}

window.rabbit.Thread = function(runnable){
    this.runnable = runnable;
}

window.rabbit.Thread.prototype = {
    start: function(){
        var worker = new Worker("../src/worker.js");
        var command = {
            run : function(){
                return 10086
            },
            text : '110'
        }
        worker.postMessage(command)
        worker.onmessage = function(result){
            alert(result.data)
        }
    }
}

window.rabbit.SimpleThreadPool = function(core ,max){
    this.core = core;
    this.max = max;
    this.workCount = 0;
}

window.rabbit.SimpleThreadPool.prototype ={

    execute: function(runnable){
        if(this.workCount < this.core){
            this.addWorker(runnable);
        }else if(this.addQueue(runnable)){
        }else{
            this.reject(runnable);
        }
    },

    addWorker: function(runnable){
        var thread = new rabbit.Thread(runnable)
        thread.start()
    },

    addQueue: function(runnable){

    },

    reject: function(runnable){
        runnable.run();
    }
}