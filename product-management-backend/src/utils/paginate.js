module.exports = function paginate(query, page = 1, limit = 10) {
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.max(parseInt(limit) || 10, 1);
  const skip = (page - 1) * limit;
  return { query, page, limit, skip };
};
