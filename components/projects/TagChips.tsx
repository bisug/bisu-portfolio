import Link from "next/link";
import { kebabCase } from "@/utils/utils";

function TagChips({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-1.5 list-none ${className ?? ""}`}
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/projects/tag/${kebabCase(tag)}`}
            prefetch={false}
            className="inline-flex min-h-[44px] items-center rounded-control bg-surface-raised hover:bg-accent px-3 py-1.5 text-xs font-medium text-muted hover:text-on-accent transition-colors duration-150"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagChips;
