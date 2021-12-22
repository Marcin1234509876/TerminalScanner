const express = require('express');
const app = new express;
const datastore = require('nedb');
const database = new datastore('database.db');
const excel = require('excel4node');
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(express.json());

var workbook = new excel.Workbook();
var worksheet = workbook.addWorksheet('Sheet 1');
var style = workbook.createStyle({
    font: {
      color: '#FF0800',
      size: 12
    }
  });

database.loadDatabase();



 app.get('/update', (req, res)=>{
         const imei_update = req.query.IMEIupdate
         const cardnumber_update = req.query.CARDNUMBERupdate;
         const serialnumber_update = req.query.SERIALNUMBERupdate;
         const comment_update = req.query.COMMENTupdate;
         const model_update = req.query.MODELupdate;
         const firmware_update = req.query.FIRMWAREupdate;
         const telephone_update = req.query.TELEPHONEupdate;
         const operator_update = req.query.OPERATORupdate;
         database.update({Imei: imei_update}, {$set: {
             CardNumber: cardnumber_update,
             SerialNumber: serialnumber_update,
             Comment: comment_update,
             Model: model_update,
             Firmware: firmware_update,
             Telephone: telephone_update,
             Operator: operator_update
         }}, {}, function(err, numReplaced){
             console.log("replaced: " + numReplaced);
             if(err){
                 res.end();
             }
             res.write('replaced: '+ numReplaced);
             res.end();
         });
         res.end();
 });
app.get('/api', (req, res)=>{
    const imei = req.query.IMEI;
    console.log(imei);
    database.find({Imei: imei}, (err, data)=>{
        if(err){
            res.end();
        };
        res.write(JSON.stringify(data));
        
        console.log(JSON.stringify(data));
        res.end();
    });
    
    
})

app.post("/api", (req, res)=>{

        const imeiinsert = req.body.IMEIinsert;
        const cardnumber = req.body.CARDNUMBER;
        const serialnumber = req.body.SERIALNUMBER;
        const comment = req.body.COMMENT;
        const model = req.body.MODEL;
        const firmware = req.body.FIRMWARE;
        const telephone = req.body.TELEPHONE;
        const operator = req.body.OPERATOR;

        database.insert({
            Imei: imeiinsert, 
            CardNumber: cardnumber,
            SerialNumber: serialnumber,
            Comment: comment,
            Model: model,
            Firmware: firmware,
            Telephone: telephone,
            Operator: operator
        });
        console.log("insert succesfull");
        res.write('insert succesfull');
        res.end();
    
})


app.listen(port, ()=> console.log("listening at " + port));
