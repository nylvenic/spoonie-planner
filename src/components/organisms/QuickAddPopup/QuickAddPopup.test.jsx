import { render, screen } from "../../../models/utils/test-utils";
import QuickAddPopup from "./QuickAddPopup";
import CONSTANTS from "../../../models/utils/CONSTANTS";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { vi } from "vitest";

describe('QuickAddPopup tests', () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn();
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    });

    const uiProviderProps = {
        initialQuickAddPopup: true,
        customSetQuickAddPopup: vi.fn(() => false),
        customModalIsOpened: vi.fn(() => true), // Ensure modalIsOpened returns true for the tests
    };

    test('On initialization the QuickAddPopup should be visible on the screen', () => {
        render(
            <QuickAddPopup />, { providerProps: { uiProviderProps } }
        );
        const overlay = screen.getByTestId(CONSTANTS.ids.Overlay);
        const fields = screen.getByTestId(CONSTANTS.ids.AddTodoFields);
        expect(overlay).toBeInTheDocument();
        expect(fields).toBeInTheDocument();
    });
    
    test('If Overlay is clicked, the quickAddPopup from the UIProvider should be false', async () => {        
        render(
            <QuickAddPopup />, { providerProps: { uiProviderProps } }
        );
        const overlay = screen.getByTestId(CONSTANTS.ids.Overlay);
        await userEvent.click(overlay); // i want internalQuickAddPopup's value to change from true to false here and the component to be rerendered
        expect(uiProviderProps.customSetQuickAddPopup).toHaveBeenCalledWith(false);
    });
});
