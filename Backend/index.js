const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRoute = require("./routes/upload");
const adminRoutes = require("./routes/admin");


dotenv.config();
const app = express();

app.use(cors({
  origin:process.env.FRONTEND_URL, // frontend origin
  credentials: true // allow cookies/auth headers
}));
app.use(express.json());
app.use("/api", uploadRoute);
app.use('/api/admin', adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch(err => console.error("DB connection failed:", err));
mongoose.connection.once('open', async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("📦 Collections in DB:", collections.map(c => c.name));
});