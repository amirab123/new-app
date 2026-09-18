const categories = [
  { label: "Technology", value: "technology" },
  { label: "Business", value: "business" },
  { label: "Sports", value: "sports" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Entertainment", value: "entertainment" },
];

function CategoryBar({ selectedCategory, onSelect }) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelect(category.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === category.value
              ? "bg-green-600 text-white"
              : "bg-white text-slate-600 hover:bg-slate-200"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;