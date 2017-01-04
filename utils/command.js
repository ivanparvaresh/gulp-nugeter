module.exports = {
    run: function (cmd, args, callBack) {
        
        var spawn = require('child_process').spawn;
        var child = spawn(cmd, args);
        var resp = "";
        child.stdout.on('data', function (buffer) { resp += buffer.toString() });
        child.stdout.on('end', function () {
            stdoutCompleted=true;
            complete();
        });

        var error="";
        child.stderr.on('data', function (buffer) { error += buffer.toString() });
        child.stderr.on("end",function(){
            stderrCompleted=true;
            complete();
        })

        var stderrCompleted=false;
        var stdoutCompleted=false;
        function complete(){
        
            if (stderrCompleted && stdoutCompleted){
                if ( error == null || error =="" || error.length==0 ){
                    callBack(null,resp);    
                    return;
                }
                callBack(error,resp);

            }
        }
    }
}