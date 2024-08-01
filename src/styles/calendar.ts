import { css } from 'styled-components';

export const commonCalendarStyle = css`
  .react-datepicker {
    background-color: ${(props) => props.theme.schedule};
    border: none;
    border-radius: 10px;
  }

  .react-datepicker__navigation {
    top: auto;
    padding: 0;
  }

  .react-datepicker__navigation-icon {
    width: auto;
    &::before {
      position: static;
    }
  }

  .react-datepicker__navigation--previous {
    position: static;
  }

  .react-datepicker__navigation--next {
    position: static;
  }

  .react-datepicker__month-container {
    width: 100%;
    height: 100%;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-top: 0;
    color: ${(props) => props.theme.scheduleText};
    font-weight: 700;
    margin-bottom: 0;
  }

  .react-datepicker__header {
    text-align: start;
    background-color: ${(props) => props.theme.schedule};
    border-bottom: none;
    border-top-left-radius: 0.3rem;
    padding: 0;
    position: relative;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  }

  .react-datepicker__header__dropdown,
  .react-datepicker__header__dropdown--scroll {
    display: none;
  }

  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    white-space: nowrap;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
  }

  .react-datepicker__day-names :first-child {
    color: var(--red01);
  }

  .react-datepicker__month {
    margin: 0;
    text-align: center;
    width: 100%;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
    flex-grow: 1;
  }

  .react-datepicker__week {
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
  }

  .react-datepicker__day--outside-month {
    opacity: 0.4;
  }

  .react-datepicker__week :first-child {
    color: var(--red01);
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
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

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 100%;
    background-color: ${(props) => props.theme.theme02};
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover,
  .react-datepicker__month-text--selected:hover,
  .react-datepicker__month-text--in-selecting-range:hover,
  .react-datepicker__month-text--in-range:hover,
  .react-datepicker__quarter-text--selected:hover,
  .react-datepicker__quarter-text--in-selecting-range:hover,
  .react-datepicker__quarter-text--in-range:hover,
  .react-datepicker__year-text--selected:hover,
  .react-datepicker__year-text--in-selecting-range:hover,
  .react-datepicker__year-text--in-range:hover {
    background-color: ${(props) => props.theme.theme01};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 100%;
    background-color: ${(props) => props.theme.text02};
    color: ${(props) => props.theme.schedule};
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 100%;
    background-color: ${(props) => props.theme.schedule};
  }
`;

export const meetingDateStyle = css`
  .react-datepicker {
    width: 450px;
    height: 100%;
    padding: 8% 5%;
    display: flex;
    text-align: center;
    border: 1px solid var(--gray01);
  }

  .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
    fill: ${(props) => props.theme.schedule};
    color: ${(props) => props.theme.schedule};
  }

  .react-datepicker-popper .react-datepicker__triangle {
    stroke: var(--gray01);
  }

  .react-datepicker__current-month,
  .react-datepicker-year-header {
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .react-datepicker__time-container {
    float: right;
    border-left: 1px solid var(--gray01);
    width: 100px;
    background-color: ${(props) => props.theme.schedule};
  }

  .react-datepicker-time__header {
    font-size: 15px;
    text-align: center;
  }

  .react-datepicker__day--disabled,
  .react-datepicker__month-text--disabled,
  .react-datepicker__quarter-text--disabled,
  .react-datepicker__year-text--disabled {
    opacity: 0.4;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    height: 30px;
    font-size: 12px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.schedule};
    color: ${(props) => props.theme.scheduleText};
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover {
    background-color: ${(props) => props.theme.theme02};
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--disabled {
    color: var(--gray05);
  }
`;

export const scheduleCalendarStyle = css`
  .react-datepicker {
    width: 100%;
    height: 100%;
    padding: 10% 8%;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    font-size: 24px;
  }

  .react-datepicker__header {
    height: 25%;
  }

  .react-datepicker__month {
    height: 75%;
  }

  .dot-container {
    position: absolute;
    top: calc(50% + 20px);
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 4px;
  }

  .dot {
    width: 4px;
    height: 4px;
    background-color: ${(props) => props.theme.dot};
    border-radius: 100%;
  }
`;

export const rootPortalCalendarStyle = css`
  #root-portal
    .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  #root-portal
    .react-datepicker__month-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  #root-portal
    .react-datepicker__quarter-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  #root-portal
    .react-datepicker__year-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ) {
    background-color: ${(props) => props.theme.text02};
    color: ${(props) => props.theme.schedule};
  }
  #root-portal .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
    fill: ${(props) => props.theme.schedule};
    color: ${(props) => props.theme.schedule};
  }

  #root-portal .react-datepicker-popper .react-datepicker__triangle {
    stroke: ${(props) => props.theme.schedule};
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
    gap: 2px;
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
    border-radius: 30%;
    background-color: ${(props) => props.theme.theme02};
    color: var(--white);
  }

  #root-portal .react-datepicker__day--selected,
  #root-portal .react-datepicker__month-text--selected,
  #root-portal .react-datepicker__quarter-text--selected,
  #root-portal .react-datepicker__year-text--selected {
    border-radius: 30%;
    background-color: ${(props) => props.theme.text02};
    color: ${(props) => props.theme.schedule};
  }

  #root-portal .react-datepicker__day--in-selecting-range,
  #root-portal .react-datepicker__day--in-range,
  #root-portal .react-datepicker__month-text--in-selecting-range,
  #root-portal .react-datepicker__month-text--in-range,
  #root-portal .react-datepicker__quarter-text--in-selecting-range,
  #root-portal .react-datepicker__quarter-text--in-range,
  #root-portal .react-datepicker__year-text--in-selecting-range,
  #root-portal .react-datepicker__year-text--in-range {
    border-radius: 30%;
    background-color: ${(props) => props.theme.text02};
    color: ${(props) => props.theme.schedule};
  }

  #root-portal .react-datepicker__day--keyboard-selected,
  #root-portal .react-datepicker__month-text--keyboard-selected,
  #root-portal .react-datepicker__quarter-text--keyboard-selected,
  #root-portal .react-datepicker__year-text--keyboard-selected {
    border-radius: 30%;
    background-color: ${(props) => props.theme.text02};
    color: ${(props) => props.theme.schedule};
  }
`;
