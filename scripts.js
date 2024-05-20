function createCalendar(id, year, month) {
    let elem = document.getElementById(id);
    let d = new Date(year, month - 1); // 월은 0부터 시작하므로 1을 빼줍니다.

    // 달력 테이블 헤더에 월 이름을 표시합니다.
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let table = '<table><tr><th colspan="7">' + monthNames[month - 1] + ' ' + year + '</th></tr>';

    table += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

    // 공백 채우기
    table += '<tr>'.repeat(getDay(d));

    // 날짜 채우기
    while (d.getMonth() == month - 1) {
        table += '<td>' + d.getDate() + '</td>';
        if (getDay(d) % 7 == 6) { // 토요일
            table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
    }

    // 나머지 공백 채우기
    if (getDay(d) != 0) {
        table += '<td colspan="' + (7 - getDay(d)) + '"></td>';
    }

    table += '</tr></table>';

    elem.innerHTML = table;
}

function getDay(date) { // 일요일부터 0으로 시작
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

// 현재 날짜를 가져옵니다.
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.

// 달력을 생성합니다.
createCalendar("calendar", currentYear, currentMonth);
