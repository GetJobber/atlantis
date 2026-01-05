export default `
const [value, setValue] = useState("");

return (
  <InputText version={2} placeholder={"Type here"} value={value} onChange={setValue} />
);
`;
