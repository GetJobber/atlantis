export default `

const [value, setValue] = useState();
const getOptions = () => {
  return [
    { value: 1, label: "Hobbits" },
    { value: 2, label: "Super heroes" },
    { value: 3, label: "Space wars and treks" },
  ]
}

return (
  <Autocomplete
    getOptions={getOptions}
    initialOptions={[]}
    placeholder="Autocomplete"
    value={value}
    onChange={setValue}
  />
);

`;
