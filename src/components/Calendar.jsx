import React from "react";

import PropTypes from "prop-types";

export default function Calendar({ date }) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const currentDay = date.getDay();

  const daysName = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const monthName = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // колличество дней в этом месяце

  const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // последняя дата предыдущего месяца

  const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay(); // получение первого дня месяца

  function renderTableBody() {
    const tdElements = [];
    const trElements = [];

    let temporaryСontainer = [];

    // создание последних дней предыдущего месяца
    for (let i = firstDayOfMonth; i > 0; i--) {
      tdElements.push(
        <td className="ui-datepicker-other-month">
          {lastDateOfLastMonth - i + 1}
        </td>
      );
    }

    // Создание дней этого месяца
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const configClass =
        i === date.getDate() &&
        currentMonth === date.getMonth() &&
        currentYear === date.getFullYear()
          ? "ui-datepicker-today"
          : "";
      tdElements.push(<td className={configClass}>{i}</td>);
    }

    for (let i = 0; i < tdElements.length; i++) {
      temporaryСontainer.push(tdElements[i]);

      if (temporaryСontainer.length === 7) {
        trElements.push(<tr>{temporaryСontainer}</tr>);
        temporaryСontainer = [];
      }

      // создание первых дней следующего месяца
      if (i === tdElements.length - 1) {
        if (temporaryСontainer.length < 7) {
          let num = 1;
          for (let i = temporaryСontainer.length; i < 7; i++) {
            temporaryСontainer.push(
              <td className="ui-datepicker-other-month">{num}</td>
            );
            num += 1;
          }
        }
        trElements.push(<tr>{temporaryСontainer}</tr>);
        temporaryСontainer = [];
      }
    }

    return trElements;
  }

  return (
    <>
      <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
          <div className="ui-datepicker-material-day">
            {daysName[currentDay]}
          </div>
          <div className="ui-datepicker-material-date">
            <div className="ui-datepicker-material-day-num">{currentDate}</div>
            <div className="ui-datepicker-material-month">
              {monthName[currentMonth]}
            </div>
            <div className="ui-datepicker-material-year">{currentYear}</div>
          </div>
        </div>
        <div className="ui-datepicker-header">
          <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">
              {monthName[currentMonth]}
            </span>
            &nbsp;
            <span className="ui-datepicker-year">{currentYear}</span>
          </div>
        </div>
        <table className="ui-datepicker-calendar">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="ui-datepicker-week-end" />
            <col className="ui-datepicker-week-end" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" title="Понедельник">
                Пн
              </th>
              <th scope="col" title="Вторник">
                Вт
              </th>
              <th scope="col" title="Среда">
                Ср
              </th>
              <th scope="col" title="Четверг">
                Чт
              </th>
              <th scope="col" title="Пятница">
                Пт
              </th>
              <th scope="col" title="Суббота">
                Сб
              </th>
              <th scope="col" title="Воскресенье">
                Вс
              </th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>
    </>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
};
