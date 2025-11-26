export default `
const [date, setDate] = useState(new Date());

return <InputDate version={2} value={date} onChange={setDate} />;
`;
