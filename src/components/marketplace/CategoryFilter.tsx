'use client';

const CATEGORIES = [
  { id: null, label: 'All Agents', icon: '🌐' },
  { id: 'coding', label: 'Coding', icon: '💻' },
  { id: 'content', label: 'Content', icon: '✍️' },
  { id: 'data', label: 'Data', icon: '📊' },
  { id: 'research', label: 'Research', icon: '🔬' },
  { id: 'workflow', label: 'Workflow', icon: '⚙️' },
  { id: 'voice', label: 'Voice', icon: '🎙️' },
  { id: 'multimodal', label: 'Multimodal', icon: '🖼️' },
];

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id ?? 'all'}
          onClick={() => onSelect(cat.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition
            ${selected === cat.id
              ? 'bg-sky-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
