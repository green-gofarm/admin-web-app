
import { Box, Grid } from '@mui/material';
import CustomizedLeafletMap from './CustomizedLeafletMap';
import SearchLocation from './SearchLocation';

interface CustomizedMapProps {
    selectedPosition: any,
    onSelect: (position: any) => void
}

function CustomizedMap({
    selectedPosition,
    onSelect
}: CustomizedMapProps) {

    return (
        <Box
            position='relative'
            flexDirection='column'
            alignItems='center'
            width="100%"
            height="100%"
            minHeight="600px"
        >
            <Box
                position='absolute'
                left={0}
                top={0}
                width="100%"
                height="100%"
            >
                <CustomizedLeafletMap
                    triggerValue={selectedPosition}
                    onChange={onSelect}
                />
            </Box>
            <Box
                position="absolute"
                top={10}
                left="50%"
                borderRadius='8'
                zIndex={1}
                sx={{
                    transform: "translateX(-50%)"
                }}
            >
                <Grid container justifyContent='space-between'>
                    <Grid item xs={12} md={6}>
                        <SearchLocation
                            onSelect={onSelect}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CustomizedMap;