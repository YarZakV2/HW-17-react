export default function Filter({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Find contacts"
      value={value}
      onChange={e =>
        onChange(e.target.value)
      }
    />
  );
}