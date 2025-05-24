import { InboxItem } from "../lib/types";

interface InboxProps {
  items: InboxItem[];
  onSelect: (item: InboxItem) => void;
  selectedId?: number;
}

export function Inbox({ items, onSelect, selectedId }: InboxProps) {
  return (
    <div className="h-[100vh] w-[30vw] overflow-y-auto">
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 hover:bg-gray-100 cursor-pointer transition-colors rounded-lg ${
              selectedId === item.id ? "bg-gray-100" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">{item.sender}</h3>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
            <h4 className="font-semibold mt-1 text-gray-800">{item.subject}</h4>
            <p className="text-sm text-gray-600 mt-1 truncate">
              {item.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
