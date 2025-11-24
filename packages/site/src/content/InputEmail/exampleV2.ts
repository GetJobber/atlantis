export default `
const [value, setValue] = useState("");

return (
  <InputEmail version={2} placeholder={"Enter your email"} value={value} onChange={setValue} />
);
`;
