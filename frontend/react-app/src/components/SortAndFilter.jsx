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
            <div className='w-full ml-1 flex flex-col justify-between gap-2 lg:flex-row'>
              <div className="flex gap-4">
                <div className='sm:w-1/2 w-full'>
                    <InputGroup>
                        <InputGroupInput type="text" placeholder="Пребарувај според локација..." value={filterText}
                                         onChange={handleFilterPosts}/>
                        {filterText && (
                            <InputGroupAddon align="inline-end">
                                <X className='hover:text-accent cursor-pointer' onClick={handleRemoveFilterText}/>
                            </InputGroupAddon>
                        )}

                    </InputGroup>
                </div>
                <div className='sm:w-1/4 w-full flex gap-2'>
                    <Field className="w-fit">
                        <Select value={categoryFilter || "ALL"} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Категорија..."/>
                            </SelectTrigger>
                            <SelectContent position="popper" className='bg-card'>
                                <SelectItem value="ALL">Сите</SelectItem>
                                <SelectItem value="RENT">Издавање</SelectItem>
                                <SelectItem value="SELL">Продажба</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
              </div>
              {/*<div className="flex gap-4 items-center pr-8">*/}
              {/*  <h3>Сортрај</h3>*/}
                <Field className="w-fit pr-8">
                  <Select value={sortValue} onValueChange={handleSortPosts}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..."/>
                    </SelectTrigger>
                    <SelectContent position="popper" className=' bg-card'>
                      <SelectItem value="priceMKD ASC">Цена <ArrowUp/> </SelectItem>
                      <SelectItem value="priceMKD DESC">Цена <ArrowDown/> </SelectItem>
                      <SelectItem value="createdDate ASC">Креирано на<ArrowUp/></SelectItem>
                      <SelectItem value="createdDate DESC">Креирано на<ArrowDown/></SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              {/*</div>*/}
            </div>
    )
}