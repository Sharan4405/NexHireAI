import express from "express";
import router from "./routes/jobfindrouter.js";
import coldEmailRouter from "./routes/coldEmailrouter.js";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/cold-email", coldEmailRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
