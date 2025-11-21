export default `
const [checked, setChecked] = useState(false);

return (
  <Checkbox
    version={2}
    label={"Subscribe to updates"}
    checked={checked}
    onChange={setChecked}
  />
);
`;
