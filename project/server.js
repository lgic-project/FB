import {} from "./database/database.js"
import {app} from "./app.js"

const port = 2050

app.listen(port, () => {
    console.log(`Server listening on port`,port);
  });
  
