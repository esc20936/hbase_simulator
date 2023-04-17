const fs = require('fs');
const path = require('path');

export const disable  = (commandInput: string[]) => {
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

    // check if file exists
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", databaseName+".json");
    if(!fs.existsSync(databasePath)){
        return "The database doesn't exist";
    }

    // check if the database is already disabled
    let database = JSON.parse(fs.readFileSync(databasePath));
    if(!database.ENABLED){
        return "The database is already disabled";
    }

    // disable the database
    database.ENABLED = false;
    fs.writeFileSync(databasePath, JSON.stringify(database));
    return "The database was disabled";
    
}