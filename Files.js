const fs = require("fs").promises;
const { createInterface } = require("readline");
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
const appFileContent =
    "const express = require('express')\nconst app = express();\n \n  app.get('/',(req,res)=>{\n //some codes here \n console.log('hello world')\n}\n\n  app.listen(3000)";

async function createProject(name) {
    try {
        await fs.mkdir(name);
        console.log("Creating " + name + " project...");
        await fs.writeFile(name + "/app.js", appFileContent);
        fs.mkdir(name + "/routes");
        fs.mkdir(name + "/controller");
        fs.mkdir(name + "/model");
        fs.mkdir(name + "/views");
        console.clear();
        rl.write(name + " has been created in " + name + "/ directory\n");
        rl.write(
            " Run thr following commands \n> cd " +
                name +
                " \n> npm i \n> npm start\n"
        );
        rl.close();
    } catch (err) {
        1;
        console.log(err);
    }
}

async function mySetup(input) {
    if (input === "y" || input === "Y") {
        // rl.setPrompt("Enter project name:");
        // rl.prompt();
        rl.question("Enter project name: ", createProject);
    } else {
        rl.write("=== Process cancelled successfully ===");
        rl.close();
    }
    // rl.write("\n Process cancelled successfully ... \n");
    // rl.close();ag
}

rl.question(
    "You are about to create a new Express project ( enter y to continue )",
    mySetup
);
