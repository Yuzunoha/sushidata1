'use strict';

const fs = require('fs');
const p = console.log;
const datastr = fs.readFileSync('datastr.txt', 'utf8');
const dataArr = datastr.split('\n');

p(dataArr);
