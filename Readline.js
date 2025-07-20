const {createInterface} = require("readline");
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (what) =>{
  console.log(what)
  rl.setPrompt(">");
  rl.prompt();
}
rl.question("Whats your name \n",(input)=>{
  console.log(`Okay ${input} lets start the Quiz\n==========\n`)
  ask("Whats the language used for structuring a web page?\n")
  
})

rl.on("line",(input)=>{
  switch(input){
    case"HTML": 
      console.clear()
      console.log("correct!!!")
      console.log("\n==========\n")
      ask("Whats the language used for styling a webpage")
      break ;
      case "CSS": 
        console.clear()
        console.log("correct!!!")
        console.log("\n==========\n")
        ask("whats the language used to make a wepage more interactive")
        break;
        case "JS":
          console.clear()
          console.log("congrats you passed all the test")
          console.log("\n==========\n")
          rl.close()
          break;
            default:
            console.log("Wrong pls try again");
            
  }
})