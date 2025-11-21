export default `
const [checked, setChecked] = useState(true);

return (
  <Checkbox
    label={"Save card for future use"}
    checked={checked}
    onChange={setChecked}
  />
);
`;
