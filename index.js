var through = require('through2');
var gutil = require('gulp-util');
var fs = require("fs");

// variables
var PluginError = gutil.PluginError;
var command = require("./utils/command.js");
var assembly = require("./utils/assembly.js");
var nugetexe = __dirname + "\\bin\\nuget.exe";
var cwd = process.cwd();

// Consts
const PLUGIN_NAME = 'gulp-nugetter';

function pack(options) {
    if (!options) {
        throw new PluginError(PLUGIN_NAME, 'Missing options!');
    }

    if (!options.csproj)
        throw new PluginError(PLUGIN_NAME, 'Missing csproj!');

    if (!options.pkgdir)
        throw new PluginError(PLUGIN_NAME, 'Missing pkgdir!');


    return through.obj(function (file, enc, cb) {

        if (!fs.existsSync(options.pkgdir)) {
            fs.mkdirSync(options.pkgdir);
        }

        command.run(nugetexe, ["pack", options.csproj, "-OutputDirectory", options.pkgdir, "-Prop", "Configuration=Release"], function (err, res) {
            if (err) {
                cb(err);
                return;
            }
            cb(null,res);
        });

    })
}
function push(options) {
    if (!options) {
        throw new PluginError(PLUGIN_NAME, 'Missing options!');
    }

    if (!options.csproj)
        throw new PluginError(PLUGIN_NAME, 'Missing csproj!');

    if (!options.pkgdir)
        throw new PluginError(PLUGIN_NAME, 'Missing pkgdir!');
    if (!options.assembly)
        throw new PluginError(PLUGIN_NAME, 'Missing assembly!');
    if (!options.nugetsource)
        throw new PluginError(PLUGIN_NAME, 'Missing nugetsource!');


    return through.obj(function (file, enc, cb) {

        if (!fs.existsSync(options.name)) {
            fs.mkdirSync(options.name);
        }
        if (!fs.existsSync(options.pkgdir)) {
            fs.mkdirSync(options.pkgdir);
        }

        assembly.info( options.assembly, function (err, info) {
            if (err) {
                cb(err);
                return;
            }

            var version = info;

            var args=["push", options.pkgdir + "\\" +ooptions.name + "." + version + ".nupkg", "-source", options.nugetsource];
            if (options.nugetconfig){
                args.push("-configfile");
                args.push(options.nugetconfig);
            }

            command.run(nugetexe, args, function (err, res) {
                if (err) {
                    cb(err);
                    return;
                }
                console.log(res);
                cb(null,res);
            });

        });
    })
}


module.exports = {
    pack: pack,
    push: push
};