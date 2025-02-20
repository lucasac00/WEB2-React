import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Event {
  date: Date;
  title: string;
}

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const addEvent = () => {
    const title = prompt("Digite o título do evento:");
    if (title) {
      setEvents([...events, { date: selectedDate, title }]);
    }
  };

  // Get events matching the selected date
  const eventsForSelectedDate = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div className="mt-4">
        <h3 className="text-xl font-bold">
          Eventos em {selectedDate.toLocaleDateString()}
        </h3>
        {eventsForSelectedDate.length === 0 ? (
          <p>Nenhum evento para este dia.</p>
        ) : (
          <ul className="list-disc pl-5">
            {eventsForSelectedDate.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
        )}
        <button
          onClick={addEvent}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:scale-105 transition"
        >
          Adicionar Evento
        </button>
      </div>
    </div>
  );
};

export default EventCalendar;
