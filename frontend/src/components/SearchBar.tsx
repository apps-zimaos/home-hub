interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div
      className="
        flex h-14
        items-center gap-3
        rounded-2xl
        border border-white/10
        bg-black/30
        px-5
        backdrop-blur-xl
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5 text-white/50"
      >
        <circle cx="11" cy="11" r="7" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" strokeWidth="2" />
      </svg>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search apps..."
        className="
          w-full bg-transparent
          text-sm text-white
          outline-none
          placeholder:text-white/40
        "
      />
    </div>
  );
}