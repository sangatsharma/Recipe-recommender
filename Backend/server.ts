import app from "./src/index";
import { PORT } from "./src/utils/config";

app.listen(PORT, () => {
  console.log("Done");
});
app.use("/", (req, res) => {
  res.json({ message: "Hello World" });
});
