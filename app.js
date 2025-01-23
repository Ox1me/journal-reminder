const NotificationScheduler = () => {
  const [startHour, setStartHour] = React.useState(9);
  const [endHour, setEndHour] = React.useState(21);
  const [frequency, setFrequency] = React.useState(1);
  const [scheduledTimes, setScheduledTimes] = React.useState([]);

  const generateRandomTimes = () => {
    const times = [];
    const startTime = startHour * 60;
    const endTime = endHour * 60;
    const availableMinutes = [];
    
    for (let i = startTime; i <= endTime; i++) {
      availableMinutes.push(i);
    }
    
    for (let i = 0; i < frequency; i++) {
      if (availableMinutes.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableMinutes.length);
      const selectedMinute = availableMinutes[randomIndex];
      availableMinutes.splice(randomIndex, 1);
      times.push(selectedMinute);
    }
    
    return times.sort((a, b) => a - b).map(minutes => {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });
  };

  React.useEffect(() => {
    setScheduledTimes(generateRandomTimes());
  }, [startHour, endHour, frequency]);

  return React.createElement('div', { className: 'p-4 max-w-md mx-auto' },
    React.createElement('div', { className: 'space-y-6 bg-white shadow rounded-lg p-6' },
      React.createElement('h1', { className: 'text-xl font-bold' }, 'Journal Reminder Settings'),
      
      React.createElement('div', { className: 'space-y-2' },
        React.createElement('label', { className: 'block text-sm font-medium' }, 'Time Range'),
        React.createElement('div', { className: 'flex items-center gap-4' },
          React.createElement('select', {
            value: startHour,
            onChange: (e) => setStartHour(Number(e.target.value)),
            className: 'flex-1 p-2 border rounded'
          }, Array.from({ length: 24 }, (_, i) => 
            React.createElement('option', { key: i, value: i, disabled: i >= endHour }, 
              `${i.toString().padStart(2, '0')}:00`
            )
          )),
          React.createElement('span', null, 'to'),
          React.createElement('select', {
            value: endHour,
            onChange: (e) => setEndHour(Number(e.target.value)),
            className: 'flex-1 p-2 border rounded'
          }, Array.from({ length: 24 }, (_, i) => 
            React.createElement('option', { key: i, value: i, disabled: i <= startHour },
              `${i.toString().padStart(2, '0')}:00`
            )
          ))
        )
      ),

      React.createElement('div', { className: 'space-y-2' },
        React.createElement('label', { className: 'block text-sm font-medium' }, 'Number of Reminders'),
        React.createElement('select', {
          value: frequency,
          onChange: (e) => setFrequency(Number(e.target.value)),
          className: 'w-full p-2 border rounded'
        }, [1, 2, 3, 4, 5].map(num => 
          React.createElement('option', { key: num, value: num },
            `${num} ${num === 1 ? 'reminder' : 'reminders'}`
          )
        ))
      ),

      React.createElement('div', { className: 'space-y-2' },
        React.createElement('label', { className: 'block text-sm font-medium' }, 'Today\'s Schedule'),
        React.createElement('div', { className: 'space-y-2' },
          scheduledTimes.map((time, index) =>
            React.createElement('div', {
              key: index,
              className: 'flex items-center gap-2 p-2 bg-gray-50 rounded'
            }, time)
          )
        )
      )
    )
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(NotificationScheduler));