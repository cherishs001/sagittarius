const fs = require('fs');
const {exec} = require('child_process');

const deleteAll = (path) => {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            const curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteAll(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteAll('./build');

exec('npm run lint && tsc', (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
});

