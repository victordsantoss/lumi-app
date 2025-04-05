import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IInputValues } from "./filter.types";
import { debounce } from 'lodash';

export interface IFilterModel {
  inputValues: IInputValues
  setInputValues: (values: IInputValues) => void
  handleInputChange: (field: string, value?: string) => void
  debouncedFiltereText: (query: string, paramName: string) => void
  filterIsOpen: boolean
  setFilterIsOpen: (isOpen: boolean) => void
  clearAllFilters: () => void
  chips: Array<{ key: string; value: string }>
  handleDeleteFilter: (field: string) => void
}


export const useFilterModel = (): IFilterModel => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [chips, setChips] = useState<Array<{ key: string; value: string }>>([])

  const [inputValues, setInputValues] = useState<IInputValues>({
    customerNumber: searchParams.get('customerNumber') ?? '',
    instalationNumber: searchParams.get('instalationNumber') ?? '',
    startDate: searchParams.get('startDate') ?? '',
    endDate: searchParams.get('endDate') ?? ''
  })


  const handleInputChange = (field: string, value?: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleParamChange = (value: string | null, paramName: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value) {
      params.delete(paramName)
    } else {
      params.set(paramName, value)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const onTextChange = (value: string, paramName: string) => {
    handleParamChange(value || '', paramName)
  }

  const debouncedFiltereText = debounce((query: string, paramName: string) => onTextChange(query, paramName), 500)

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('customerNumber')
    params.delete('instalationNumber')
    params.delete('startDate')
    params.delete('endDate')
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`
    replace(newUrl)
  }

  const handleDeleteFilter = (field: string) => {
    handleInputChange(field, '')
    handleParamChange('', field)
  }

  const getFilteredParams = useCallback(() => {
    const paramsArray = Array.from(searchParams)
    console.log(paramsArray)
    return paramsArray.filter(
      ([key]) =>
        key !== 'limit' &&
        key !== 'page' &&
        key !== 'orderBy' &&
        key !== 'orderDirection',
    )
  }, [searchParams])

  const getFilterChips = useCallback(() => {
    const filteredParams = getFilteredParams()
    const chipsList = filteredParams.map(([key, value]) => ({
      key,
      value: value,
    }))
    setChips(chipsList)
  }, [getFilteredParams])


  useEffect(() => {
    getFilterChips()
  }, [getFilterChips, searchParams])

  return {
    inputValues,
    setInputValues,
    handleInputChange,
    debouncedFiltereText,
    filterIsOpen,
    setFilterIsOpen,
    clearAllFilters,
    chips,
    handleDeleteFilter
  };
};
