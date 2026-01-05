export default `
const [time, setTime] = useState(new Date());

return (
  <InputTime
    version={2}
    value={time}
    onChange={setTime}
  />
);
`;
