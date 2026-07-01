import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs for new promotions

interface PromotionDto {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string, e.g., "YYYY-MM-DD"
  endDate: string;   // ISO date string
  isActive: boolean;
  imageUrl: string;
}

const AdminPromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPromotion, setEditingPromotion] = useState<PromotionDto | null>(null);
  const [formState, setFormState] = useState<Omit<PromotionDto, 'id'>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: false,
    imageUrl: '',
  });

  const fetchPromotions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      const response = await axios.get<PromotionDto[]>('/api/v1/admin/promotions');
      setPromotions(response.data);
    } catch (err) {
      setError('Failed to fetch promotions.');
      console.error('Error fetching promotions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleAddPromotionClick = () => {
    setEditingPromotion(null);
    setFormState({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      isActive: false,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEditPromotionClick = (promotion: PromotionDto) => {
    setEditingPromotion(promotion);
    setFormState({
      title: promotion.title,
      description: promotion.description,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      isActive: promotion.isActive,
      imageUrl: promotion.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSavePromotion = async () => {
    try {
      if (editingPromotion) {
        // Update existing promotion
        await axios.put(`/api/v1/admin/promotions/${editingPromotion.id}`, { ...formState, id: editingPromotion.id });
      } else {
        // Create new promotion
        await axios.post('/api/v1/admin/promotions', { ...formState, id: uuidv4() });
      }
      setIsModalOpen(false);
      fetchPromotions(); // Refresh the list
    } catch (err) {
      setError('Failed to save promotion.');
      console.error('Error saving promotion:', err);
    }
  };

  const handleToggleActive = async (promotion: PromotionDto) => {
    try {
      await axios.put(`/api/v1/admin/promotions/${promotion.id}`, { ...promotion, isActive: !promotion.isActive });
      fetchPromotions();
    } catch (err) {
      setError('Failed to toggle promotion status.');
      console.error('Error toggling promotion status:', err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Promotions Management</h1>

      <div className="flex justify-end mb-4">
        <Button
          onClick={handleAddPromotionClick}
          className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
        >
          Add New Promotion
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-8">Loading promotions...</div>
      )}

      {error && (
        <div className="text-center py-8 text-red-500">{error}</div>
      )}

      {!isLoading && !error && promotions.length === 0 && (
        <div className="text-center py-8 text-gray-600">No promotions found. Click "Add New Promotion" to get started.</div>
      )}

      {!isLoading && !error && promotions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 text-gray-700 font-semibold">
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell className="font-medium">{promotion.title}</TableCell>
                  <TableCell>{promotion.description}</TableCell>
                  <TableCell>{promotion.startDate}</TableCell>
                  <TableCell>{promotion.endDate}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={promotion.isActive}
                      onCheckedChange={() => handleToggleActive(promotion)}
                      aria-label="Toggle active status"
                    />
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">{promotion.imageUrl}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPromotionClick(promotion)}
                      className="hover:bg-gray-100 transition-all duration-200"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#4A2C2A]">
              {editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formState.startDate}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formState.endDate}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">Active</Label>
              <Checkbox
                id="isActive"
                name="isActive"
                checked={formState.isActive}
                onCheckedChange={(checked) => setFormState(prevState => ({ ...prevState, isActive: !!checked }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-4 py-2 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePromotion}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              Save Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPromotionsPage;