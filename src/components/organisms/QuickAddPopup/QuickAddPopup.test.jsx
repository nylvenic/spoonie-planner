import { render, screen } from "../../../models/utils/test-utils";
import QuickAddPopup from "./QuickAddPopup";
import CONSTANTS from "../../../models/utils/CONSTANTS";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { vi } from "vitest";

let internalState = true; // Simulating internal state management

const mockSetQuickAddPopup = vi.fn((newState) => {
    internalState = newState; // Update internal state based on function calls
});
const mockModalIsOpened = vi.fn(() => internalState); // Function now returns the current state


vi.mock('../../../contexts/UIContext', async (importOriginal) => {
    const actual = await importOriginal();
    const overrides = {...actual,
    useUIContext: () => ({
        setQuickAddPopup: mockSetQuickAddPopup,
        quickAddPopup: true,
        modalIsOpened: mockModalIsOpened
    })}
    return overrides;
});

describe('QuickAddPopup tests', () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn();
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    });

    test('On initialization the QuickAddPopup should be visible on the screen', () => {
        render(
            <QuickAddPopup />
        );
        const overlay = screen.getByTestId(CONSTANTS.ids.Overlay);
        const fields = screen.getByTestId(CONSTANTS.ids.AddTodoFieldsModal);
        expect(overlay).toBeInTheDocument();
        expect(fields).toBeInTheDocument();
    });
    
    test('If Overlay is clicked, the quickAddPopup from the UIProvider should be false', async () => {        
        render(
            <QuickAddPopup />
        );
        const overlay = screen.getByTestId(CONSTANTS.ids.Overlay);
        await userEvent.click(overlay); // i want internalQuickAddPopup's value to change from true to false here and the component to be rerendered
        expect(mockSetQuickAddPopup).toHaveBeenCalledWith(false);
    });
});
