var command=require("./command.js");

module.exports={
    info:function(filePath,cb){
        command.run(__dirname + "\\..\\bin\\assembly.exe",[filePath,"-version"],function(err,resp){
            if (err){
                cb(err);
                return;
            }
            cb(null,resp);
        })
    }
}