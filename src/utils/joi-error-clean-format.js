
const errorjoiFromat = (error) => {
      return error.details
            .map(el => {
                  const msg = el.message.replace(/\"/g, '');
                  return msg.charAt(0).toUpperCase() + msg.slice(1);
            })
            .join(', ');
};

module.exports = {
      errorjoiFromat
}  