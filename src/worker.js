onmessage = function(runnable){
    var runFunction = runnable.data.run
    var result = eval(runFunction)
    postMessage(result)
}

