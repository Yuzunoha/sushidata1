'use strict';

const fs = require('fs');
const p = console.log;

/** データ1行からオブジェクトを作る */
const createObjFromLine = (line) => {
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

/** 行配列からオブジェクトの配列を作る */
const createdObjArrFromLineArr = (lineArr) => {
  const objArr = [];
  lineArr.forEach((line) => {
    const obj = createObjFromLine(line);
    objArr.push(obj);
  });
  return objArr;
};

/** オブジェクトのディープコピーを作る */
const createDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

/** 日付の昇順にしたディープコピーを作る */
const createObjArrDateAsc = (objArr) => {
  const objArrDateAsc = createDeepCopy(objArr);
  objArrDateAsc.sort((a, b) => (a.created > b.created ? 1 : -1));
  return objArrDateAsc;
};

/** span刻みの配列の配列を作る */
const createArrEverySpan = (arr, span) => {
  const arrEverySpan = [];
  const maxIdx = arr.length - 1;
  let startIdx = 0;
  while (true) {
    const endIdx = startIdx + span - 1 < maxIdx ? startIdx + span - 1 : maxIdx;
    const arrSpan = [];
    for (let i = startIdx; i <= endIdx; i++) {
      arrSpan.push(arr[i]);
    }
    arrEverySpan.push(arrSpan);
    if (endIdx === maxIdx) {
      break;
    }
    startIdx += span;
  }
  return arrEverySpan;
};

/** 配列内の日付データの更新間隔の平均値を取得する */
const calcAveUpdateTimeMs = (objArr) => {
  // 日付の昇順にした配列を取得
  const objArrDateAsc = createObjArrDateAsc(objArr);
  const len = objArrDateAsc.length;
  let sumDiffMs = 0;
  for (let i = 0; i <= len - 2; i++) {
    const leftDate = objArrDateAsc[i].created;
    const rightDate = objArrDateAsc[i + 1].created;
    const diffMs = Date.parse(rightDate) - Date.parse(leftDate);
    sumDiffMs += diffMs;
  }
  const aveUpdateTimeMs = Math.floor(sumDiffMs / (len - 1));
  return aveUpdateTimeMs;
};

/** ミリ秒の値をn時間に変換する */
const msToHours = (ms) => ms / (1000 * 60 * 60);

/** メイン関数 */
const main = () => {
  const datastr = fs.readFileSync('datastr.txt', 'utf8');
  const dataArr = datastr.trim().split('\n');
  const objArr = createdObjArrFromLineArr(dataArr);
  const arrEverySpan = createArrEverySpan(objArr, 150);

  arrEverySpan.forEach((everySpan) => {
    const ms = calcAveUpdateTimeMs(everySpan);
    const hours = msToHours(ms);
    p(hours);
  });
};
main();
