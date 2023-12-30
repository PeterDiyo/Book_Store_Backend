import express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Rout for Save new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        massage: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
});

//Route for Get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      Count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
});

//Route for Get One book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById({ _id: id });
    return res.status(200).json({ book });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
});

//Route for Update a Book
router.put("/book/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        massage: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate({ _id: id }, req.body);
    if (!result) {
      return res.status(404).json({ massage: "Book not found" });
    }
    return res.status(200).send({ massage: "Book updated successfully" });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
});

//Route to Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({ massage: "Book not found" });
    }
    return res.status(200).send({ massage: "Book deleted successfully" });
  } catch {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
});


export default router;