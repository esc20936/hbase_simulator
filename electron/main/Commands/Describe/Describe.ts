import { is_enabled } from "../Is_enabled/Is_enabled";
import { databaseExists } from "../utils";
import { getColumns } from "../utils";

const fs = require('fs');
const path = require('path');

export const describe = (commandInput: string[]) => {
    if(commandInput.length !== 2){
        return "Invalid number of arguments";
    }

    // check if the database exists
    let databaseName = commandInput[1];
    if(databaseName[0] !== "'" || databaseName[databaseName.length - 1] !== "'"){
        return "The name of the database has to be in ' '";
    }

    databaseName = databaseName.substring(1,databaseName.length - 1);

    if(databaseName.length === 0){
        return "The name of the database can't be empty";
    }

    // check if the database exists
    if(!databaseExists(databaseName)){
        return "The database doesn't exist";
    }

    // check if the database exists
    const enabled = is_enabled(['is_enabled',`'${databaseName}'`]);

    const columns = getColumns(databaseName);

    let result = `Database: ${databaseName}\n Columns: ${columns.join(", ")}\n Enabled: ${enabled}`;

    return result;

    

}