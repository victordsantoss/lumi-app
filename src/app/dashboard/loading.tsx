import { Box, Skeleton } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      p: 2,
      width: '100%'
    }}>
      {/* Skeleton para o SummaryCard */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={120}
            sx={{
              borderRadius: 2,
              bgcolor: 'rgba(17, 17, 17, 0.2)'
            }}
          />
        ))}
      </Box>

      {/* Skeleton para os gráficos */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Skeleton
          variant="rectangular"
          width="50%"
          height={400}
          sx={{
            borderRadius: 2,
            bgcolor: 'rgba(17, 17, 17, 0.2)'
          }}
        />
        <Skeleton
          variant="rectangular"
          width="50%"
          height={400}
          sx={{
            borderRadius: 2,
            bgcolor: 'rgba(17, 17, 17, 0.2)'
          }}
        />
      </Box>

      {/* Skeleton para a tabela */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton
          variant="text"
          width="30%"
          height={40}
          sx={{
            bgcolor: 'rgba(17, 17, 17, 0.2)'
          }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{
            borderRadius: 2,
            bgcolor: 'rgba(17, 17, 17, 0.2)'
          }}
        />
      </Box>
    </Box>
  );
} 