export const handleSingleFileController = async (req, res, next) => {
  try {
    let link = `http://localhost:3000/${req.file.originalname}`;
    res.json({
      success: true,
      message: "File uploaded successfully",
      result: link,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const handleMultipleFileController = async (req, res, next) => {
  try {
    let link = req.files.map((value, index) => {
      return `http://localhost:3000/${value.originalname}`;
    });
    res.json({
      success: true,
      message: "Multiple files uploaded successfully",
      result: link,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
