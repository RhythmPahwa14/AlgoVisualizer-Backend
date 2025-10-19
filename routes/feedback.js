const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback.js');

router.post('/', async (req, res , next) => {
    try{
        const { name, email, message} = req.body;
        const feedback = new Feedback({
            name , 
            email, 
            message
        });
        
        await feedback.save();
        res.status(201).json({ 
            success: true,
            message: 'Feedback submitted successfully' 
        });

    }catch(err){
        console.error('feedback error:', err);
        res.status(500).json({ 
      success: false,
      message: 'Server error during feeback submission' 
    });
    }
});

module.exports = router;

