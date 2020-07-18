'use strict';

const fs = require('fs');
const p = console.log;
const createObjectFromLine = (line) => {
  const a = line.trim().split(' ');
  const o = {};
  o.rank = Number(a[0].split('位')[0]);
  o.name = a[1];
  o.score = Number(a[2]);
  o.typeCnt = Number(a[4]);
  o.typeCntAve = Number(a[6]);
  o.typeMissCnt = Number(a[8]);
  o.created = a[10];
  return o;
};

// ミスってる。フィールド名
const createDataArrDateAsc = (dataArr) => {
  const dataArrDateAsc = JSON.parse(JSON.stringify(dataArr));
  dataArrDateAsc.sort((a, b) => (a.date > b.date ? 1 : -1));
  return dataArrDateAsc;
};

const datastr = fs.readFileSync('datastr.txt', 'utf8');
const dataArr = datastr.split('\n');
const dataArrDateAsc = createDataArrDateAsc(dataArr);

p(dataArrDateAsc);
