import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
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

// Radix UI components as per Rule 8a
import { Root as Dialog, Content as DialogContent, Title as DialogTitle, Close as DialogClose } from '@radix-ui/react-dialog';
import { Root as Select, Trigger as SelectTrigger, Value as SelectValue, Content as SelectContent, Item as SelectItem } from '@radix-ui/react-select';
import { Root as Checkbox } from '@radix-ui/react-checkbox';
import { Root as Label } from '@radix-ui/react-label';


// Inferred MenuItemDto structure based on requirements
interface MenuItemDto {
  id?: string; // UUID, optional for creation
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  imageUrl: string;
}

const AdminMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemDto | null>(null);

  // Form state for new/edited item
  const [formData, setFormData] = useState<MenuItemDto>({
    name: '',
    description: '',
    price: 0,
    category: '',
    isAvailable: true,
    imageUrl: '',
  });

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/admin/menu');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MenuItemDto[] = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError('Failed to fetch menu items.');
      console.error('Error fetching menu items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: checked,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      isAvailable: true,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (item: MenuItemDto) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/admin/menu/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchMenuItems(); // Refresh the list
    } catch (err) {
      setError('Failed to delete menu item.');
      console.error('Error deleting menu item:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/v1/admin/menu/${editingItem.id}` : '/api/v1/admin/menu';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsModalOpen(false);
      fetchMenuItems(); // Refresh the list
    } catch (err) {
      setError(`Failed to ${editingItem ? 'update' : 'create'} menu item.`);
      console.error(`Error ${editingItem ? 'updating' : 'creating'} menu item:`, err);
    }
  };

  // Placeholder categories for the select dropdown
  const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Menu Management</h1>

          <div className="flex justify-end mb-4">
            <Button
              onClick={handleAddClick}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              Add New Menu Item
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading menu items...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-8 text-gray-600">No menu items found. Click "Add New Menu Item" to get started.</div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700 font-semibold">
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
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">{item.description}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.isAvailable ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="text-sm text-blue-500 hover:underline max-w-[150px] truncate">
                        <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">{item.imageUrl}</a>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          onClick={() => handleEditClick(item)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-3 py-1 text-sm transition-all duration-200"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(item.id!)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-3 py-1 text-sm transition-all duration-200"
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

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg">
              {/* Mimics DialogHeader */}
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <DialogTitle className="text-2xl font-bold text-[#4A2C2A]">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Category
                  </Label>
                  <Select onValueChange={handleCategoryChange} value={formData.category}>
                    <SelectTrigger className="col-span-3 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isAvailable" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Available
                  </Label>
                  <Checkbox
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onCheckedChange={handleCheckboxChange}
                    className="col-span-3 justify-self-start peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                </div>
                {/* Mimics DialogFooter */}
                <div className="flex flex-row-reverse sm:justify-end sm:space-x-2">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-4 py-2 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200 mr-2"
                  >
                    {editingItem ? 'Save Changes' : 'Add Item'}
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

export default AdminMenuPage;
