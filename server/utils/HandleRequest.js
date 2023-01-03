export const HandleRequest = async (promise) => {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (err) {
    return [err, undefined];
  }
};
