import { Select } from "antd";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";

const { Option } = Select;

type Props = {
  search: string;
  status?: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string | undefined) => void;
};

export const ResourcesFilter = ({ search, status, onSearchChange, onStatusChange }: Props) => {
  return (
    <div className="bg-background-secondary p-4 rounded-2xl border border-gray-800 mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          value={status}
          placeholder="Filter by Status"
          allowClear
          className="w-full h-10"
          onChange={(v) => onStatusChange(v)}
          dropdownStyle={{
            backgroundColor: "#2B3139",
            borderColor: "#374151",
          }}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </div>
    </div>
  );
};
