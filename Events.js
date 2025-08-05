const EventEmitter = require('events');
const Emitter = new EventEmitter();

let E = Emitter.on("var",()=>{
  console.log(" you have been var")
})
E.emit("var");
