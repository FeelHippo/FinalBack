const filter_ads = (req) => {
    
    let name = req.query.name,
        type = req.query.type,
        price_low = req.query.price_low || 0,
        price_high = req.query.price_high || 1000000, 
        params = {};
          
    if (name && name !== 'undefined' && name !== '') {
        params.name = name;
    };
    
    if (type && type !== 'undefined') {
        params.sell = (type === 'true') ? true : false;
    }
    
    params.price = {$gte : parseFloat(price_low), $lte : parseFloat(price_high)}
    
    if (req.query.tags !== 'undefined' && typeof req.query.tags == 'string') {
        params.tags = [];
        params.tags[0] = JSON.parse(req.query.tags)[0];
        params.tags[1] = JSON.parse(req.query.tags)[1];
    }
    
    return params;
}

module.exports = filter_ads;