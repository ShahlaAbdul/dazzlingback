import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const dazzySchema = new Schema(
  {
        title: String,
    category: {
      categoryIcon: String,
        categoryName: String,
    },
    image: String,
    description: String,
  },
  {
    timestamps: true,
  }
);
const DazzyModel = mongoose.model("Dazzy", dazzySchema);

app.get("/", async (req, res) => {
  try {
    const dazzydata = await DazzyModel.find({});
    res.send(dazzydata);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dazzydata = await DazzyModel.findById({ id });
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, category, image, description } = req.body;
    const newdazzyData = new DazzyModel({
      title,
      category,
      image,
      description,
    });
    await newdazzyData.save();
    res.send("post methodu ugurlu");
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image, description } = req.body;
    const newdazzyData = new DazzyModel.findByIdAndUpdate({ id });
    res.send("put methodu ugurlu");
  } catch (error) {
    res.send(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newdazzyData = new DazzyModel.findByIdAndDelete({ id });
    res.send("delete methodu ugurlu");
  } catch (error) {
    res.send(error.message);
  }
});
mongoose
  .connect("mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/")
  .then(() => console.log("Connected!"))
  .catch(() => console.log("not connected"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
