export default class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  success(data) {
    if (data) {
      return this.res.json({
        success: true,
        payload: data,
      });
    }
    return this.res.json({
      success: true,
    });
  }

  errorParam(data) {
    return this.res.json({
      status: data.status,
      success: false,
      error: data.error,
    });
  }

  error(error) {
    if (!error.statusCode) {
      console.error(error.stack);
    }
    return this.res.status(error.statusCode).json({
      success: false,
      errors: error.errors,
    });
  }

  paging([count = 0, data = []], page = 1, limit = 10) {
    return this.res.status(200).json({
      success: true,
      totalPage: Math.ceil(count / limit),
      totalItem: count,
      page,
      item: data.length,
      payload: data
    });
  }
}
