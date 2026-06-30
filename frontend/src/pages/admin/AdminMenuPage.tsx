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
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Define the MenuItemDto interface
interface MenuItemDto {
  id: string; // UUID
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable: boolean;
  imageUrl?: string;
}

// Zod schema for form validation
const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().min(0.01, 'Price must be greater than 0')
  ),
  category: z.string().min(1, 'Category is required'),
  isAvailable: z.boolean().default(true),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

const AdminMenuPage = (): JSX.Element => {
  const { toast } = useToast();

  const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItemDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0.01,
      category: '',
      isAvailable: true,
      imageUrl: '',
    },
  });

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<MenuItemDto[]>('/api/v1/admin/menu');
      setMenuItems(response.data);
    } catch (err) {
      console.error('Failed to fetch menu items:', err);
      setError('Failed to load menu items. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load menu items.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    form.reset({
      name: '',
      description: '',
      price: 0.01,
      category: '',
      isAvailable: true,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItemDto) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
      isAvailable: item.isAvailable,
      imageUrl: item.imageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const onSubmit = async (values: MenuItemFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingItem) {
        // Update existing item
        await axios.put(`/api/v1/admin/menu/${editingItem.id}`, values);
        toast({
          title: 'Success',
          description: 'Menu item updated successfully.',
        });
      } else {
        // Create new item
        await axios.post('/api/v1/admin/menu', values);
        toast({
          title: 'Success',
          description: 'Menu item created successfully.',
        });
      }
      handleCloseModal();
      fetchMenuItems(); // Refresh the list
    } catch (err) {
      console.error('Failed to save menu item:', err);
      setError('Failed to save menu item. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to save menu item.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (itemId: string) => {
    setItemToDeleteId(itemId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDeleteId) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await axios.delete(`/api/v1/admin/menu/${itemToDeleteId}`);
      toast({
        title: 'Success',
        description: 'Menu item deleted successfully.',
      });
      fetchMenuItems(); // Refresh the list
    } catch (err) {
      console.error('Failed to delete menu item:', err);
      setError('Failed to delete menu item. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to delete menu item.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setItemToDeleteId(null);
    }
  };

  const menuCategories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side']; // Example categories

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Menu Management</h1>

          <div className="flex justify-end mb-6">
            <Button
              onClick={handleOpenCreateModal}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              Add New Menu Item
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-[#4A2C2A]" />
              <span className="ml-2 text-gray-700">Loading menu items...</span>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="mt-2 text-lg font-semibold text-gray-900">No menu items found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new menu item.</p>
              <div className="mt-6">
                <Button
                  onClick={handleOpenCreateModal}
                  className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
                >
                  Add New Menu Item
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="text-gray-700 font-semibold">Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Description</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Price</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Category</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Available</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Image URL</TableHead>
                    <TableHead className="text-gray-700 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">{item.description || 'N/A'}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.isAvailable ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="text-sm text-blue-600 hover:underline max-w-[150px] truncate">
                        {item.imageUrl ? <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">{item.imageUrl}</a> : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEditModal(item)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>

      {/* Create/Edit Menu Item Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#4A2C2A]">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...form.register('name')}
                className="col-span-3"
              />
              {form.formState.errors.name && (
                <p className="col-span-4 text-right text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                {...form.register('description')}
                className="col-span-3"
              />
              {form.formState.errors.description && (
                <p className="col-span-4 text-right text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...form.register('price', { valueAsNumber: true })}
                className="col-span-3"
              />
              {form.formState.errors.price && (
                <p className="col-span-4 text-right text-sm text-red-500">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) => form.setValue('category', value)}
                value={form.watch('category')}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {menuCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="col-span-4 text-right text-sm text-red-500">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isAvailable" className="text-right">
                Available
              </Label>
              <Checkbox
                id="isAvailable"
                checked={form.watch('isAvailable')}
                onCheckedChange={(checked) => form.setValue('isAvailable', checked as boolean)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                {...form.register('imageUrl')}
                className="col-span-3"
              />
              {form.formState.errors.imageUrl && (
                <p className="col-span-4 text-right text-sm text-red-500">
                  {form.formState.errors.imageUrl.message}
                </p>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold transition-all duration-200"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {editingItem ? 'Save Changes' : 'Add Item'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-red-600">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              This action cannot be undone. This will permanently delete the menu item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSubmitting}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminMenuPage;