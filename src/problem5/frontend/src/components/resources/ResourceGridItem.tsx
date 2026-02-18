import { Tag, Popconfirm } from "antd";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import type { Resource } from "../../services/api";

type Props = {
  resource: Resource;
  onOpenDetails: (id: number) => void;
  onOpenEdit: (resource: Resource) => void;
  onDelete: (id: number) => void;
};

export const ResourceGridItem = ({ resource, onOpenDetails, onOpenEdit, onDelete }: Props) => {
  return (
    <div
      className="group bg-background-secondary rounded-2xl border border-gray-800 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden"
      onClick={() => onOpenDetails(resource.id)}>
      <div className="absolute bottom-12 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 bg-background-tertiary/50 hover:bg-primary hover:text-background"
          onClick={(e) => {
            e.stopPropagation();
            onOpenEdit(resource);
          }}>
          <Edit2 size={14} />
        </Button>
        <Popconfirm
          title="Delete resource"
          description="Are you sure you want to delete this resource?"
          onConfirm={(e) => {
            e?.stopPropagation();
            onDelete(resource.id);
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

      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-background-tertiary rounded-xl">
          <span className="text-2xl font-bold text-primary">
            {resource.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <Tag
          color={resource.status === "active" ? "#0ECB81" : "#F6465D"}
          className="mr-0 border-none px-3 py-1 rounded-full bg-opacity-20 font-medium"
          style={{
            backgroundColor:
              resource.status === "active" ? "rgba(14, 203, 129, 0.1)" : "rgba(246, 70, 93, 0.1)",
            color: resource.status === "active" ? "#0ECB81" : "#F6465D",
          }}>
          {resource.status.toUpperCase()}
        </Tag>
      </div>

      <h3
        className="text-lg font-bold text-text-primary mb-2 truncate"
        title={resource.name}>
        {resource.name}
      </h3>

      <p className="text-text-secondary text-sm mb-6 line-clamp-2 h-10">
        {resource.description || "No description provided."}
      </p>

      <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-text-tertiary">
        <span>ID: #{resource.id}</span>
        <span>{new Date(resource.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
