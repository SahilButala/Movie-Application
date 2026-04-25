
const errorjoiFromat = (error) => {
      return error.details
            .map(el => el.message.replace(/\".*?\"\s*/, ''))
            .join(' ');
}

module.exports = {
      errorjoiFromat
}