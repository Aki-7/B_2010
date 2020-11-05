const dotenv = require("dotenv");
dotenv.config();
const { Octokit } = require("@octokit/core");

function main() {
  const key = process.env["GITHUB_MY_TOKEN"];
  const octokit = new Octokit({ auth: key });
  octokit
    .request("POST /repos/jphacks/B_2010/deployments", {
      ref: "main",
    })
    .then(console.log)
    .catch(console.error);
}

main();
