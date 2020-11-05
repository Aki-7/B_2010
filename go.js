const dotenv = require("dotenv");
dotenv.config();
const { Octokit } = require("@octokit/core");

function main() {
  const branch = process.argv.length > 2 ? process.argv[2] : "main";
  const key = process.env["GITHUB_MY_TOKEN"];
  const octokit = new Octokit({ auth: key });
  octokit
    .request("POST /repos/jphacks/B_2010/deployments", {
      ref: branch,
    })
    .then(console.log)
    .catch(console.error);
}

main();
