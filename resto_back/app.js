const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db.config");

const categoryRoutes = require("./routes/category.routes");
const menuRoutes = require("./routes/menu.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/categories", categoryRoutes);
app.use("/menus", menuRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3020;

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
