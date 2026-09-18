function SearchBar({ value, onChange, onSearch }) {
  return (
    <form onSubmit={onSearch} className="mx-auto mb-8 flex max-w-2xl gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher une actualité..."
        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-500"
      />

      <button
        type="submit"
        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;