import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import useProductVariant from "../../../api/hooks/useProductVariant.ts";


const DeleteVariantDialog = ({open,close,onSuccess,productId,variantId}) => {
    const {deleteVariantById} = useProductVariant(productId);
    const handleSubmit=async ()=>{
        await deleteVariantById(variantId);
        onSuccess();
        close();
    }
    return(
        <Dialog open={open} onClose={close}>
            <DialogTitle>Delete Variant</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure ? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={handleSubmit} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

    )
}
export default DeleteVariantDialog;