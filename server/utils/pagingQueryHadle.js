export const pagingQuery = (req) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const options = {
    page,
    limit,
    skip
  };

  return options;
};
