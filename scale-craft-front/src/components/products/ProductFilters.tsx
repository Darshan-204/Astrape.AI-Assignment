import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FilterOptions } from '@/types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
}

export const ProductFilters = ({ filters, onFiltersChange, categories }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([filters.priceRange?.min || 0, filters.priceRange?.max || 1000]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined,
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      priceRange: {
        min: values[0],
        max: values[1],
      },
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-') as [FilterOptions['sortBy'], FilterOptions['sortOrder']];
    onFiltersChange({
      ...filters,
      sortBy,
      sortOrder,
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    onFiltersChange({});
  };

  const activeFiltersCount = [
    filters.category,
    filters.priceRange,
    filters.inStock,
    filters.featured,
    filters.sortBy,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between md:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      <Card className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Sort */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sort By</Label>
            <Select
              value={filters.sortBy && filters.sortOrder ? `${filters.sortBy}-${filters.sortOrder}` : ''}
              onValueChange={handleSortChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
                <SelectItem value="newest-desc">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Categories</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.category === category}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm font-normal capitalize cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Quick Filters */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Filters</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock || false}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, inStock: checked as boolean })
                  }
                />
                <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
                  In Stock Only
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={filters.featured || false}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, featured: checked as boolean })
                  }
                />
                <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                  Featured Products
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};