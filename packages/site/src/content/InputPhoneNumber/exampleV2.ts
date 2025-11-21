export default `
const [value, setValue] = useState("");
return (
  <InputPhoneNumber
    version={2}
    placeholder={"Enter your phone number"}
    value={value}
    onChange={setValue}
  />
);
`;
