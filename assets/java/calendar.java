document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Month and Year
    const month = now.getMonth();
    const year = now.getFullYear();
    
    // Create calendar header
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `<strong>${monthNames[month]} ${year}</strong>`;
    calendar.appendChild(header);

    // Create day of week headers
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerText = day;
        calendar.appendChild(dayElement);
    });

    // Calculate first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill in the days
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.innerText = day;

        if (day === now.getDate()) {
            dateElement.classList.add('today');
        }

        calendar.appendChild(dateElement);
    }
});
