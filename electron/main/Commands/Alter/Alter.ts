import { databaseExists } from '../utils';
import { addColumn, removeColumn } from '../utils';

export const alter = (commandInput: string[]) => {
    let databaseName = commandInput[1];
   
    if(databaseName === undefined){
        return "You have to specify the name of the database"
    }

    if(databaseName.length === 0){
        return "The name of the database can't be empty"
    }

    if(databaseName[0] !== "'" || databaseName[databaseName.length - 1] !== "'"){
        return "The name of the database has to be in ' '"
    }

    databaseName = databaseName.substring(1, databaseName.length - 1)

    if(databaseName.length === 0){
        return "The name of the database can't be empty"
    }

    if(!/^[a-zA-Z0-9_]+$/.test(databaseName)){
        return "The name of the database can't have special characters"
    }

    if(!databaseExists(databaseName)){
        return "The database doesn't exists"
    }

    let json = commandInput[2];

    if(json === undefined){
        return "You have to specify the json"
    }

    if(json.length === 0){
        return "The json can't be empty"
    }
    
    // check if json has attribute name
    if(json.name === undefined){
        return "The json has to have an attribute 'name'"
    }

    let name = json.name;

    if(name === undefined){
        return "You have to specify the name of the column"
    }
    
    if(name.length === 0){
        return "The name of the column can't be empty"
    }

    // if(name[0] !== "'" || name[name.length - 1] !== "'"){
    //     return "The name of the column has to be in ' '"
    // }

    // name = name.substring(1, name.length - 1)

    // if(name.length === 0){
    //     return "The name of the column can't be empty"
    // }

    let isDelete = false;

    if(json.method==="delete"){
        isDelete = true;
    }else if(json.method!== undefined) {
        return "For this version, only delete method is supported"
    }

    if(!isDelete){
        // is creating a new column
        return addColumn(name, databaseName);
    }else{
        // is deleting a column
        return removeColumn(name, databaseName);
    }

}