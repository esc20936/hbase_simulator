import { databaseExists } from "../utils";
import { disable } from "../Disable/Disable";
import { drop } from "../Drop/Drop";
import { create } from "../Create/Create";

export const truncate = (commandInput: string[]) => {

    if(commandInput.length !== 2){
        return "ERROR: bad syntax\n\n" + "truncate <table>"
    }

    let tableName = commandInput[1];

    // check if table exists
    if(tableName[0] !== "'" || tableName[tableName.length - 1] !== "'"){
        return "The name of the table has to be in ' '"
    }

    tableName = tableName.substring(1, tableName.length - 1)

    if(tableName.length === 0){
        return "The name of the table can't be empty"
    }

    if(!databaseExists(tableName)){
        return "The table doesn't exists"
    }

    let res = "Table '" + tableName + "' truncated\n"
    tableName = `'${tableName}'`
    let disableRes = disable(['disable', tableName])
    let dropRes = drop(['drop', tableName])
    let createRes=create(['create', tableName])

    res += "\t - " + disableRes + "\n"
    res += "\t - " + dropRes + "\n"
    res += "\t - " + createRes + "\n"

    return res
    



}