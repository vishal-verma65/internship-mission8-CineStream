import { RiSearchLine, RiCloseLine } from 'react-icons/ri'

const SearchBar = ({ value, onChange, onClear, placeholder = 'Search movies…' }) => {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none flex">
        <RiSearchLine size={16} />
      </span>

      <input
        type="text"
        className="search-input py-2.5 px-10 pl-4 text-[0.875rem] placeholder:pl-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
      />

      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2  w-5.5 h-5.5 flex items-center justify-center cursor-pointer text-(--text-muted) transition-colors hover:text-(--text-primary)"
        >
          <RiCloseLine size={13} />
        </button>
      )}
    </div>
  )
}

export default SearchBar