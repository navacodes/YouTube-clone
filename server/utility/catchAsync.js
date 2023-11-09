export default (fn) => {
  return (req, res, next) => {
    // eslint-disable-next-line no-undef
    fn(req, res, next).catch(next);
  };
};
