const express = require('express');
const fs = require('fs');
const { getTrainNumber, getCityList, getTrainSeat } = require('./crawler');

const app = express();

app.get('/',(req,res) => {
    res.status(200);
    res.send("hello express!");
    res.end();
}).get('/rest',(req,res) => {
    res.json({
        result: 1,
        msg: 'hello express'
    });
    res.end();
}).get('/rest/cityList.json',(req,res) => {
    // 返回城市列表信息
    fs.readFile('./rest/city/trainCity.json' ,(err,data) => {
        if(!err){
            res.send(data.toString());
            res.end();
        }else{
            console.log(err);
        }
    });
}).get('/queryCity.json',async (req,res) => {
    // 查询/提示城市列表
    var search = req.query,
        result = await getCityList(search);
    res.send(result);
    res.end();
}).get('/rest/query',async (req,res) => {
    // 查询车次信息
    var query = req.query,
    result = await getTrainNumber(query);
    res.send(String(result));
    res.end();
}).get('/api/train/trainSeat', async (req, res) => {
    console.log(req.query);
    const query = req.query;
    const result = await getTrainSeat(query);
    res.send(result);
});

app.listen(5000,() => console.log("server is runing!: http://localhost:5000"));
