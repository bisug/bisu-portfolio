import Link from "next/link";
import { kebabCase } from "@/utils/utils";

function TagChips({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 list-none ${className ?? ""}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/projects/tag/${kebabCase(tag)}`}
            prefetch={false}
            className="rounded-md bg-fun-navy px-2.5 py-1.5 text-xs text-fun-gray-light transition hover:bg-fun-accent hover:text-fun-navy-darkest"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagChips;
