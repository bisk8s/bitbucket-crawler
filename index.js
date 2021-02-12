const requests = require('axios')
const env = require('node-env-file');
env(__dirname + '/.env');

const{ 
    username,
    password,
    team
} = process.env;

console.log(process.env.username);

// Repo list container
let fullRepoList = []

// Request 100 repositories per page (and only their slugs), and the next page URL
const starterUrl = `https://api.bitbucket.org/2.0/repositories/${team}?pagelen=100&fields=next,values.slug`
const config={auth:{username, password}}

function getNextPage(nextPageUrl){
    console.log("eslint",nextPageUrl)
    requests.get(nextPageUrl, config).then(response=>{
        const {values,next} = response.data;
        values.forEach(repo=>{
            fullRepoList.push(repo['slug'])    
        })
        // Get the next page URL, if present
        if(next!==undefined) {
            getNextPage(next)
        }else{
            console.log(fullRepoList)
        }
    }).catch(e=>console.error(e))
}

getNextPage(starterUrl)
