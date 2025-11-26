export default `
const [date, setDate] = useState(new Date());

return <InputDate value={date} onChange={setDate} />;
`;
