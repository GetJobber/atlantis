export default `
const [value, setValue] = useState(undefined);
return (
  <InputPhoneNumber
    placeholder={"Enter your phone number"}
    value={value}
    onChange={setValue}
  />
);
`;
