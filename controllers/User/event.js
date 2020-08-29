const Event = require('../../models/Event');

exports.create = (req, res) => {
    console.log('Reached create');
    const { 
            name, 
            about, 
            date,
            isPaid,
            price,
            isPublic,
            creator        
        } = req.body;

    // Validation
    const textFormat = /[a-z A-Z0-9]+$/;
    if (name === null || name === undefined) {
        return res.status(400).json({
            error: 'Name is required'
        });
    }
    if(!textFormat.test(name)) {
        return res.status(400).json({
            error: 'Name should not contain symbols'
        });
    }
    if (about === null || about === undefined){
        return res.status(400).json({
            error: 'About is required'
        });
    }
    if (date === null || date=== undefined) {
        console.log('Date is required');
        return res.status(400).json({
            error: 'Date is required'
        });
    }
    if (isPaid === null || isPaid === undefined ) {
        console.log('Select paid or free option');
        return res.status(400).json({
            error: 'Select paid or free option'
        });
    }
    if(!(isPaid === 'free' || isPaid === 'paid')) {
        console.log('Select paid or free option');
        return res.status(400).json({
            error: 'Select paid or free option'
        });
    }
    if (price === null || price === undefined || typeof(price) !== 'number' ) {
        console.log('Price is required');
        return res.status(400).json({
            error: 'Price is required'
        });
    }
    if (isPublic === null || isPublic === undefined ) {
        console.log('Select public or private option');
        return res.status(400).json({
            error: 'Select public or private option'
        });
    }
    if(!(isPublic === 'public' || isPublic === 'private')) {
        return res.status(400).json({
            error: 'Select public or private option'
        });
    }
    if (creator === null || creator === undefined || !textFormat.test(creator)) {
        console.log('Please login to continue');
        return res.status(400).json({
            error: 'Please login to continue'
        });
    }
    console.log('Cleared validation');

    let obj = new Event({
        name: name,
        about:about, 
        date:date,
        isPaid:isPaid,
        price:price,
        isPublic:isPublic,
        creator:creator 
    });

    Event.create(obj, function(err,item){
        if(err)
        {
            console.log(err);
            console.log('Error in create');
            return res.status(400).json({
              error: 'Event create failed'
            });
        }      
        else{
            console.log("Succesfully Created Event");
            res.json(item);
        }
    });
};

exports.read = (req, res) => {
    const eventId = req.params.eventId;
    Event.findById(eventId).exec((err, event) => {
        if (err || !event) {
            return res.status(400).json({
                error: 'Event not found'
            });
        }
        else {
            res.json(event);
        }
    });
};

exports.update = (req, res) => {
    const eventId = req.params.eventId;
    const { 
        name, 
        about, 
        date,
        isPaid,
        price,
        isPublic,
        creator        
    } = req.body;

    // Validation
    if (!name) {
        return res.status(400).json({
            error: 'Name is required'
        });
    }
    if (!about) {
        return res.status(400).json({
            error: 'About is required'
        });
    }
    if (!date) {
        return res.status(400).json({
            error: 'Date is required'
        });
    }
    if (!isPaid) {
        return res.status(400).json({
            error: 'Select paid or free'
        });
    }
    if (!price) {
        return res.status(400).json({
            error: 'Price is required'
        });
    }
    if (!isPublic) {
        return res.status(400).json({
            error: 'Select public or private'
        });
    }
    if (!creator) {
        return res.status(400).json({
            error: 'Login is required'
        });
    }

    let obj = new Event({
        name: name,
        about:about, 
        date:date,
        isPaid:isPaid,
        price:price,
        isPublic:isPublic,
        creator:creator 
    });

    Event.findByIdAndUpdate(eventId, {$set:obj},{ new: true }, function (err,item) {
        if(err)
        {
            console.log(err);
            return res.status(400).json({
              error: 'Event update failed'
            });
        }      
        else{
            console.log("Succesfully updated event");
            res.json(item);
        }
    })
};

exports.EventPageCount = (req, res) => {
    Event.countDocuments({},function (error, eventCount)
    {
        if (error) {
            console.log('Error in finding pageCount ', error);
            return res.status(400).json({
                error: 'Error in finding pageCount'
            });
        }
        else {
            const eventsPerPage = 5;
            const pageCount = Math.ceil(eventCount/eventsPerPage);
            res.json(pageCount);
        }
    });
};

exports.EventPageData = (req, res) => {
    const pageNumber = req.params.pagenumber;
    const eventsPerPage = 5;
    Event.find({})
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * eventsPerPage)
        .limit(eventsPerPage)
        .exec((err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error in finding events'
                });
            }
            else {
                res.json(doc);
            }
          });
};

