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

// cat(argv[2]);

function webCat(url, outPath){
    if(outPath){
        axios.get(url)
            .then((res) =>{
                console.log(res.data);
                catWrite(outPath, res.data);
            })
            .catch((err) => {
                console.log(`Error fetching ${url}:`)
                console.log("   Error:", err.message);
            })
    } else{
        axios.get(url)
            .then((res) =>{
                console.log(res.data);
            })
            .catch((err) => {
                console.log(`Error fetching ${url}:`)
                console.log("   Error:", err.message);
            })

    }
}

function outputHandler(){
    if(argv[2] == "--out"){
        let outPath = argv[3]
        let path = argv[4]
        // console.log("Outputting")
        // for(let i=0; i< argv.length; i++){
        //     console.log(argv[i]);
        // }
        let re = /http*/;
        // First test if arg is a url
        if(re.test(path)){
            webCat(path, outPath);
        } else {
            cat(path, outPath);
            
        }
    } else{
        let re = /http*/;
        // First test if arg is a url
        if(re.test(argv[2])){
            webCat(argv[2]);
        } else {
            cat(argv[2]);
        }
    }

}

outputHandler();