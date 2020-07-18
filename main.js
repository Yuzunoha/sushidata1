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
const datastr = fs.readFileSync('datastr.txt', 'utf8');
const dataArr = datastr.split('\n');

// sample start 古い順
var arr = [
  {
    date: '2015/06/14 20:02:02',
    content: 'g',
  },
  {
    date: '2014/06/14 20:02:01',
    content: 'f',
  },
  {
    date: '2015/05/12 10:02:02',
    content: 'e',
  },
];
arr.sort((a, b) => (a.date > b.date ? 1 : -1)); // 古い順
// sample end 古い順

p(createObjectFromLine(dataArr[77]));
