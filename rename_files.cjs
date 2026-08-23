const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('f:/Career Shift Project/Frontend/src');

files.forEach(file => {
    const filename = path.basename(file);
    if (filename.includes('Readiness') || filename.includes('readiness')) {
        let newFilename = filename.replace(/Readiness/g, 'Fitness').replace(/readiness/g, 'fitness');
        let newFile = path.join(path.dirname(file), newFilename);
        fs.renameSync(file, newFile);
        console.log('Renamed: ' + file + ' -> ' + newFile);
    }
});
