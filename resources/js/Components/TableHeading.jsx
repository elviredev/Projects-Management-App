import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

export default function TableHeading({
  children,
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {}
}) {

  return (
    <th onClick={() => sortChanged(name)}>
      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer lg:gap-0">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={`
              w-4 ${sort_field === name && sort_direction === "asc" ? "text-white" : ""}
            `}/>
            <ChevronDownIcon
              className={`
                w-4 -mt-2 ${sort_field === name && sort_direction === "desc" ? "text-white" : ""}
              `}/>
          </div>
        )}
      </div>
    </th>
  )
}
