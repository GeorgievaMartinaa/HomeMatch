import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.jsx";
import {ArrowDown, ArrowUp, X} from "lucide-react";
import {Field} from "@/components/ui/field.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useEffect, useState} from "react";

export default function SortAndFilter({setPageNumber, setDebouncedFilter, setSortValue, sortValue, setCategoryFilter, categoryFilter}) {

    const [filterText, setFilterText] = useState('');


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(filterText);
        }, 500);

        return () => clearTimeout(timer);
    }, [filterText]);

    const handleFilterPosts = (event) => {
        setPageNumber(0);
        setFilterText(event.target.value);
    }

    const handleRemoveFilterText = () => {
        setFilterText('');
        setPageNumber(0);
    }

    const handleSortPosts = (value) => {
        setSortValue(value);
        setPageNumber(0);
    }

    const handleCategoryChange = (value) => {
        setCategoryFilter(value === "ALL" ? "" : value);
        setPageNumber(0);
    }

    return (
            <div className='w-full ml-1 flex md:flex-row justify-between gap-2 flex-col'>
              <div className="flex gap-4 w-full md:w-1/2 lg:1/3">
                <div className='lg:w-1/2'>
                    <InputGroup>
                        <InputGroupInput type="text" placeholder="Search by location..." value={filterText}
                                         onChange={handleFilterPosts}/>
                        {filterText && (
                            <InputGroupAddon align="inline-end">
                                <X className='hover:text-accent cursor-pointer' onClick={handleRemoveFilterText}/>
                            </InputGroupAddon>
                        )}

                    </InputGroup>
                </div>
                <div className='lg:w-1/3 flex gap-2'>
                    <Field className="">
                        <Select value={categoryFilter || "ALL"} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category..."/>
                            </SelectTrigger>
                            <SelectContent position="popper" className='bg-card'>
                                <SelectItem value="ALL">All</SelectItem>
                                <SelectItem value="RENT">Rent</SelectItem>
                                <SelectItem value="SELL">Sell</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
              </div>
                <Field className="w-fit pr-8">
                  <Select value={sortValue} onValueChange={handleSortPosts}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..."/>
                    </SelectTrigger>
                    <SelectContent position="popper" className=' bg-card'>
                      <SelectItem value="priceMKD ASC">Price <ArrowUp/> </SelectItem>
                      <SelectItem value="priceMKD DESC">Price <ArrowDown/> </SelectItem>
                      <SelectItem value="createdDate ASC">Date created<ArrowUp/></SelectItem>
                      <SelectItem value="createdDate DESC">Date created<ArrowDown/></SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
            </div>
    )
}