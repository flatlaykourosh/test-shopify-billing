var express = require("express");
var router = express.Router();
var _apiService = require('./../services/apiService')

router.get("/shopifyBilling", async (req, res, next) => {
  const charge_id = req.query.charge_id;
  const merchantID = req.query.merchant_id;
  const shop_name = req.query.shopname;
  let retrieve_path = "/admin/api/2020-04/recurring_application_charges/" + charge_id + ".json" + "&shopname=" + shop_name;
  let activate_path = "/admin/api/2020-04/recurring_application_charges/" + charge_id + "/activate.json" + "&shopname=" + shop_name;

  let charge = await _apiService.getShopify(retrieve_path);
  if (charge) {
    if (charge.recurring_application_charge.status == "accepted") {
      //charge is accepted.
      let activate_res = await _apiService.postShopify(activate_path, charge);
      if (activate_res) {
        if (activate_res.recurring_application_charge.status == "activated") {
          //charge is activated
          //update subscription plan for merchantID
          res.redirect("/dashboard");
        }
        else {
          //activation failed
          res.send(activate_res);
        }
      }
      else {
        //activation failed
        res.send(charge)
      }
    }
    else {
      //charge is not accepted
      res.send(charge);
    }
  }
  else {
    //retrieving charge status failed
  }
});

module.exports = router;
