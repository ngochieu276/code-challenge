import React from "react";
import { Modal, Form, Select, Input as AntInput } from "antd";
import type { FormInstance } from "antd";
import { Button } from "@/components/ui";
import type { CreateResourceDTO } from "@/services/service.api";

const { Option } = Select;

interface CreateEditServiceTableProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateResourceDTO) => void;
  form: FormInstance;
  submitting: boolean;
  editingId: number | null;
}

export const CreateEditServiceTable: React.FC<CreateEditServiceTableProps> = ({
  open,
  onCancel,
  onSubmit,
  form,
  submitting,
  editingId,
}) => {
  return (
    <Modal
      title={editingId ? "Edit Resource" : "Create Resource"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="mt-6"
        initialValues={{ status: "active" }}>
        <Form.Item
          name="name"
          label="Resource Name"
          rules={[{ required: true, message: "Please enter a name" }]}>
          <AntInput
            className="h-10 rounded-lg"
            placeholder="e.g. Server Alpha"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description">
          <AntInput.TextArea
            rows={4}
            className="rounded-lg"
            placeholder="Optional description..."
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}>
          <Select className="h-10 rounded-lg">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <div className="flex gap-3 justify-end mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={submitting}>
            {editingId ? "Update Resource" : "Create Resource"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
