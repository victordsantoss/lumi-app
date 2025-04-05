'use client'

import { Close } from '@mui/icons-material'
import { IInputValues } from './filter.types'
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useState } from 'react'

interface AdvancedFilterProps {
  inputValues: IInputValues
  handleInputChange: (field: string, value?: string) => void
  debouncedFiltereText: (query: string, paramName: string) => void
}

export const AdvancedFilter = ({
  inputValues,
  handleInputChange,
  debouncedFiltereText,
}: AdvancedFilterProps) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    inputValues.startDate ? dayjs(inputValues.startDate) : null
  )
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    inputValues.endDate ? dayjs(inputValues.endDate) : null
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} alignItems="center" pt={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Numero da instalação"
            fullWidth
            value={inputValues.installationNumber}
            onChange={(e) => {
              handleInputChange('installationNumber', e.target.value)
              debouncedFiltereText(e.target.value, 'installationNumber')
            }}
            placeholder="Ex: 1231321D"
            sx={(theme) => ({
              '& .MuiOutlinedInput-root': {
                height: 56,
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            })}
            InputProps={{
              endAdornment: inputValues.installationNumber ? (
                <InputAdornment position="end">
                  <Tooltip arrow title="Limpar texto de busca" placement="top">
                    <IconButton
                      onClick={() => {
                        handleInputChange('installationNumber', '')
                        debouncedFiltereText('', 'installationNumber')
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ) : (
                <></>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            label="Data inicial"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue)
              const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : undefined
              handleInputChange('startDate', formattedDate)
              debouncedFiltereText(formattedDate || '', 'startDate')
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: (theme) => ({
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    '& fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }),
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            label="Data final"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue)
              const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : undefined
              handleInputChange('endDate', formattedDate)
              debouncedFiltereText(formattedDate || '', 'endDate')
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: (theme) => ({
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    '& fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }),
              },
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}