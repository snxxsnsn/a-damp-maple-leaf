function createCalendar(id, year, month) {
    let elem = document.getElementById(id);
    let mon = month - 1; // 월은 0부터 시작하므로
    let d = new Date(year, mon);

    let table = '<table><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr><tr>';

    // 공백 채우기
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // 오늘 날짜 표시
    let today = new Date();

    // 날짜 채우기
    while (d.getMonth() == mon) {
        let cls = '';
        if (getDay(d) % 7 == 0) cls = 'sunday'; // 일요일
        if (d.getDate() == today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()) {
            cls += ' today'; // 오늘 날짜
        }
        table += `<td class="${cls}">` + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { // 토요일
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // 나머지 공백 채우기
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';

    elem.innerHTML = table;
}

function getDay(date) { // 일요일부터 0으로 시작
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

createCalendar("calendar", 2024, 5); // 예시로 2024년 5월 달력 생성