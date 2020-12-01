export function firstUpper(a:string) {
  return (a+'').charAt(0).toUpperCase()+a.substr(1)
}

export function firstLower(a:string) { 
  return (a+'').charAt(0).toLowerCase()+a.substr(1);
}

export function convertDate(date:Date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return  (ddChars[1]?dd:"0"+ddChars[0]) + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + yyyy;
  //return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}