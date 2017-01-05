var command=require("./command.js");

module.exports={
    info:function(filePath,cb){
        command.run(__dirname + "\\..\\bin\\AssemblyVersion.exe",[filePath],function(err,resp){
            if (err){
                cb(err);
                return;
            }
            cb(null,resp);
        })
    }
}