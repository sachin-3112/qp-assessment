// index.js
const express = require("express");
require("dotenv").config();

const authMiddleware = require("./Middleware/authMiddleware");
const adminRoutes = require("./Routes/Admin.routes");
const userRoutes = require("./Routes/Users.routes");
const authRoutes = require("./Routes/Auth.routes");
const groceryRoutes = require("./Routes/Grocery.routes");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

if (process.env.DB_POOL == "SQL") {
  /** SQLConnection */
  const sql = require("./Models/SQL/SQLConn");
} else {
  /** MongoConnection */
  const mongo = require("./Models/MD/MongoConn");
}
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

/** Below routes are un-secured routs */
app.use("/api/v1", authRoutes);

/** Below routes are secured routs */
// app.use(authMiddleware.verifyRequest);

app.use("/api/v1/users", authMiddleware.verifyRequest, userRoutes);
app.use("/api/v1/product", authMiddleware.verifyAdmin, groceryRoutes);
app.use("/api/v1/admin", authMiddleware.verifyRequest, adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
