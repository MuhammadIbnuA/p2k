const Data = require('../models/datamodels'); // Replace with the correct path to the model file

// Controller to handle GET request to fetch all data
exports.getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

// Controller to handle GET request to fetch data by nim
exports.getDataByNim = async (req, res) => {
  try {
    const nim = req.params.nim;
    const data = await Data.findOne({ nim: nim });
    
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

// Controller to handle POST request to add new data
exports.addData = async (req, res) => {
  try {
    const { nama, nim, divisi, sign } = req.body;
    const newData = new Data({ nama, nim, divisi, sign });
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.status(400).json({ error: 'Error adding data' });
  }
};
