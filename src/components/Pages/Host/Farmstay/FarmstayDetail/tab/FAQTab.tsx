import { useMemo, useState } from 'react'
import FaqItem from '../ui-segment/FaqItem'
// import { Grid } from '@mui/material';
import { Accordion, Card } from 'react-bootstrap';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Box, Button, Grid } from '@mui/material';
import AddAction from '../../../../../General/Action/ButtonAction/AddAction';
import { Add } from '@mui/icons-material';
import CreateFaqs from '../action/CreateFaqs';


interface FAQTabProps {
    detail?: any,
    loading?: boolean,
    refresh?: () => void
}

function FAQTab({
    detail,
    loading,
    refresh
}: FAQTabProps) {

    const faqs: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.faqs)) return [];
        return detail.faqs;
    }, [detail]);

    // State 
    const [openAddNew, setOpenAddNew] = useState<boolean>(false);


    return (
        <Box minHeight="400px">
            <Grid container spacing={2}>
                {faqs.length < 1
                    ? <Grid item xs={12}>
                        <Card>
                            <Card.Body>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap="1rem"
                                >
                                    <AddAction
                                        label="Thêm câu hỏi"
                                        onClick={() => setOpenAddNew(true)}
                                    />
                                </Box>
                                <i>Chưa có câu hỏi nào</i>
                            </Card.Body>
                        </Card>
                    </Grid>
                    : <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenAddNew(true)}
                            >
                                Thêm câu hỏi
                            </Button>
                        </Box>
                    </Grid>
                }
                {isAvailableArray(faqs)
                    ? <Grid item xs={12}>
                        <Accordion
                            defaultActiveKey={faqs.map((_, i) => i + "")}
                            style={{ overflow: "visible" }}
                            alwaysOpen
                        >
                            {faqs.map((item, index) =>
                                <FaqItem
                                    key={index}
                                    item={item}
                                    eventKey={index + ""}
                                    refresh={refresh}
                                />
                            )}
                        </Accordion>
                    </Grid>
                    : null
                }
            </Grid>

            {openAddNew
                ? <CreateFaqs
                    open={openAddNew}
                    onClose={() => setOpenAddNew(false)}
                    onSuccessCallback={refresh}
                    farmstay={detail}
                />
                : null
            }
        </Box>
    )
}

export default FAQTab