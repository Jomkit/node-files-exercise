const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if(err){
            console.log(err.message);
            process.exit(1);
        }
        console.log(data);
    })
}

function webCat(url){
    axios.get(url)
        .then((res) =>{
            console.log(res.data);
        })
        .catch((err) => {
            console.log(`Error fetching ${url}:`)
            console.log("   Error:", err.message);
        })
}

let re = /http*/;
// First test if arg is a url
if(re.test(argv[2])){
    webCat(argv[2]);
} else {
    cat(argv[2]);
}