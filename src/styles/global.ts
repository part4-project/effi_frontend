import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import myReset from './myReset';

const GlobalStyle = createGlobalStyle`
    ${myReset}
    ${colors}
    @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
    font-weight: 300;
    }
    @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    }
    @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    }
    @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraBold.woff') format('woff');
    font-weight: 900;
    }

    
    #root-portal .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
#root-portal .react-datepicker__month-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
#root-portal .react-datepicker__quarter-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
#root-portal .react-datepicker__year-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range) {
  background-color: ${(props) => props.theme.text02};
  color: ${(props) => props.theme.schedule};
}
#root-portal .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
  fill: ${(props) => props.theme.schedule};
  color: ${(props) => props.theme.schedule};
}

#root-portal .react-datepicker-popper .react-datepicker__triangle {
  stroke: var(--white);
}
#root-portal .react-datepicker {
  width: 300px;
  padding: 10% 8%;
  font-family: 'Pretendard';
  font-size: 16px;
  background-color: ${(props) => props.theme.schedule};
  border: none;
  border-radius: 10px;
}

#root-portal .react-datepicker__navigation {
  top: auto;
  padding: 0;
}

#root-portal .react-datepicker__navigation-icon {
  width: auto;
  &::before {
    position: static;
  }
}

#root-portal .react-datepicker__navigation--previous {
  position: static;
}

#root-portal .react-datepicker__navigation--next {
  position: static;
}

#root-portal .react-datepicker__month-container {
  width: 100%;
  height: 100%;
}

#root-portal .react-datepicker__current-month,
#root-portal .react-datepicker-time__header,
#root-portal .react-datepicker-year-header {
  margin-top: 0;
  color: ${(props) => props.theme.scheduleText};
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 0;
}

#root-portal .react-datepicker__header {
  text-align: start;
  background-color: ${(props) => props.theme.schedule};
  border-bottom: none;
  border-top-left-radius: 0.3rem;
  padding: 0;
  position: relative;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  height: 25%;
}

#root-portal .react-datepicker__header__dropdown,
#root-portal .react-datepicker__header__dropdown--scroll {
  display: none;
}

#root-portal .react-datepicker__day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  white-space: nowrap;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 700;
}

#root-portal .react-datepicker__day-names :first-child {
  color: var(--red01);
}

#root-portal .react-datepicker__month {
  margin: 0;
  text-align: center;
  width: 100%;
  height: 75%;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  flex-grow: 1;
}

#root-portal .react-datepicker__week {
  white-space: nowrap;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
}

#root-portal .react-datepicker__day--outside-month {
  opacity: 0.4;
}

#root-portal .react-datepicker__week :first-child {
  color: var(--red01);
}

#root-portal .react-datepicker__day-name,
#root-portal .react-datepicker__day,
#root-portal .react-datepicker__time-name {
  color: ${(props) => props.theme.scheduleText};
  display: inline-block;
  line-height: center;
  text-align: center;
  margin: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: relative;
}

#root-portal .react-datepicker__day:hover,
#root-portal .react-datepicker__month-text:hover,
#root-portal .react-datepicker__quarter-text:hover,
#root-portal .react-datepicker__year-text:hover {
  border-radius: 100%;
  background-color: ${(props) => props.theme.theme02};
}

#root-portal .react-datepicker__day--selected:hover,
#root-portal .react-datepicker__day--in-selecting-range:hover,
#root-portal .react-datepicker__day--in-range:hover,
#root-portal .react-datepicker__month-text--selected:hover,
#root-portal .react-datepicker__month-text--in-selecting-range:hover,
#root-portal .react-datepicker__month-text--in-range:hover,
#root-portal .react-datepicker__quarter-text--selected:hover,
#root-portal .react-datepicker__quarter-text--in-selecting-range:hover,
#root-portal .react-datepicker__quarter-text--in-range:hover,
#root-portal .react-datepicker__year-text--selected:hover,
#root-portal .react-datepicker__year-text--in-selecting-range:hover,
#root-portal .react-datepicker__year-text--in-range:hover {
  background-color: ${(props) => props.theme.theme01};
}

#root-portal .react-datepicker__day--selected,
#root-portal .react-datepicker__day--in-selecting-range,
#root-portal .react-datepicker__day--in-range,
#root-portal .react-datepicker__month-text--selected,
#root-portal .react-datepicker__month-text--in-selecting-range,
#root-portal .react-datepicker__month-text--in-range,
#root-portal .react-datepicker__quarter-text--selected,
#root-portal .react-datepicker__quarter-text--in-selecting-range,
#root-portal .react-datepicker__quarter-text--in-range,
#root-portal .react-datepicker__year-text--selected,
#root-portal .react-datepicker__year-text--in-selecting-range,
#root-portal .react-datepicker__year-text--in-range {
  border-radius: 100%;
  background-color: ${(props) => props.theme.text02};
  color: ${(props) => props.theme.schedule};
}

#root-portal .react-datepicker__day--keyboard-selected,
#root-portal .react-datepicker__month-text--keyboard-selected,
#root-portal .react-datepicker__quarter-text--keyboard-selected,
#root-portal .react-datepicker__year-text--keyboard-selected {
  border-radius: 100%;
  background-color: ${(props) => props.theme.text02};
  color: ${(props) => props.theme.schedule};
}


  
`;

export default GlobalStyle;
