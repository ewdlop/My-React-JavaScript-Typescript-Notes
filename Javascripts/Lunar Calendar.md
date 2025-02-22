I'd be happy to create a lunar calendar visualization for you. Let me implement this using HTML and JavaScript to show the lunar phases throughout the year.

I've created an interactive lunar calendar that shows the moon phases throughout the year. This visualization includes:

### Features

- **Full Year View**: Shows all 12 months with the moon phase for each day
- **Moon Phase Visualization**: Visual representation of the moon's phase (new moon, waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, last quarter, waning crescent)
- **Interactive Controls**: 
  - Year selection dropdown (±10 years from current year)
  - "Today" button to quickly jump to the current date
- **Detailed Information**: Hover over any date to see the exact moon phase
- **Legend**: Clear explanation of all the moon phase icons
- **Responsive Design**: Works on both desktop and mobile devices

### How It Works

The calendar calculates moon phases using a variation of Conway's algorithm, which provides a good approximation of lunar phases. While not astronomically perfect, it offers a reasonable visualization of the lunar cycle throughout the year.

The visual representation shows:
- New moon: completely dark circle
- Waxing phases: light gradually appearing from the right
- Full moon: completely light circle
- Waning phases: darkness gradually appearing from the right

Each date displays both the day number and a small visualization of the moon's appearance on that date. Current day is highlighted with a blue border when viewing the current year.

You can interact with the calendar by:
1. Selecting different years from the dropdown
2. Clicking "Today" to jump to the current date
3. Hovering over any date to see detailed moon phase information

This implementation uses pure HTML, CSS, and JavaScript without any external dependencies, making it easy to use and integrate into any website.

### Doc

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lunar Calendar</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #121620;
            color: #e0e0e0;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        h1 {
            margin-bottom: 10px;
            color: #f0f0f0;
            text-align: center;
        }
        
        .controls {
            display: flex;
            margin-bottom: 20px;
            gap: 10px;
            justify-content: center;
            align-items: center;
        }
        
        select, button {
            padding: 8px 12px;
            background-color: #2c3347;
            color: #e0e0e0;
            border: 1px solid #3a4156;
            border-radius: 4px;
            font-size: 16px;
        }
        
        select:focus, button:focus {
            outline: none;
            border-color: #6a7bac;
        }
        
        button:hover {
            background-color: #3a4156;
            cursor: pointer;
        }
        
        .calendar-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 1200px;
        }
        
        .month {
            background-color: #1a202e;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .month-header {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
            color: #d0d0d0;
            font-weight: bold;
        }
        
        .days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
        }
        
        .day-names {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            margin-bottom: 8px;
        }
        
        .day-name {
            text-align: center;
            font-size: 12px;
            color: #8a9ab8;
        }
        
        .day {
            aspect-ratio: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            border-radius: 4px;
        }
        
        .day.has-date {
            background-color: #232a3a;
        }
        
        .day.has-date:hover {
            background-color: #2d364a;
        }
        
        .day-number {
            margin-bottom: 3px;
        }
        
        .moon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }
        
        .phase {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #121620;
            left: 0;
            top: 0;
        }
        
        .new-moon .phase {
            transform: scale(0.95);
            background-color: #121620;
        }
        
        .waxing-crescent .phase,
        .waning-crescent .phase {
            border-radius: 0;
            width: 50%;
        }
        
        .waxing-crescent .phase {
            left: -50%;
            background-color: #e0e0e0;
            box-shadow: 10px 0 0 0 #121620;
        }
        
        .waning-crescent .phase {
            left: 50%;
            background-color: #e0e0e0;
            box-shadow: -10px 0 0 0 #121620;
        }
        
        .first-quarter .phase {
            left: 50%;
            background-color: transparent;
        }
        
        .last-quarter .phase {
            left: 0;
            width: 50%;
            background-color: #121620;
        }
        
        .waxing-gibbous .phase,
        .waning-gibbous .phase {
            border-radius: 0;
            width: 50%;
        }
        
        .waxing-gibbous .phase {
            left: 50%;
            background-color: #121620;
            border-radius: 0 100% 100% 0;
        }
        
        .waning-gibbous .phase {
            left: 0;
            background-color: #121620;
            border-radius: 100% 0 0 100%;
        }
        
        .full-moon .phase {
            background-color: transparent;
        }
        
        .moon-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 12px;
            padding: 8px;
            transform: translateY(100%);
            transition: transform 0.3s;
        }
        
        .day:hover .moon-info {
            transform: translateY(0);
        }
        
        .legend {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
            padding: 15px;
            background-color: #1a202e;
            border-radius: 8px;
            max-width: 800px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            font-size: 14px;
        }
        
        .legend-moon {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 5px;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }
        
        .current-day {
            border: 2px solid #6a8cff;
        }
        
        @media (max-width: 800px) {
            .calendar-container {
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 10px;
            }
            
            .day {
                font-size: 10px;
            }
            
            .moon {
                width: 14px;
                height: 14px;
            }
        }
    </style>
</head>
<body>
    <h1>Lunar Calendar</h1>
    
    <div class="controls">
        <select id="year-select">
            <!-- Years will be populated via JavaScript -->
        </select>
        <button id="today-btn">Today</button>
    </div>
    
    <div id="calendar-container" class="calendar-container">
        <!-- Calendar will be populated via JavaScript -->
    </div>
    
    <div class="legend">
        <div class="legend-item">
            <div class="legend-moon new-moon">
                <div class="phase"></div>
            </div>
            <span>New Moon</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon waxing-crescent">
                <div class="phase"></div>
            </div>
            <span>Waxing Crescent</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon first-quarter">
                <div class="phase"></div>
            </div>
            <span>First Quarter</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon waxing-gibbous">
                <div class="phase"></div>
            </div>
            <span>Waxing Gibbous</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon full-moon">
                <div class="phase"></div>
            </div>
            <span>Full Moon</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon waning-gibbous">
                <div class="phase"></div>
            </div>
            <span>Waning Gibbous</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon last-quarter">
                <div class="phase"></div>
            </div>
            <span>Last Quarter</span>
        </div>
        <div class="legend-item">
            <div class="legend-moon waning-crescent">
                <div class="phase"></div>
            </div>
            <span>Waning Crescent</span>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Populate year dropdown (current year +/- 10 years)
            const yearSelect = document.getElementById('year-select');
            const currentYear = new Date().getFullYear();
            const startYear = currentYear - 10;
            const endYear = currentYear + 10;
            
            for (let year = startYear; year <= endYear; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                if (year === currentYear) {
                    option.selected = true;
                }
                yearSelect.appendChild(option);
            }
            
            // Initialize calendar with current year
            generateCalendar(currentYear);
            
            // Event listeners
            yearSelect.addEventListener('change', function() {
                generateCalendar(parseInt(this.value));
            });
            
            document.getElementById('today-btn').addEventListener('click', function() {
                const today = new Date();
                yearSelect.value = today.getFullYear();
                generateCalendar(today.getFullYear());
                
                // Scroll to current month
                setTimeout(() => {
                    const currentMonthElement = document.getElementById(`month-${today.getMonth()}`);
                    if (currentMonthElement) {
                        currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        });
        
        function generateCalendar(year) {
            const calendarContainer = document.getElementById('calendar-container');
            calendarContainer.innerHTML = '';
            
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
            const today = new Date();
            const isCurrentYear = today.getFullYear() === year;
            
            for (let month = 0; month < 12; month++) {
                const monthDiv = document.createElement('div');
                monthDiv.className = 'month';
                monthDiv.id = `month-${month}`;
                
                const monthHeader = document.createElement('div');
                monthHeader.className = 'month-header';
                monthHeader.textContent = months[month];
                monthDiv.appendChild(monthHeader);
                
                const dayNamesDiv = document.createElement('div');
                dayNamesDiv.className = 'day-names';
                
                for (let i = 0; i < 7; i++) {
                    const dayNameDiv = document.createElement('div');
                    dayNameDiv.className = 'day-name';
                    dayNameDiv.textContent = dayNames[i];
                    dayNamesDiv.appendChild(dayNameDiv);
                }
                
                monthDiv.appendChild(dayNamesDiv);
                
                const daysDiv = document.createElement('div');
                daysDiv.className = 'days';
                
                // Calculate first day of month and number of days
                const firstDayOfMonth = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                // Add empty days for the start of the month
                for (let i = 0; i < firstDayOfMonth; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'day';
                    daysDiv.appendChild(emptyDay);
                }
                
                // Add days of the month
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'day has-date';
                    
                    // Check if this is today
                    if (isCurrentYear && today.getMonth() === month && today.getDate() === day) {
                        dayDiv.classList.add('current-day');
                    }
                    
                    const dayNumber = document.createElement('div');
                    dayNumber.className = 'day-number';
                    dayNumber.textContent = day;
                    dayDiv.appendChild(dayNumber);
                    
                    // Calculate moon phase for this day
                    const date = new Date(year, month, day);
                    const moonPhase = getMoonPhase(date);
                    const moonInfo = getMoonPhaseInfo(moonPhase);
                    
                    const moonDiv = document.createElement('div');
                    moonDiv.className = `moon ${moonInfo.cssClass}`;
                    
                    const phaseDiv = document.createElement('div');
                    phaseDiv.className = 'phase';
                    moonDiv.appendChild(phaseDiv);
                    
                    dayDiv.appendChild(moonDiv);
                    
                    // Add tooltip with moon phase info
                    const moonInfoDiv = document.createElement('div');
                    moonInfoDiv.className = 'moon-info';
                    moonInfoDiv.textContent = `${moonInfo.name} (${Math.round(moonPhase * 100) / 100})`;
                    dayDiv.appendChild(moonInfoDiv);
                    
                    daysDiv.appendChild(dayDiv);
                }
                
                monthDiv.appendChild(daysDiv);
                calendarContainer.appendChild(monthDiv);
            }
        }
        
        // Calculate moon phase (0-1)
        function getMoonPhase(date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            
            // Calculate approximate moon phase using Conway's algorithm
            // 0 = New Moon, 0.25 = First Quarter, 0.5 = Full Moon, 0.75 = Last Quarter
            
            let r = year % 100;
            r %= 19;
            if (r > 9) r -= 19;
            r = ((r * 11) % 30) + month + day;
            if (month < 3) r += 2;
            r -= ((year < 2000) ? 4 : 8.3);
            r = Math.floor(r + 0.5) % 30;
            return (r < 0) ? r + 30 : r;
        }
        
        // Convert numeric moon phase to descriptive information
        function getMoonPhaseInfo(phase) {
            const normalizedPhase = phase / 30; // Convert to 0-1 range
            
            if (normalizedPhase < 0.03 || normalizedPhase >= 0.97) {
                return { name: 'New Moon', cssClass: 'new-moon' };
            } else if (normalizedPhase < 0.22) {
                return { name: 'Waxing Crescent', cssClass: 'waxing-crescent' };
            } else if (normalizedPhase < 0.28) {
                return { name: 'First Quarter', cssClass: 'first-quarter' };
            } else if (normalizedPhase < 0.47) {
                return { name: 'Waxing Gibbous', cssClass: 'waxing-gibbous' };
            } else if (normalizedPhase < 0.53) {
                return { name: 'Full Moon', cssClass: 'full-moon' };
            } else if (normalizedPhase < 0.72) {
                return { name: 'Waning Gibbous', cssClass: 'waning-gibbous' };
            } else if (normalizedPhase < 0.78) {
                return { name: 'Last Quarter', cssClass: 'last-quarter' };
            } else {
                return { name: 'Waning Crescent', cssClass: 'waning-crescent' };
            }
        }
    </script>
</body>
</html>
```
