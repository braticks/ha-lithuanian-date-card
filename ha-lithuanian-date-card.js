class LithuanianDateCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&display=swap');
            
            ha-card {
              background-color: rgb(28, 28, 28);
              border-radius: 12px;
              padding: 12px 24px;
              color: white;
            }
            
            .date-time-card {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            
            .sun-moon-info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              color: rgba(255, 255, 255, 0.8);
              font-size: 14px;
            }
            
            .zodiac-info, .moon-info {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .header {
              text-align: center;
            }
            
            .month {
              font-family: "Crimson Pro", serif;
              font-weight: 700;
              font-size: 24px;
              margin: 0;
              color: rgb(221, 221, 221);
            }
            
            .year {
              font-family: "Crimson Pro", serif;
              font-size: 18px;
              color: rgba(255, 255, 255, 0.9);
              margin: 2px 0;
            }
            
            .time-info {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              gap: 8px;
              font-size: 13px;
              color: rgba(255, 255, 255, 0.8);
              text-align: center;
              margin: 4px 0;
            }
            
            .time-group {
              display: flex;
              flex-direction: column;
              align-items: center;
              flex: 1;
              gap: 2px;
            }
            
            .time-label {
              opacity: 0.8;
            }
            
            .time-value {
              font-weight: 600;
            }
            
            .day-number {
              font-family: "Crimson Pro", serif;
              font-weight: 700;
              font-size: 96px;
              line-height: 86px;
              text-align: center;
              margin: 8px 0;
              color: rgb(221, 221, 221);
            }
            
            .weekday {
              font-family: "Crimson Pro", serif;
              font-weight: 600;
              font-size: 24px;
              line-height: 24px;
              text-align: center;
              margin: 4px 0;
              color: rgb(255, 255, 255);
            }
            
            .names {
              text-align: center;
              margin: 4px 0;
              color: rgba(255, 255, 255, 0.8);
              font-size: 13px;
            }
            
            .holidays {
              text-align: center;
              margin: 4px 0;
              font-size: 16px;
              font-weight: 600;
              font-family: "Crimson Pro", serif;
              color: rgb(255, 255, 255);
            }
            
            .proverb {
              text-align: center;
              font-style: italic;
              margin: 4px 0;
              color: rgba(255, 255, 255, 0.8);
              font-size: 13px;
            }
            
            ha-icon {
              --mdc-icon-size: 20px;
              color: rgba(255, 255, 255, 0.8);
            }
          </style>
          <div class="date-time-card">
            <div class="sun-moon-info">
              <div class="zodiac-info">
                <ha-icon icon="mdi:zodiac-sagittarius"></ha-icon>
                <span class="zodiac-sign">Šaulys</span>
              </div>
              <div class="moon-info">
                <ha-icon icon="mdi:moon-full"></ha-icon>
                <span class="moon-phase"></span>
              </div>
            </div>

            <div class="header">
              <div class="month"></div>
              <div class="year">2024</div>
            </div>
            
            <div class="time-info">
              <div class="time-group">
                <span class="time-label">Saulė teka</span>
                <span class="time-value sunrise"></span>
              </div>
              <div class="time-group">
                <span class="time-label">Saulė leidžiasi</span>
                <span class="time-value sunset"></span>
              </div>
              <div class="time-group">
                <span class="time-label">Dienos ilgumas</span>
                <span class="time-value daylength"></span>
              </div>
            </div>
            
            <div class="day-number"></div>
            <div class="weekday"></div>
            
            <div class="names"></div>
            <div class="holidays"></div>
            <div class="proverb"></div>
          </div>
        </ha-card>
      `;
      this.content = true;
    }

    const entityId = this.config.entity || 'sensor.daylt_info';
    const state = hass.states[entityId];

    if (state) {
      const attributes = state.attributes;
      const isRedDay = attributes.is_red_day;
      
      // Get month from sensor.date
      const dateState = hass.states['sensor.date'];
      let monthName = 'Gruodis'; // default fallback
      if (dateState && dateState.state) {
        const date = new Date(dateState.state);
        const months = [
          'Sausis', 'Vasaris', 'Kovas', 'Balandis', 
          'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis',
          'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'
        ];
        monthName = months[date.getMonth()];
      }
      
      // Update zodiac sign
      const zodiacSign = this.querySelector('.zodiac-sign');
      zodiacSign.textContent = attributes.zodiac_sign || 'Šaulys';

      // Update day number with red day check
      const dayNumber = this.querySelector('.day-number');
      dayNumber.textContent = new Date().getDate();
      dayNumber.style.color = isRedDay ? 'rgb(255, 59, 59)' : 'rgb(221, 221, 221)';

      // Update weekday with red day check
      const weekday = this.querySelector('.weekday');
      weekday.textContent = attributes.savaites_diena;
      weekday.style.color = isRedDay ? 'rgb(255, 59, 59)' : 'rgb(255, 255, 255)';
      
      // Update holidays with red day check
      const holidays = this.querySelector('.holidays');
      holidays.textContent = attributes.sventes;
      holidays.style.color = isRedDay ? 'rgb(255, 59, 59)' : 'rgb(255, 255, 255)';
      
      // Update all other elements
      const monthElem = this.querySelector('.month');
      if (monthElem) {
        monthElem.textContent = monthName;
      }
      this.querySelector('.sunrise').textContent = attributes.saule_teka;
      this.querySelector('.sunset').textContent = attributes.saule_leidziasi;
      this.querySelector('.daylength').textContent = attributes.dienos_ilgumas;
      this.querySelector('.names').textContent = attributes.vardadieniai;
      this.querySelector('.proverb').textContent = attributes.patarle;
      this.querySelector('.moon-phase').textContent = `${attributes.menulio_faze}\n${attributes.menulio_diena}`;
    }
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this.config = config;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define('ha-lithuanian-date-card', LithuanianDateCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-lithuanian-date-card",
  name: "Lithuanian Date Card",
  description: "A card that displays Lithuanian calendar information"
});
