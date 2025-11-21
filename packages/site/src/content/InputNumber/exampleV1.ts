export default `
const [value, setValue] = useState(3);
return (
  <InputNumber
    value={value}
    onChange={(newValue: number) => setValue(newValue)}
  />
);
`;
