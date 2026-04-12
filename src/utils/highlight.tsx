function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


export function highlightText(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;

  const tokens = q
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (tokens.length === 0) return text;

  const union = tokens.map(escapeRegExp).join("|");
  const splitRe = new RegExp(`(${union})`, "ig");
  const exactRe = new RegExp(`^(?:${union})$`, "i");

  return text.split(splitRe).map((part, i) => {
    if (!part) return null;
    if (exactRe.test(part)) {
      return (
        <mark
          key={i}
          className="bg-purple-500/30 text-yellow-100 rounded px-1"
        >
          {part}
        </mark>
      );
    }

    return <span key={i}>{part}</span>;
  });
}
