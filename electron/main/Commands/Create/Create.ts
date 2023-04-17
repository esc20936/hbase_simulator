import { databaseExists, createDatabase,createDatabaseWithColumns ,validColumns } from "../utils";

export const create = (processedInput: string[]) => {
    let name = processedInput[1]
    console.log(processedInput)
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name === undefined) {
        return "You have to specify the name of the database"
    }
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name.length === 0) {
        return "The name of the database can't be empty"
    }
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name[0] !== "'" || name[name.length - 1] !== "'") { 
        return "The name of the database has to be in ' '"
    }
    // remove the ' '
    name = name.substring(1, name.length - 1)
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name.length === 0) {
        return "The name of the database can't be empty"
    }
    // check if the name of the database is valid
    // it has to be alphanumeric
    // it can't start with a number
    // it can't have special characters
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
        return "The name of the database can't have special characters"
    }
    // check if the database already exists
    if (databaseExists(name)) {
        return "The database already exists"
    }
    // create the database
    if(processedInput.length > 2){
        let columns = processedInput.slice(2)
        console.log(columns)
        if(!validColumns(columns)){
            return "ERROR: The column names are not valid"
        }
        createDatabaseWithColumns(name,columns)
    }else{

        createDatabase(name)
    }

    return `Database ${name} created ${new Date().getTime()}`
}