import app from "./src/index";
import { PORT } from "./src/utils/config";

app.listen(PORT, () => {
  console.log("Done");
});