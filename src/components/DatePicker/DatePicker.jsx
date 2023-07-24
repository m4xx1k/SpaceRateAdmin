import React, {useCallback, useState} from "react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import s from './DatePicker.module.css';
import {formatDates} from "../../utils.js";



function SelectCalendar({selectedDates, setSelectedDates,error}) {

  const handleDateChange = useCallback((newDateTime, dateIndex, timeIndex) => {
    setSelectedDates((prevDates) => {
      const newDates = [...prevDates];
      if (timeIndex !== undefined) {
        newDates[dateIndex].times[timeIndex] = newDateTime;
      } else {
        newDates[dateIndex].date = newDateTime;
      }
      return newDates;
    });
  }, []);

  const handleAddTime = useCallback((dateIndex) => {
    setSelectedDates((prevDates) => {
      const newDates = [...prevDates];
      newDates[dateIndex] = {
        ...newDates[dateIndex],
        times: [...newDates[dateIndex].times, new Date()],
      };
      return newDates;
    });
  }, []);

  const handleDeleteTime = useCallback((dateIndex, timeIndex) => {
    setSelectedDates((prevDates) => {
      const newDates = [...prevDates];
      newDates[dateIndex] = {
        ...newDates[dateIndex],
        times: newDates[dateIndex].times.filter((_, index) => index !== timeIndex),
      };
      return newDates;
    });
  }, []);

  const handleAddDate = useCallback(() => {
    setSelectedDates((prevDates) => {
      const newDates = [...prevDates, { date: new Date(), times: [] }];
      return newDates;
    });
  }, []);

  const handleDeleteDate = useCallback((dateIndex) => {
    setSelectedDates(prevDates => prevDates.filter((_, index) => index !== dateIndex));
  }, []);



  return (
      <>
        <div className="row">
          <h4 className={s.subtitle}>Даты</h4>
          <button className={'btn-blue'} onClick={handleAddDate}>Добавить</button>
        </div>


        <div className={s.dates}>
          {selectedDates.map((d, dateIndex) => (
              <div className={s.date} key={dateIndex}>
                <DateTimePicker className={s.date_str}
                                onChange={(newDateTime) => handleDateChange(newDateTime, dateIndex)}
                                value={d.date}
                                format="y-MM-dd"
                                dateFormat="yyyy-MM-dd"
                                timeFormat=""
                />
                {d.times.map((t, timeIndex) => (
                    <div key={timeIndex}>
                      <DateTimePicker className={s.time_str}
                                      onChange={(newDateTime) => handleDateChange(newDateTime, dateIndex, timeIndex)}
                                      value={t}
                                      format="HH:mm"
                                      dateFormat=""
                                      timeFormat="HH:mm"
                      />
                      <button className={s.time_delete} onClick={() => handleDeleteTime(dateIndex, timeIndex)}>удалить время</button>
                    </div>
                ))}
                <div className="row">
                  <button className={'btn-blue'} onClick={() => handleAddTime(dateIndex)}>+ время</button>
                  <button className={'btn-red'} onClick={() => handleDeleteDate(dateIndex)}>удалить</button>
                </div>

              </div>
          ))}
        </div>
        <span className={'error'}>{error}</span>
      </>
  );
}

export default SelectCalendar;
