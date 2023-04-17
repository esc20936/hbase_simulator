import { create } from "./Commands/Create/Create";
import { list } from "./Commands/List/List";
import { disable } from "./Commands/Disable/Disable";
import { is_enabled } from "./Commands/Is_enabled/Is_enabled";
import { drop } from "./Commands/Drop/Drop";
import { describe } from "./Commands/Describe/Describe";
import { alter } from "./Commands/Alter/Alter";
import { drop_all } from "./Commands/DropAll/DropAll";
import { put } from "./Commands/Put/Put"
import { get } from "./Commands/Get/Get";
import { scan } from "./Commands/Scan/Scan";
import { count } from "./Commands/Count/Count";
import { truncate } from "./Commands/Truncate/Truncate";
import { deleteAll } from "./Commands/DeleteAll/DeleteAll";
import { deleteR } from "./Commands/Delete/Delete";


const arrayComandoDefinicionDatos = [
  "create",
  "list",
  "disable",
  "is_enabled",
  "alter",
  "drop",
  "drop_all",
  "describe",
  "put",
  "get",
  "scan",
  "count",
  "truncate",
  "delete_all",
   "delete",
];

const arrayComandosDML = [

  "delete",
  "delete_all",
]



const unaryCommand = (command: string) => {
  if (arrayComandoDefinicionDatos.includes(command)) {
    if (command === "list") {
      return list();
    }

    return "Not enough arguments";
  }

  const unaryObjectResponse = {
    help: "This is the help paragraph\nTry to use the command 'help' to see this paragraph again",
    version: "Version 1.0.0",
    whoami: "You are the user, but what are you?",
    clear: "clear",
  };
  let response: String = unaryObjectResponse[command];
  if (response === undefined) {
    return `Command not found "${command}"`;
  }
  return response;
};

const convertStringToJson = (value: string) => {
  try{
    let json = JSON.parse(value);
    return json;
  }catch(e){
    return null;
  }
}

const formatInputArray = (string: string) => {
  let lowerCaseInput = string.toLowerCase();

  // if the input contains a {, then it is an alter command
  if(lowerCaseInput.includes("{")){
    // separete the input in two parts
    let alterCommand = lowerCaseInput.split("{")
    // get the first part
    let firstPart = alterCommand[0]
    // get the second part
    let secondPart = alterCommand[1]

    // add { to the start of the second part
    secondPart = "{" + secondPart

    let proccessedFirstPart = formatInputArray(firstPart)
    // let proccessedSecondPart = formatInputArray(secondPart)
   
    // replace => with : in the second part
    secondPart = secondPart.replaceAll("=>",":")
    secondPart = secondPart.replaceAll("'",'"')
    secondPart = secondPart.replaceAll(" ","")
    
    // add "" to the keys of the json
    
    console.log("MUESTRA")
    console.log(secondPart)
    // convert second part json
    let json = convertStringToJson(secondPart)

    if(json === null){
      return "ERROR: The json is not valid"
    }
    
    // add the json to the first part
    proccessedFirstPart.push(json)

    return proccessedFirstPart
    
  }
  
  
  
  // delete all extra spaces
  let processedInput = lowerCaseInput
    .trim()
    .split(" ")
    .filter((word) => word !== "");
  // delete all extra commas
  processedInput = processedInput
    .map((word) => word.split(",").filter((word) => word !== ""))
    .flat();

  return processedInput;
};

// Function that proccess the input from the user
// if the after split the input is empty, return false
export const proccessInput = (input: string) => {
  let lowerCaseInput = input.toLowerCase();
  let processedInput = formatInputArray(lowerCaseInput);

  if(processedInput === "ERROR: The json is not valid")
    return processedInput



  if (processedInput.length === 0) {
    return "";
  } else if (processedInput.length === 1) {
    let command = processedInput[0];
    return unaryCommand(command);
  }
  // more than one word
  else if (processedInput.length > 1) {
   



    let command = processedInput[0];
    if (arrayComandoDefinicionDatos.includes(command)) {
      // FUNCIONES DDL
      switch (command) {
        case "create":
          return create(processedInput);
          break;
        case "disable":
          return disable(processedInput);
          break;
        case "is_enabled":
          return is_enabled(processedInput);
          break;
        case "drop":
          return drop(processedInput);
          break;
        case "describe":
          return describe(processedInput);
          break;
        case "alter":
          return alter(processedInput);
          break;
        case "drop_all":
          return drop_all(processedInput);
          break;

        // FUNCIONES DML
        case "put":
          return put(processedInput);
          break;
        case "get":
          return get(processedInput);
          break;
        case "scan":
          return scan(processedInput);
          break;
        case "count":
          return count(processedInput);
          break;
        
        case "truncate":
          return truncate(processedInput);
          break;

        case "delete_all":
          return deleteAll(processedInput);
          break;
        case "delete":
          return deleteR(processedInput);
          break;
      }
    }else {
      return `Command not found "${command}"`;
    }
  }

  return processedInput;
};

// put 'pablo','1','col1:personal','Pablo Escobar'