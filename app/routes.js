
// normal routes ===============================================================
module.exports = function (app, passport, db) {
    // show the home page (will also have our login links)
   

  app.get('/admin',isLoggedIn,   function (req, res) {
    db.collection('contactforms').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('admin.ejs', {
        user: req.user,
        messages: result
      })
    })
  });
  
  app.get('/about', function(req, res) {
    res.render('about.ejs');
});

    app.get('/contact', function(req, res) {
      res.render('contact.ejs');
  });

  app.get('/work', function(req, res) {
    res.render('work.ejs');
});
    // PROFILE SECTION =========================
    app.get('/', function(req, res) {
      res.render('index.ejs');
    }); 

 
    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes =============================================================== ツ
 
// Post
    app.post('/inquiries', (req, res) => {
      db.collection('contactforms').insertOne({  
        name: req.body.name,
        email: req.body.email,
        msg: req.body.msg,
        contacted: false
      }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
  
    })
//  update method
    app.put('/update', (req, res) => {
      db.collection('contactforms')
      .findOneAndUpdate({
        name: req.body.name,
        email: req.body.email,
        msg: req.body.msg}, {
        $set: {
          contacted:true
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })

      
    });

    app.delete('/inquiries', (req, res) => {
    console.log({name: req.body.name, email: req.body.email, msg: req.body.msg})
      db.collection('contactforms').findOneAndDelete({name: req.body.name, email: req.body.email, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Customer Contacted!')
      })
    })

   

    

        // =============================================================================
        // AUTHENTICATE (FIRST LOGIN) ==================================================
        // =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/admin',
            failureRedirect : '/login',
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
    
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
