import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.jsx";
import {ArrowDown, ArrowUp, X} from "lucide-react";
import {Field} from "@/components/ui/field.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useEffect, useState} from "react";

export default function SortAndFilter({setPageNumber, setDebouncedFilter, setSortValue, sortValue}) {

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
    return (
            <div className='w-1/2 sm:w-1/3 ml-1 flex flex-col gap-5 sm:flex-row'>
                <div className='sm:w-2/3 w-full'>
                    <InputGroup>
                        <InputGroupInput type="text" placeholder="Filter by location..." value={filterText}
                                         onChange={handleFilterPosts}/>
                        {filterText && (
                            <InputGroupAddon align="inline-end">
                                <X className='hover:text-accent cursor-pointer' onClick={handleRemoveFilterText}/>
                            </InputGroupAddon>
                        )}

                    </InputGroup>
                </div>
                <div className='sm:w-1/3 w-full flex gap-2'>
                    <Field>
                        <Select value={sortValue} onValueChange={handleSortPosts}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by..."/>
                            </SelectTrigger>
                            <SelectContent position="popper" className=' bg-card'>
                                <SelectItem value="priceMKD ASC">Price <ArrowUp/> </SelectItem>
                                <SelectItem value="priceMKD DESC">Price <ArrowDown/> </SelectItem>
                                <SelectItem value="createdDate ASC">Date <ArrowUp/></SelectItem>
                                <SelectItem value="createdDate DESC">Date <ArrowDown/></SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

            </div>
    )
}