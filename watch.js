const Watchpack = require("watchpack");
const exec = require('child_process').exec;

const wp = new Watchpack({
    // options:
  aggregateTimeout: 1000,
    // fire "aggregated" event when after a change for 1000ms no additonal change occured
    // aggregated defaults to undefined, which doesn't fire an "aggregated" event

  poll: true,
    // poll: true - use polling with the default interval
    // poll: 10000 - use polling with an interval of 10s
    // poll defaults to undefined, which prefer native watching methods
    // Note: enable polling when watching on a network path

    ignored: /node_modules/,
    // anymatch-compatible definition of files/paths to be ignored
    // see https://github.com/paulmillr/chokidar#path-filtering
});

// Watchpack.prototype.watch(string[] files, string[] directories, [number startTime])
wp.watch([], ["../src"], Date.now() - 10000);
// starts watching these files and directories
// calling this again will override the files and directories

wp.on("change", (filePath, mtime) => {
    // filePath: the changed file
    // mtime: last modified time for the changed file
  console.log(filePath, mtime);
  exec('make build-nogzip');
});
