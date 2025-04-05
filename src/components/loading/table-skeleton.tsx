import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const baseStyle = {
  borderRadius: 2,
  bgcolor: 'rgba(17, 17, 17, 0.2)'
}

export default function TableSkeleton() {
  const rectangularSkeletons = Array.from({ length: 3 })
  const roundedSkeletons = Array.from({ length: 7 })
  const finalGroup1 = Array.from({ length: 2 })
  const finalGroup2 = Array.from({ length: 3 })

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={300} />

      <Stack justifyContent="end" direction={{ xs: 'row' }}>
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={200} />
      </Stack>

      <Stack direction={{ xs: 'row' }} gap={2}>
        {rectangularSkeletons.map((_, i) => (
          <Skeleton
            key={`rect-${i}`}
            variant="rectangular"
            width="100%"
            height={60}
            sx={baseStyle}
          />
        ))}
      </Stack>

      <Stack gap={1}>
        {roundedSkeletons.map((_, i) => (
          <Skeleton
            key={`round-${i}`}
            variant="rounded"
            width="auto"
            height={60}
            sx={baseStyle}
          />
        ))}
      </Stack>

      <Stack justifyContent="space-between" direction={{ xs: 'row' }}>
        <Stack direction={{ xs: 'row' }} gap={2}>
          {finalGroup1.map((_, i) => (
            <Skeleton
              key={`final1-${i}`}
              variant="text"
              sx={{ fontSize: '2rem', ...baseStyle }}
              width={100}
            />
          ))}
        </Stack>
        <Stack direction={{ xs: 'row' }} gap={2}>
          {finalGroup2.map((_, i) => (
            <Skeleton
              key={`final2-${i}`}
              variant="text"
              sx={{ fontSize: '2rem', ...baseStyle }}
              width={100}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
