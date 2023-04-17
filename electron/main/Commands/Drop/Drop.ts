import { is_enabled } from "../Is_enabled/Is_enabled";
const fs = require('fs');
const path = require('path');
export const drop = (commandInput: string[]) => {
    if(commandInput.length !== 2){
        return "Invalid number of arguments";
    }

    // check if the database exists
    let databaseName = commandInput[1];

    // clean the database name
    if(databaseName[0] !== "'" || databaseName[databaseName.length - 1] !== "'"){
        return "The name of the database has to be in ' '";
    }

    databaseName = databaseName.substring(1,databaseName.length - 1);

    if(databaseName.length === 0){
        return "The name of the database can't be empty";
    }

    // check if the database is enabled
    const enabled = is_enabled(['is_enabled',`'${databaseName}'`]);

    if(enabled==="The database doesn't exist"){
        return "The database doesn't exist";
    }

    if(enabled){
        return "The database is enabled\n To drop it you have to disable it first";
    }

    // drop the database
    // delete the file
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", databaseName+".json");
    fs.unlinkSync(databasePath);
    return `The database '${databaseName}' was dropped`;

}