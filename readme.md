# Gulp-Nugeter
===========================

gulp nugeter support to pack, push and restore nuget packages.


## usage  :

```javascript


var nugetconfig = {

    pkgdir: path.resolve(__dirname + '\\bin\\nuget'),
    csproj: path.resolve(__dirname + '\\Cheshmak.csproj'),
    assembly: path.resolve(__dirname + '\\bin\\Debug\\myProj.dll'),

    nugetsource: 'http://mynugetsource.com',
    nugetconfig: path.resolve(__dirname + '\\..\\..\\build\\nuget.config'),
}

gulp.task("nuget-pack", function () {
    return gulp
        .src("myproj.csproj")
        .pipe(nugetter.pack(nugetconfig));
})
gulp.task('nuget-push', ['nuget-pack'], function () {
    return gulp
        .src("myproj.csproj")
        .pipe(nugetter.push(nugetconfig));
});
```