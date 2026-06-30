import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

interface PromotionDto {
  id?: string;
  title: string;
  description: string;
  startDate: string; // ISO date string (e.g., "YYYY-MM-DD")
  endDate: string;   // ISO date string
  isActive: boolean;
  imageUrl: string;
}

const AdminPromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPromotion, setCurrentPromotion] = useState<PromotionDto | null>(null);
  const [formState, setFormState] = useState<PromotionDto>({
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
      const response = await fetch('/api/v1/admin/promotions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PromotionDto[] = await response.json();
      setPromotions(data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState(prev => ({ ...prev, isActive: checked }));
  };

  const handleAddPromotionClick = () => {
    setCurrentPromotion(null);
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
    setCurrentPromotion(promotion);
    setFormState({
      id: promotion.id,
      title: promotion.title,
      description: promotion.description,
      startDate: format(new Date(promotion.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(promotion.endDate), 'yyyy-MM-dd'),
      isActive: promotion.isActive,
      imageUrl: promotion.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const method = currentPromotion ? 'PUT' : 'POST';
      const url = currentPromotion
        ? `/api/v1/admin/promotions/${currentPromotion.id}`
        : '/api/v1/admin/promotions';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsModalOpen(false);
      fetchPromotions();
    } catch (err) {
      setError(`Failed to ${currentPromotion ? 'update' : 'create'} promotion.`);
      console.error(`Error ${currentPromotion ? 'updating' : 'creating'} promotion:`, err);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Promotions Management</h1>
            <div className="text-center py-10">Loading promotions...</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Promotions Management</h1>
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Promotions Management</h1>

          <div className="flex justify-end mb-4">
            <Button
              onClick={handleAddPromotionClick}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              Add New Promotion
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            {promotions.length === 0 ? (
              <div className="text-center py-10 text-gray-600">No promotions found. Click "Add New Promotion" to get started.</div>
            ) : (
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
                      <TableCell>{format(new Date(promotion.startDate), 'PPP')}</TableCell>
                      <TableCell>{format(new Date(promotion.endDate), 'PPP')}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={promotion.isActive}
                          disabled
                        />
                      </TableCell>
                      <TableCell className="truncate max-w-[150px]">{promotion.imageUrl}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPromotionClick(promotion)}
                          className="hover:bg-gray-100 text-gray-800 font-medium rounded-md px-3 py-1 transition-all duration-200"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{currentPromotion ? 'Edit Promotion' : 'Add New Promotion'}</DialogTitle>
                <DialogDescription>
                  {currentPromotion
                    ? 'Make changes to this promotion here. Click save when you\'re done.'
                    : 'Create a new promotion. Fill in the details below.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formState.startDate}
                    onChange={handleInputChange}
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
                    name="endDate"
                    type="date"
                    value={formState.endDate}
                    onChange={handleInputChange}
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
                    name="isActive"
                    checked={formState.isActive}
                    onCheckedChange={handleCheckboxChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formState.imageUrl}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
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
                    {currentPromotion ? 'Save Changes' : 'Create Promotion'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPromotionsPage;