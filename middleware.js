const validateQuery = (req, res, next) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "Parameter q (judul film) wajib diisi"
    });
  }

  next();
};

module.exports = validateQuery;
