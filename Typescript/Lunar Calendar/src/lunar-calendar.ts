// lunar-calendar.ts

// Define types
interface MoonPhaseInfo {
  name: string;
  cssClass: string;
}

class LunarCalendar {
  private calendarElement: HTMLElement;
  private yearSelect: HTMLSelectElement;
  private todayButton: HTMLButtonElement;
  private calendarGrid: HTMLElement;
  
  private readonly months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  private readonly dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  private readonly moonPhases: MoonPhaseInfo[] = [
    { name: 'New Moon', cssClass: 'new-moon' },
    { name: 'Waxing Crescent', cssClass: 'waxing-crescent' },
    { name: 'First Quarter', cssClass: 'first-quarter' },
    { name: 'Waxing Gibbous', cssClass: 'waxing-gibbous' },
    { name: 'Full Moon', cssClass: 'full-moon' },
    { name: 'Waning Gibbous', cssClass: 'waning-gibbous' },
    { name: 'Last Quarter', cssClass: 'last-quarter' },
    { name: 'Waning Crescent', cssClass: 'waning-crescent' }
  ];
  
  constructor(elementId: string) {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
    
    this.calendarElement = element;
    this.initialize();
  }
  
  private initialize(): void {
    this.createLayout();
    this.setupEventListeners();
    
    // Generate calendar with current year
    const currentYear = new Date().getFullYear();
    this.generateCalendar(currentYear);
  }
  
  private createLayout(): void {
    // Clear any existing content
    this.calendarElement.innerHTML = '';
    
    // Create header
    const header = document.createElement('h1');
    header.textContent = 'Lunar Calendar';
    this.calendarElement.appendChild(header);
    
    // Create controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';
    
    // Year select
    this.yearSelect = document.createElement('select');
    this.yearSelect.id = 'year-select';
    this.populateYearOptions();
    controlsDiv.appendChild(this.yearSelect);
    
    // Today button
    this.todayButton = document.createElement('button');
    this.todayButton.textContent = 'Today';
    controlsDiv.appendChild(this.todayButton);
    
    this.calendarElement.appendChild(controlsDiv);
    
    // Create calendar grid
    this.calendarGrid = document.createElement('div');
    this.calendarGrid.className = 'calendar-container';
    this.calendarElement.appendChild(this.calendarGrid);
    
    // Create legend
    const legendDiv = this.createLegend();
    this.calendarElement.appendChild(legendDiv);
  }
  
  private populateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    
    for (let year = startYear; year <= endYear; year++) {
      const option = document.createElement('option');
      option.value = year.toString();
      option.textContent = year.toString();
      
      if (year === currentYear) {
        option.selected = true;
      }
      
      this.yearSelect.appendChild(option);
    }
  }
  
  private setupEventListeners(): void {
    // Year selection change
    this.yearSelect.addEventListener('change', () => {
      const selectedYear = parseInt(this.yearSelect.value, 10);
      this.generateCalendar(selectedYear);
    });
    
    // Today button click
    this.todayButton.addEventListener('click', () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      
      // Update year select
      this.yearSelect.value = currentYear.toString();
      
      // Regenerate calendar
      this.generateCalendar(currentYear);
      
      // Scroll to current month
      setTimeout(() => {
        const currentMonthElement = document.getElementById(`month-${today.getMonth()}`);
        if (currentMonthElement) {
          currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    });
  }
  
  private createLegend(): HTMLElement {
    const legendDiv = document.createElement('div');
    legendDiv.className = 'legend';
    
    this.moonPhases.forEach(phase => {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      
      // Create moon visualization
      const moonElement = document.createElement('div');
      moonElement.className = `legend-moon ${phase.cssClass}`;
      
      const phaseElement = document.createElement('div');
      phaseElement.className = 'phase';
      moonElement.appendChild(phaseElement);
      
      // Create label
      const labelElement = document.createElement('span');
      labelElement.textContent = phase.name;
      
      // Add to legend item
      legendItem.appendChild(moonElement);
      legendItem.appendChild(labelElement);
      
      // Add to legend
      legendDiv.appendChild(legendItem);
    });
    
    return legendDiv;
  }
  
  public generateCalendar(year: number): void {
    // Clear existing calendar
    this.calendarGrid.innerHTML = '';
    
    const today = new Date();
    const isCurrentYear = today.getFullYear() === year;
    
    // Create each month
    for (let month = 0; month < 12; month++) {
      const monthElement = this.createMonthElement(year, month, isCurrentYear, today);
      this.calendarGrid.appendChild(monthElement);
    }
  }
  
  private createMonthElement(
    year: number, 
    month: number, 
    isCurrentYear: boolean, 
    today: Date
  ): HTMLElement {
    const monthElement = document.createElement('div');
    monthElement.className = 'month';
    monthElement.id = `month-${month}`;
    
    // Month header
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.textContent = this.months[month];
    monthElement.appendChild(monthHeader);
    
    // Day names (Sun, Mon, etc.)
    const dayNamesElement = document.createElement('div');
    dayNamesElement.className = 'day-names';
    
    for (const dayName of this.dayNames) {
      const dayNameElement = document.createElement('div');
      dayNameElement.className = 'day-name';
      dayNameElement.textContent = dayName;
      dayNamesElement.appendChild(dayNameElement);
    }
    
    monthElement.appendChild(dayNamesElement);
    
    // Calendar days grid
    const daysElement = document.createElement('div');
    daysElement.className = 'days';
    
    // Calculate first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for beginning of month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day';
      daysElement.appendChild(emptyDay);
    }
    
    // Add day cells with moon phases
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = this.createDayElement(
        year, 
        month, 
        day, 
        isCurrentYear && today.getMonth() === month && today.getDate() === day
      );
      daysElement.appendChild(dayElement);
    }
    
    monthElement.appendChild(daysElement);
    return monthElement;
  }
  
  private createDayElement(
    year: number, 
    month: number, 
    day: number, 
    isToday: boolean
  ): HTMLElement {
    const dayElement = document.createElement('div');
    dayElement.className = 'day has-date';
    
    if (isToday) {
      dayElement.classList.add('current-day');
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day.toString();
    dayElement.appendChild(dayNumber);
    
    // Calculate moon phase for this day
    const date = new Date(year, month, day);
    const moonPhase = this.calculateMoonPhase(date);
    const phaseInfo = this.getMoonPhaseInfo(moonPhase);
    
    // Create moon visualization
    const moonElement = document.createElement('div');
    moonElement.className = `moon ${phaseInfo.cssClass}`;
    
    const phaseElement = document.createElement('div');
    phaseElement.className = 'phase';
    moonElement.appendChild(phaseElement);
    
    dayElement.appendChild(moonElement);
    
    // Moon phase info tooltip
    const infoElement = document.createElement('div');
    infoElement.className = 'moon-info';
    infoElement.textContent = `${phaseInfo.name} (${Math.round(moonPhase * 100) / 100})`;
    dayElement.appendChild(infoElement);
    
    return dayElement;
  }
  
  private calculateMoonPhase(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const day = date.getDate();
    
    // Calculate approximate moon phase using Conway's algorithm
    // 0 = New Moon, 7.4 = First Quarter, 14.8 = Full Moon, 22.1 = Last Quarter
    let r = year % 100;
    r %= 19;
    if (r > 9) r -= 19;
    r = ((r * 11) % 30) + month + day;
    if (month < 3) r += 2;
    r -= ((year < 2000) ? 4 : 8.3);
    r = Math.floor(r + 0.5) % 30;
    return (r < 0) ? r + 30 : r;
  }
  
  private getMoonPhaseInfo(phase: number): MoonPhaseInfo {
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
  
  // Public API to manually refresh the calendar
  public refresh(): void {
    const year = parseInt(this.yearSelect.value, 10);
    this.generateCalendar(year);
  }
}

// Export the class for use in other modules
export default LunarCalendar;
