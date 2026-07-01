import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

// Radix UI components for primitives
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';

// Icons for empty state or loading
import { PlusCircle, Edit, Loader2, XCircle } from 'lucide-react';

interface PromotionDto {
  id?: string;
  title: string;
  description: string;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate: string;   // ISO date string (YYYY-MM-DD)
  isActive: boolean;
  imageUrl: string;
}

const AdminPromotionsPage = (): React.ReactElement => {
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<PromotionDto | null>(null);
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
      const response = await axios.get<PromotionDto[]>('/api/v1/admin/promotions');
      setPromotions(response.data);
    } catch (err) {
      console.error('Failed to fetch promotions:', err);
      setError('Failed to load promotions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const openCreateModal = () => {
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

  const openEditModal = (promotion: PromotionDto) => {
    setEditingPromotion(promotion);
    setFormState({
      ...promotion,
      // Ensure dates are in YYYY-MM-DD format for input type="date"
      startDate: promotion.startDate ? new Date(promotion.startDate).toISOString().split('T')[0] : '',
      endDate: promotion.endDate ? new Date(promotion.endDate).toISOString().split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingPromotion) {
        // Update promotion
        await axios.put(`/api/v1/admin/promotions/${editingPromotion.id}`, formState);
      } else {
        // Create new promotion
        await axios.post('/api/v1/admin/promotions', formState);
      }
      setIsModalOpen(false);
      fetchPromotions(); // Refresh list
    } catch (err) {
      console.error('Failed to save promotion:', err);
      setError('Failed to save promotion. Please check your input and try again.');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#F7C548]" />
          <p className="ml-2 text-gray-700">Loading promotions...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <div className="mt-6">
            <Button
              onClick={fetchPromotions}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    if (promotions.length === 0) {
      return (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <PlusCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No promotions found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new promotion.</p>
          <div className="mt-6">
            <Button
              onClick={openCreateModal}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Promotion
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <Table>
          <TableHeader className="bg-gray-100 text-gray-700 font-semibold">
            <TableRow>
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
                <TableCell>{new Date(promotion.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(promotion.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      promotion.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {promotion.isActive ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  {promotion.imageUrl ? (
                    <a
                      href={promotion.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F7C548] hover:underline"
                    >
                      View Image
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(promotion)}
                    className="text-blue-600 hover:text-blue-800 transition-all duration-200"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#4A2C2A]">Promotions Management</h1>
            <Button
              onClick={openCreateModal}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Promotion
            </Button>
          </div>

          {renderContent()}

          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/50 fixed inset-0 z-50" />
              <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50">
                <Dialog.Title className="text-xl font-semibold text-[#4A2C2A] mb-4">
                  {editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label.Root htmlFor="title" className="text-sm font-medium text-gray-700 block mb-1">
                      Title
                    </Label.Root>
                    <Input
                      id="title"
                      name="title"
                      value={formState.title}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label.Root htmlFor="description" className="text-sm font-medium text-gray-700 block mb-1">
                      Description
                    </Label.Root>
                    <Textarea
                      id="description"
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label.Root htmlFor="startDate" className="text-sm font-medium text-gray-700 block mb-1">
                      Start Date
                    </Label.Root>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formState.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label.Root htmlFor="endDate" className="text-sm font-medium text-gray-700 block mb-1">
                      End Date
                    </Label.Root>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formState.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox.Root
                      id="isActive"
                      checked={formState.isActive}
                      onCheckedChange={handleCheckboxChange}
                      className="flex h-4 w-4 shrink-0 rounded-sm border border-gray-300 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#F7C548] data-[state=checked]:text-[#4A2C2A]"
                    >
                      <Checkbox.Indicator className="flex items-center justify-center text-current">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.10407 11.3373 6.90005 11.3373C6.69603 11.3373 6.50227 11.2452 6.40211 11.092L3.30211 6.59198C3.11321 6.30308 3.19435 5.91574 3.48324 5.72684C3.77214 5.53794 4.15948 5.61908 4.34838 5.90798L6.70005 9.59198L10.648 3.90798C10.8369 3.61908 11.2242 3.53794 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <Label.Root htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Is Active
                    </Label.Root>
                  </div>
                  <div>
                    <Label.Root htmlFor="imageUrl" className="text-sm font-medium text-gray-700 block mb-1">
                      Image URL
                    </Label.Root>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formState.imageUrl}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-4 py-2 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
                    >
                      {editingPromotion ? 'Save Changes' : 'Add Promotion'}
                    </Button>
                  </div>
                </form>
                <Dialog.Close asChild>
                  <button
                    className="text-gray-400 hover:text-gray-600 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPromotionsPage;