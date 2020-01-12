exports.makeNotice = async (notice) => {
  return `./notices/${notice.protocol}.pdf`;
};

exports.makeGradedList = async (ratings, notice) => {
  return `./notices/Graduatoria ${notice.protocol}.pdf`;
};
