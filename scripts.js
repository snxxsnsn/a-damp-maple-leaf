function createCalendar(id, year, month) {
    let elem = document.getElementById(id);
    let mon = month - 1; // 월은 0부터 시작하므로
    let d = new Date(year, mon, 1);

    // 연도와 월 표시
    let header = `<h4>${year} / ${month}</h4>`;

    let table = '<table><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr><tr>';

    // 공백 채우기
    for (let i = 0; i < d.getDay(); i++) {
        table += '<td></td>';
    }

    // 오늘 날짜 표시
    let today = new Date();

    // 날짜 채우기
    while (d.getMonth() == mon) {
        let cls = '';
        if (d.getDay() == 0) cls = 'sunday'; // 일요일
        if (d.getDate() == today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()) {
            cls += ' today'; // 오늘 날짜
        }
        table += `<td class="${cls}">` + d.getDate() + '</td>';

        if (d.getDay() == 6) { // 토요일
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // 나머지 공백 채우기
    if (d.getDay() != 0) {
        for (let i = d.getDay(); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';

    elem.innerHTML = header + table;
}

// 현재 날짜를 기반으로 달력을 생성합니다.
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다

createCalendar("calendar", currentYear, currentMonth);
