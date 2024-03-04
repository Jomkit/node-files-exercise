const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function cat(path, outPath){
    fs.readFile(path, 'utf8', function(err, data) {
        if(err){
            console.log(err.message);
            process.exit(1);
        }
        if(outPath){
            catWrite(outPath, data);
        } else {
            console.log(data);
        }
    })
}

function catWrite(outPath, content){
    fs.writeFile(`./${outPath}`, content, "utf8", function(err){
        if(err){
            console.log(err.message);
            process.exit(1);
        }
        console.log('Success');
    })
}

function webCat(url, outPath){
    axios.get(url)
        .then((res) =>{
            if(outPath){
                catWrite(outPath, res.data);
            } else{
                console.log(res.data)
            }
        })
        .catch((err) => {
            console.log(`Error fetching ${url}:`)
            console.log("   Error:", err.message);
        })
}

function outputHandler(argv){
    if(argv[2] == "--out"){
        let outPath = argv[3]
        let path = argv[4]
        let re = /http*/;
        // First test if arg is a url
        if(re.test(path)){
            webCat(path, outPath);
        } else {
            cat(path, outPath);
            
        }
    } else{

        let re = /http*/;
        for(let i=2; i<argv.length; i++){
            // First test if arg is a url
            if(re.test(argv[i])){
                webCat(argv[i]);
            } else {
                cat(argv[i]);
            }
        }
    }

}

outputHandler(argv);