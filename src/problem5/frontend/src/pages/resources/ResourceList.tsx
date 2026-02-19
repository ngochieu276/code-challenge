import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { Plus, Grid2X2, Table2Icon } from "lucide-react";
import { Pagination, Table } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getResourceTableColumns } from "../../components/resources/ResourceTableColumn";
import { CreateEditServiceTable } from "../../components/resources/CreateEditServiceTable";
import { useResources, useResourceForm, useDeleteResource } from "../../hooks/resources";
import { ResourceGridItem } from "../../components/resources/ResourceGridItem";
import { ResourcesFilter } from "../../components/resources/ResourcesFilter";
import { ListLoading } from "../../components/layout/ListLoading";
import { ListEmpty } from "../../components/layout/ListEmpty";

export const ResourceList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  // Create/Edit form state and handlers
  const {
    form,
    isModalOpen,
    editingId,
    submitting,
    openCreate,
    openEdit,
    closeModal,
    handleSubmit,
  } = useResourceForm();

  const { data: resourcesResult, isLoading } = useResources({
    name: search,
    status: statusFilter,
    page,
    limit: pageSize,
  });
  const resources = resourcesResult?.data ?? [];
  const total = resourcesResult?.meta.total ?? 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, page, pageSize, queryClient]);

  const deleteMutation = useDeleteResource();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-10">Resources</h1>
          <p className="text-text-secondary">Manage your system resources efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={openCreate}
            className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>
      <ResourcesFilter
        search={search}
        status={statusFilter}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onStatusChange={(v) => {
          setStatusFilter(v);
          setPage(1);
        }}
      />
      <div className="flex justify-end gap-2 mb-2">
        <Button
          onClick={() => setView("table")}
          variant={view === "table" ? "primary" : "secondary"}>
          <Table2Icon />
        </Button>
        <Button
          onClick={() => setView("grid")}
          variant={view === "grid" ? "primary" : "secondary"}>
          <Grid2X2 />
        </Button>
      </div>
      {/* Table or Grid View */}
      {view === "table" ? (
        <Table
          loading={isLoading}
          rowKey="id"
          dataSource={resources}
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: true,
          }}
          onChange={(pagination) => {
            setPage(pagination.current || 1);
            setPageSize(pagination.pageSize || 9);
          }}
          onRow={(record) => ({
            onClick: () => navigate(`/resources/${record.id}`),
          })}
          columns={getResourceTableColumns({
            onEdit: openEdit,
            onDelete: (id: number) => deleteMutation.mutate(id),
          })}
        />
      ) : isLoading ? (
        <ListLoading />
      ) : resources.length === 0 ? (
        <ListEmpty />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceGridItem
              key={resource.id}
              resource={resource}
              onOpenDetails={(id) => navigate(`/resources/${id}`)}
              onOpenEdit={openEdit}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <CreateEditServiceTable
        open={isModalOpen}
        onCancel={closeModal}
        onSubmit={handleSubmit}
        form={form}
        submitting={submitting}
        editingId={editingId}
      />
      {view === "grid" && (
        <div className="mt-8 flex justify-center">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            onChange={(p, ps) => {
              setPage(p);
              setPageSize(ps);
            }}
          />
        </div>
      )}
    </>
  );
};
