import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import clsx from 'clsx';

// Define the MenuItemDto schema
const menuItemSchema = z.object({
  id: z.string().uuid().optional(), // Optional for creation
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  isAvailable: z.boolean().default(true),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type MenuItemDto = z.infer<typeof menuItemSchema>;

const AdminMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemDto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Stores ID of item being deleted
  const { toast } = useToast();

  const form = useForm<MenuItemDto>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      isAvailable: true,
      imageUrl: '',
    },
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = form;

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<MenuItemDto[]>('/api/v1/admin/menu');
      setMenuItems(response.data);
    } catch (err) {
      setError('Failed to fetch menu items.');
      console.error('Error fetching menu items:', err);
      toast({
        title: 'Error',
        description: 'Failed to fetch menu items.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleEdit = (item: MenuItemDto) => {
    setEditingItem(item);
    reset(item); // Populate form with item data
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    setIsDeleting(id);
    try {
      await axios.delete(`/api/v1/admin/menu/${id}`);
      toast({
        title: 'Success',
        description: 'Menu item deleted successfully.',
      });
      fetchMenuItems(); // Refresh the list
    } catch (err) {
      setError('Failed to delete menu item.');
      console.error('Error deleting menu item:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete menu item.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const onSubmit = async (data: MenuItemDto) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingItem) {
        // Update existing item
        await axios.put(`/api/v1/admin/menu/${editingItem.id}`, data);
        toast({
          title: 'Success',
          description: 'Menu item updated successfully.',
        });
      } else {
        // Create new item
        await axios.post('/api/v1/admin/menu', data);
        toast({
          title: 'Success',
          description: 'Menu item created successfully.',
        });
      }
      setIsModalOpen(false);
      fetchMenuItems(); // Refresh the list
    } catch (err) {
      setError('Failed to save menu item.');
      console.error('Error saving menu item:', err);
      toast({
        title: 'Error',
        description: 'Failed to save menu item.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Menu Management</h1>

          <div className="flex justify-end mb-4">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
                  onClick={() => {
                    setEditingItem(null);
                    reset({
                      name: '',
                      description: '',
                      price: 0,
                      category: '',
                      isAvailable: true,
                      imageUrl: '',
                    });
                  }}
                >
                  Add New Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" {...register('name')} className="col-span-3" />
                    {errors.name && <p className="col-span-4 text-red-500 text-sm text-right">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" {...register('description')} className="col-span-3" />
                    {errors.description && <p className="col-span-4 text-red-500 text-sm text-right">{errors.description.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="col-span-3" />
                    {errors.price && <p className="col-span-4 text-red-500 text-sm text-right">{errors.price.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input id="category" {...register('category')} className="col-span-3" />
                    {errors.category && <p className="col-span-4 text-red-500 text-sm text-right">{errors.category.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageUrl" className="text-right">
                      Image URL
                    </Label>
                    <Input id="imageUrl" {...register('imageUrl')} className="col-span-3" />
                    {errors.imageUrl && <p className="col-span-4 text-red-500 text-sm text-right">{errors.imageUrl.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isAvailable" className="text-right">
                      Available
                    </Label>
                    <Checkbox
                      id="isAvailable"
                      checked={form.watch('isAvailable')}
                      onCheckedChange={(checked) => setValue('isAvailable', checked as boolean)}
                      className="col-span-3"
                    />
                    {errors.isAvailable && <p className="col-span-4 text-red-500 text-sm text-right">{errors.isAvailable.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold transition-all duration-200 mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save changes'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading && (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading menu items...</p>
              {/* Could add a spinner here */}
            </div>
          )}
          {error && <p className="text-red-500 text-center py-10">Error: {error}</p>}

          {!isLoading && !error && menuItems.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No menu items found. Add a new one!</p>
            </div>
          )}

          {!isLoading && !error && menuItems.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-100 text-gray-700 font-semibold">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Image URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                      <TableCell>${item.price?.toFixed(2)}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.isAvailable ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="truncate max-w-[150px]">
                        {item.imageUrl || 'N/A'}
                      </TableCell>
                      <TableCell className="text-right min-w-[150px]">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className={clsx(
                            "bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200",
                            isDeleting === item.id && "opacity-70 cursor-not-allowed"
                          )}
                          onClick={() => item.id && handleDelete(item.id)}
                          disabled={isDeleting === item.id}
                        >
                          {isDeleting === item.id ? 'Deleting...' : 'Delete'}
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
    </AdminLayout>
  );
};

export default AdminMenuPage;