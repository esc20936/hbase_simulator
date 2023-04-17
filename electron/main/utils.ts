import { create } from "./Commands/Create/Create";

const arrayComandoDefinicionDatos = [
  "create",
  "list",
  "disable",
  "is_enabled",
  "alter",
  "drop",
  "drop_all",
  "describe",
];

const unaryCommand = (command: string) => {
  if (arrayComandoDefinicionDatos.includes(command)) {
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

// Function that proccess the input from the user
// if the after split the input is empty, return false
export const proccessInput = (input: string) => {
  let lowerCaseInput = input.toLowerCase();
  let processedInput = lowerCaseInput.trim().split(" ");
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
      switch (command) {
        case "create":
          return create(processedInput);
          break;
      }
    } else {
      return `Command not found "${command}"`;
    }
  }

  return processedInput;
};



