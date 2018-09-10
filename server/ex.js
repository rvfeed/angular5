app.get("/email", (req, res) =>{
    console.log("emaillll")
        var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'raj.lh404',
        pass: '9885266514'
      }
    });
    
    var mailOptions = {
      from: 'raj.lh404@gmail.com',
      to: 'akhil406@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        res.json({"msg": "sent"})
        res.end()
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    });
    
    app.post("/fileupload", (req, res) => {
      var form = new formidable.IncomingForm();
    
         var auth =  checkAuth(req.cookies['X-XSRF-TOKEN'])
    
    form .on('field', function(name, field) {
            console.log('Got a field:', name);
    //form.emit("end")
        })
        form.on("fileBegin", (name, file) => {
            file.path = __dirname+"/uploads/"+file.name;
        })
        form.on('file', function(name, file) {
            console.log('Got a file:', file.name, name);
        
    //form.emit("end")
        })
       
        form.parse(req);
        
    form.on('end', function() {
            res.json({"success": true})
            res.end();
        })
    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log(bytesReceived, "--", bytesExpected)
    });
        
    })