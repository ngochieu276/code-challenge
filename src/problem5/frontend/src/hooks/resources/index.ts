import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Form, message } from "antd";
import { resourceService } from "../../services/api";
import type { Resource, CreateResourceDTO } from "../../services/api";

interface GetResourceParams {
  name: string;
  status?: string;
  page: number;
  limit: number;
}

export const useResources = ({ name, status, page, limit }: GetResourceParams) =>
  useQuery({
    queryKey: ["resources", { name, status, page, limit }],
    queryFn: async () =>
      resourceService.getAll({
        name,
        status,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });

interface UseResourceFormResult {
  form: ReturnType<typeof Form.useForm>[0];
  isModalOpen: boolean;
  editingId: number | null;
  submitting: boolean;
  openCreate: () => void;
  openEdit: (resource: Resource) => void;
  closeModal: () => void;
  handleSubmit: (values: CreateResourceDTO) => Promise<void>;
}

export const useResourceForm = (): UseResourceFormResult => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (resource: Resource) => {
    setEditingId(resource.id);
    form.setFieldsValue(resource);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (values: CreateResourceDTO) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await resourceService.update(editingId, values);
        message.success("Resource updated successfully");
      } else {
        await resourceService.create(values);
        message.success("Resource created successfully");
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    } catch {
      message.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    isModalOpen,
    editingId,
    submitting,
    openCreate,
    openEdit,
    closeModal,
    handleSubmit,
  };
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => resourceService.delete(id),
    onSuccess: () => {
      message.success("Resource deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: () => {
      message.error("Failed to delete resource");
    },
  });
};
