import type { ColumnsType } from "antd/es/table";
import { Tag, Popconfirm } from "antd";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import type { Resource } from "../../services/api";

export const getResourceTableColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (resource: Resource) => void;
  onDelete: (id: number) => void;
}): ColumnsType<Resource> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <span className="font-bold text-text-primary">{text}</span>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text: string) => <span className="text-text-secondary">{text || "—"}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={status === "active" ? "#0ECB81" : "#F6465D"}
        className="border-none px-3 py-1 rounded-full bg-opacity-20 font-medium"
        style={{
          backgroundColor:
            status === "active" ? "rgba(14, 203, 129, 0.1)" : "rgba(246, 70, 93, 0.1)",
          color: status === "active" ? "#0ECB81" : "#F6465D",
        }}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value: string) => (
      <span className="text-text-tertiary">{new Date(value).toLocaleDateString()}</span>
    ),
    defaultSortOrder: "descend" as const,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: unknown, record: Resource) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 bg-background-tertiary/50 hover:bg-primary hover:text-background"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(record);
          }}>
          <Edit2 size={14} />
        </Button>
        <Popconfirm
          title="Delete resource"
          description="Are you sure you want to delete this resource?"
          onConfirm={(e) => {
            e?.stopPropagation();
            onDelete(record.id);
          }}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ className: "bg-status-danger" }}>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-background-tertiary/50 hover:bg-status-danger hover:text-white"
            onClick={(e) => e.stopPropagation()}>
            <Trash2 size={14} />
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];
