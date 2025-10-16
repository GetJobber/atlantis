export default `
const [value, setValue] = useState();
const [inputValue, setInputValue] = useState("");
const menu = [{ 
  type: "section", 
  label: "Services", 
  options: [
    { label: "Drain Cleaning" }, { label: "Pipe Replacement" }, { label: "Sewer Line Repair" }, { label: "Seasonal Refreshment" }, { label: "Window Cleaning" }, { label: "Roof Inspection" }, { label: "Flooring Installation" }, { label: "Baseboard Installation" }, { label: "HVAC Repair" }, { label: "HVAC Installation" }] 
}];

return (
  <div style={{width: "100%"}}>
    <Autocomplete
      version={2}
      placeholder="Search"
      value={value}
      onChange={setValue}
      inputValue={inputValue}
      onInputChange={setInputValue}
      menu={menu}
    />
  </div>
);
`;
