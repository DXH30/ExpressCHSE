var express = require('express');
var router = express.Router();
var axios = require('axios');

axios.defaults.baseURL = 'https://pro.rajaongkir.com/api';
axios.defaults.headers.common['key'] = '2bd176d85b423365f22a23cddd2105f4';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Router GET provinsi
router.get('/provinsi', function(req, res, next) {
    axios.get('/province')
        .then(response => res.json(response.data))
        .catch(err => res.send(err))
});

// Router GET city by province_id
router.get('/kota/:provId', function(req, res, next) {
    const id = req.params.provId;
    axios.get(`/city?province=${id}`)
        .then(response => res.json(response.data))
        .catch(err => res.send(err));
});

// Router GET costs
router.get('/ongkos/:asal/:tujuan/:berat/:kurir', function(req, res, next) {
    const param = req.params;
    axios.post('/cost', {
        origin: param.asal,
        destination: param.tujuan,
        weight: param.berat,
        courier: param.kurir,
        originType: "city",
        destinationType: "city"
    })
    .then(response => res.json(response.data))
    .catch(err => res.send(err));
});

module.exports = router;
