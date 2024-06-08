import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

export default function BottomSheetComponent({ open, setOpen, children }) {
    const handleDismiss = () => {
        setOpen(false);
    };
    return (
        <>
            <BottomSheet
                open={open}
                snapPoints={({ minHeight, maxHeight }) => [
                    maxHeight * 0.7,
                    maxHeight * 0.7,
                ]}
                onDismiss={handleDismiss}
            >
                {children}
            </BottomSheet>
        </>
    );
}
