const filter_ads = (req) => {
    
    let name = req.query.name,
        sell = req.query.sell,
        min = req.query.min || 0,
        max = req.query.max || 1000000,
        tags = [], 
        params = {};
          
    if (name && name !== 'undefined' && name !== '') {
        params.name = name;
    };
    
    if (sell && sell !== 'undefined') {
        params.sell = (sell === 'true') ? true : false;
    }
        
    params.price = {$gte : parseFloat(min), $lte : parseFloat(max)}
    
    if (req.query.tags !== 'undefined' && typeof req.query.tags == 'string') {
        params.tags = req.query.tags;
    } else if (req.query.tags && req.query.tags !== 'undefined') {
        params.tags = tags.concat(req.query.tags.split(','));
    }
    
    return params;
}

module.exports = filter_ads;