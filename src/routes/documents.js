// const express = require('express');
// const router = express.Router();
// const Document = require('../models/Document');

// // Get all documents
// router.get('/', async (req, res) => {
//   try {
//     const documents = await Document.find();
//     res.json(documents);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get single document
// router.get('/:id', async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
//     if (!document) return res.status(404).json({ message: 'Document not found' });
//     res.json(document);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Create document
// router.post('/', async (req, res) => {
//   const document = new Document({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   try {
//     const newDocument = await document.save();
//     res.status(201).json(newDocument);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update document
// router.put('/:id', async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
//     if (!document) return res.status(404).json({ message: 'Document not found' });

//     if (req.body.title) document.title = req.body.title;
//     if (req.body.content) document.content = req.body.content;
//     document.updatedAt = Date.now();

//     const updatedDocument = await document.save();
//     res.json(updatedDocument);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete document
// router.delete('/:id', async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
//     if (!document) return res.status(404).json({ message: 'Document not found' });
    
//     await document.deleteOne();
//     res.json({ message: 'Document deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;



