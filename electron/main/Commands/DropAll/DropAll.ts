import { list } from "../List/List";
import { drop } from "../Drop/Drop";

export const drop_all = (commandInput: string[]) => {
    if(commandInput.length !==2){
        return "Incorrect number of arguments"
    }
    let regex = commandInput[1];
    if(regex === undefined){
        return "You have to specify the regex"
    }
    if(regex.length === 0){
        return "The regex can't be empty"
    }
    if(regex[0] !== "'" || regex[regex.length - 1] !== "'"){
        return "The regex has to be in ' '"
    }
    regex = regex.substring(1, regex.length - 1)

    if(regex.length === 0){
        return "The regex can't be empty"
    }
   
    let reg = new RegExp(`\\b${regex}`, "i");
    let databases = list();
    let databasesArray = databases.split("\n");

    let databasesToDrop = databasesArray.filter((database) => {
        return reg.test(database);
    });


    console.log(databasesToDrop);
    databasesToDrop.forEach((database) => {
        drop(["drop", `'${database}'`]);
    });
    return "The databases were dropped";
}

// write a javascript regex that matches all the strings that has the letter 'a' in the name
// /.*a.*/i