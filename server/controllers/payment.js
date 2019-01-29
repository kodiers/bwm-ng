const Payment = require('../models/payment');
const {normalizeErrors} = require('../helpers/mongoose');



exports.getPendingPayments = function (req, res) {
  const user = res.locals.user;
  Payment.where({toUser: user})
    .populate({path: 'booking', populate: {path: 'rental'}})
    .populate('fromUser')
    .exec(function (err, foundPayments) {
      if (err) {
        return res.status(500).send({errors: normalizeErrors(err.errors)});
      }
      return res.json(foundPayments);
    });
};
