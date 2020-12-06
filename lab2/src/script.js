const ERR_DATA = "Incorrect data";
const XY_REGULAR = /\s*(-?\d+)\s*;\s*(-?\d+)\s*/;

const DATE_REGULAR = /\s*(\d\d?)\s*.\s*(\d\d?)\s*.\s*(\d\d\d\d)\s*/;
// dd.mm.yyyy

// Длинна вектора
function vector_len(a, b) {
  return Math.sqrt( Math.pow(a[0]-b[0], 2) + Math.pow(a[1]-b[1], 2) )
}

// Существует ли треугольник с заданными длинами сторон?
function tri_exist(a, b, c) {
  return (a+b > c) && (a+c > b) && (b+c > a)
}

function $(selector) {
  return document.querySelectorAll(selector)
}

function $$(selector) {
  return document.querySelector(selector)
}

Date.prototype.fromString = function(s) {
  let date = DATE_REGULAR.exec(s);
  if (date) {
    date[2]--;
    let dt = new Date(date[3], date[2], date[1]);
    if ( dt.getFullYear() == Number(date[3]) &&
         dt.getMonth() == Number(date[2]) &&
         dt.getDate() == Number(date[1])
    ) {
      this.setFullYear(date[3]);
      this.setMonth(date[2]);
      this.setDate(date[1]);
    } else {
      return false
    }
  }
  return date != null
}

Date.prototype.getWeek = function() {
  // https://bitbucket.org/agustinhaller/date.getweek
  // We have to compare against the first monday of the year not the 01/01
  let day_miliseconds = 86400000, // 60*60*24*1000
      onejan = new Date(this.getFullYear(),0,1,0,0,0),
      onejan_day = (onejan.getDay()==0)? 7: onejan.getDay(),
      days_for_next_monday = (8-onejan_day),
      // This reffers to the miliseconds of the next monday after 01/01
      onejan_next_monday_time = onejan.getTime() +
                                (days_for_next_monday * day_miliseconds),
      // If one jan is not a monday, get the first monday of the year
      first_monday_year_time = (onejan_day>1)? onejan_next_monday_time:
                                               onejan.getTime(),
      this_date = new Date(
        this.getFullYear(), this.getMonth(),this.getDate(),0,0,0
      ), // This at 00:00:00
      this_time = this_date.getTime(),
      days_from_first_monday = Math.round(
        ((this_time - first_monday_year_time) / day_miliseconds)
      );
      
  let first_monday_year = new Date(first_monday_year_time);
  //console.log("FIRST MONDAY OF THE YEAR -> ", first_monday_year);
  //console.log("DAYS FROM FIRST MONDAY -> ", days_from_first_monday);
  
  // ... (see original)
  return (days_from_first_monday>=0 && days_from_first_monday<364)?
         Math.ceil((days_from_first_monday+1)/7): 52;
}

Date.prototype.getZodiac = function() {
  const values = [
    [1,  20, 2,  18], [2,  19, 3,  20], [3, 21, 4,  19],
    [4,  20, 5,  20], [5,  21, 6,  21], [6, 22, 7,  22],
    [7,  23, 8,  22], [8,  23, 9,  22], [9, 23, 10, 22],
    [10, 23, 11, 21], [11, 22, 12, 21], [12, 22, 1, 19],
  ], strings = [
    "Водолей",  "Рыбы",     "Овен",
    "Телец",    "Близнецы", "Рак",
    "Лев",      "Дева",     "Весы",
    "Скорпион", "Стрелец",  "Козерог"
  ];
  let i = 0,
      d = this.getDate(), m = this.getMonth()+1;

  for (let x of values) {
    if (m==x[0] && d>=x[1] || m==x[2] && d<=x[3]) {
      return strings[i];
    }
    i++;
  }
  return ERR_DATA;
}
