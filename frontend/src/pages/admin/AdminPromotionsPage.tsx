import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
// Not explicitly used but good practice to include if needed for complex class merging
import axios from 'axios'; // Assuming axios is configured and available

// Inferred PromotionDto structure based on requirements
interface PromotionDto {
  id?: string; // UUID, optional for creation
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD format for date input
  endDate: string;   // YYYY-MM-DD format for date input
  isActive: boolean;
  imageUrl: string;
}

const AdminPromotionsPage = (): JSX.Element => {
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPromotion, setEditingPromotion] = useState<PromotionDto | null>(null);
  const [formData, setFormData] = useState<PromotionDto>({
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
      const response = await axios.get<PromotionDto[]>('/api/v1/admin/promotions');
      setPromotions(response.data);
    } catch (err) {
      setError('Failed to fetch promotions. Please try again.');
      console.error('Error fetching promotions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      isActive: false,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEditPromotion = (promotion: PromotionDto) => {
    setEditingPromotion(promotion);
    setFormData({
      ...promotion,
      // Ensure dates are in YYYY-MM-DD format for input type="date"
      startDate: promotion.startDate.split('T')[0],
      endDate: promotion.endDate.split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (editingPromotion) {
        await axios.put(`/api/v1/admin/promotions/${editingPromotion.id}`, formData);
      } else {
        await axios.post('/api/v1/admin/promotions', formData);
      }
      setIsModalOpen(false);
      fetchPromotions(); // Refresh the list
    } catch (err) {
      setError('Failed to save promotion. Please check your input and try again.');
      console.error('Error saving promotion:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (promotion: PromotionDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.put(`/api/v1/admin/promotions/${promotion.id}`, {
        ...promotion,
        isActive: !promotion.isActive,
      });
      fetchPromotions(); // Refresh the list
    } catch (err) {
      setError('Failed to update promotion status. Please try again.');
      console.error('Error updating promotion status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Promotions Management</h1>

          <div className="mb-6 flex justify-end">
            <Button
              onClick={handleAddPromotion}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              Add New Promotion
            </Button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading promotions...</p>
              {/* Placeholder for a spinner if desired */}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!isLoading && !error && promotions.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <p className="text-lg text-gray-600 mb-2">No promotions found.</p>
              <p className="text-gray-500">Click "Add New Promotion" to create your first promotion.</p>
            </div>
          )}

          {!isLoading && !error && promotions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="text-gray-700 font-semibold">Title</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Description</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Start Date</TableHead>
                    <TableHead className="text-gray-700 font-semibold">End Date</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Active</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Image URL</TableHead>
                    <TableHead className="text-gray-700 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">{promotion.title}</TableCell>
                      <TableCell>{promotion.description}</TableCell>
                      <TableCell>{promotion.startDate.split('T')[0]}</TableCell>
                      <TableCell>{promotion.endDate.split('T')[0]}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={promotion.isActive}
                          onCheckedChange={() => handleToggleActive(promotion)}
                          aria-label={`Toggle active status for ${promotion.title}`}
                        />
                      </TableCell>
                      <TableCell className="truncate max-w-[150px]">{promotion.imageUrl}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleEditPromotion(promotion)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-3 py-1.5 transition-all duration-200 text-sm"
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
                <DialogTitle className="text-2xl font-bold text-[#4A2C2A]">
                  {editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {editingPromotion
                    ? 'Make changes to the promotion here. Click save when you\'re done.'
                    : 'Create a new promotion by filling out the details below.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="col-span-3 min-h-[80px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isActive" className="text-right">
                    Active
                  </Label>
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleFormChange({
                        target: { id: 'isActive', type: 'checkbox', checked },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <DialogFooter className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-4 py-2 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
                  >
                    {editingPromotion ? 'Save Changes' : 'Create Promotion'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPromotionsPage;