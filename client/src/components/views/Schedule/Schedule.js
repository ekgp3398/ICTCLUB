import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//import axios from "axios";
import ScheduleApi from '../../api/Schedule.json';
import "./Schedule.css";

const Schedule = () => {
  const [value, onChange] = useState(new Date());
  const [month, setMonth] = useState(Number(value.getMonth() + 1));
  const [year, setYear] = useState(Number(value.getFullYear()));
  //const [posts, setPost] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(`/api/boards/schedule`).then((response) => {
  //     console.log(response.data[0]);
  //     let copy = [...posts, ...response.data];
  //     setPost(copy);
  //     setLoading(false);
  //   });
  // }, []);

  const monthChange = (value) => {
    const monthValue = Number(value.activeStartDate.getMonth() + 1);
    const yearValue = Number(value.activeStartDate.getFullYear());
    setMonth(monthValue);
    setYear(yearValue);
  };

  return (
    <>
        <div className="board_wrap">
          <div className="board_title">
            <strong>학사일정</strong>
            <p> 강남대학교 {year}년 {month}월 학사일정</p>
          </div>
          <div className="board_schedule_wrap">
            <div className="calender">
              <Calendar
                calendarType="US"
                onChange={onChange}
                value={value}
                formatDay={(locale, date) =>
                  date.toLocaleString("en", { day: "numeric" })
                }
                onActiveStartDateChange={monthChange}
                next2Label={null}
                prev2Label={null}
              />
            </div>
            <div className="schedule_list">
              <Table>
                <thead>
                  <tr>
                    <th className="date">날짜</th>
                    <th className="content">일정내용</th>
                  </tr>
                </thead>
                { year === Number(value.getFullYear()) ? (
                  <tbody>
                  {ScheduleApi
                    .filter((item) => item.month === month)
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="date">{item.date}</td>
                        <td className="content">{item.content}</td>
                      </tr>
                    ))}
                </tbody> 
                ): (
                  <tbody>
                    <tr>
                      <td className = "date">{year}.{month}</td>
                      <td className = "content">해당하는 내용이 없습니다.</td>
                    </tr>
                  </tbody>
                )}
                {/* <tbody>
                  {posts
                    .filter((item) => item.month === month)
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="date">{item.date}</td>
                        <td className="content">{item.content}</td>
                      </tr>
                    ))}
                </tbody> */}
              </Table>
            </div>
          </div>
        </div>
    </>
  );
};

export default Schedule;
