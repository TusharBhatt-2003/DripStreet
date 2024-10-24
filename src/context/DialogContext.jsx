import React, { createContext, useState, useContext } from 'react';

const DialogContext = createContext();

export const useDialog = () => {
    return useContext(DialogContext);
};

export const DialogProvider = ({ children }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const openDialog = (message) => {
        setDialogMessage(message);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setDialogMessage('');
    };

    return (
        <DialogContext.Provider value={{ dialogOpen, dialogMessage, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
};
