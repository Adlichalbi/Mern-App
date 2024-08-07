const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
};

export default errorHandler;