const fs = require('fs');
const path = require('path');

export const list = () =>{
    let databasesFolder = path.join(__dirname, "..", "..", "..", "databases");
    let databases = fs.readdirSync(databasesFolder);
    let tables = [];
    for(let i = 0; i < databases.length; i++){
        let database = databases[i];
        if(database.endsWith(".json")){
            tables.push(database.substring(0,database.length-5));
        }
    }

    let stringTables = "";
    for(let i = 0; i < tables.length; i++){
        stringTables += tables[i] + "\n";
    }
    return stringTables;
}