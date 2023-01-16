import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const PageLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
