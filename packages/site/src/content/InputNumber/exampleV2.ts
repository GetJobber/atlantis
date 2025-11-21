export default `
const [value, setValue] = useState(3);
return (
  <InputNumber
    version={2}
    value={value}
    onChange={setValue}
  />
);
`;
