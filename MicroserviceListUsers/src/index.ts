import app from "./3. Infrastructure - Drivers/Http/app";
import config from "./config/config";

app.listen(config.port, () =>
  console.log(`Server is running in port ${config.port}`)
);
