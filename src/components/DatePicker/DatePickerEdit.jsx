import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import {format, utcToZonedTime, zonedTimeToUtc} from "date-fns-tz";
import { startOfDay, getHours, getMinutes } from "date-fns";
import s from './DatePicker.module.css'

const timeZone = "Asia/Tashkent";

function SelectCalendar({selectedDays, setSelectedDays}) {
    const handleDayClick = (day) => {
        // Consider the date as being in the Asia/Tashkent timezone
        const localDate = new Date(day.setHours(day.getHours() - new Date().getTimezoneOffset() / 60));
        const dateStr = format(localDate, 'yyyy-MM-dd', { timeZone });
        setSelectedDays([...selectedDays, {
            type: "",  // add type here
            date: `${dateStr}T21:00:00.000Z`, // combining date and time in ISO format
            event: "",  // add event here
            __v: 0
        }]);
    };

    const handleTimeChange = (time, item) => {
        const [hours, minutes] = time.split(':').map((value) => Math.max(0, Math.min(parseInt(value), value.includes('H') ? 23 : 59)));
        const validTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        // Parse the date and time in Asia/Tashkent time zone
        const dateStr = format(new Date(item.date), 'yyyy-MM-dd', { timeZone });
        const dateTimeStr = `${dateStr} ${validTime}`;
        const dateInTashkent = zonedTimeToUtc(dateTimeStr, timeZone);

        const newSelectedDays = selectedDays.map((day) =>
            day._id === item._id
                ? {...day, date: dateInTashkent.toISOString()}
                : day
        );
        setSelectedDays(newSelectedDays);
    };


    const handleDayRemove = (_id) => {
        const newSelectedDays = selectedDays.filter((day) => day._id !== _id);
        setSelectedDays(newSelectedDays);
    };

    const modifiers = {
        selected: selectedDays.map((day) => new Date(day.date)),
        disabled: { before: new Date() },
    };

    return (
        <div className={s.container}>
            <DayPicker selected={selectedDays.map((day) => new Date(day.date))} onDayClick={handleDayClick} modifiers={modifiers} />
            <ul className={s.dates}>
                {[...selectedDays].sort((a, b) => a.date.localeCompare(b.date)).map((day, index) => (
                    <li className={s.date} key={day._id}>
                        <p>
                            {format(utcToZonedTime(day.date, timeZone), 'dd.MM.yyyy', { timeZone })}
                        </p>
                        <input
                            className={s.time}
                            type="time"
                            step="60"
                            value={`${getHours(new Date(day.date)).toString().padStart(2, '0')}:${getMinutes(new Date(day.date)).toString().padStart(2, '0')}`}
                            onChange={(e) => handleTimeChange(e.target.value, day)}
                        />
                        <button className={s.delete} onClick={() => handleDayRemove(day._id)}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectCalendar;
