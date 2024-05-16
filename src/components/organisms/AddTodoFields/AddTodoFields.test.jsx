import { beforeEach, describe, test, vi } from "vitest";
import {screen, render} from '../../../models/utils/test-utils';
import CONSTANTS from "../../../models/utils/CONSTANTS";
import AddTodoFields from "./AddTodoFields";
import dayjs from "dayjs";
import { TodoProvider, useTodos } from "../../../contexts/TodoContext";


describe('AddTodoFields tests', () => {
    vi.mock('../../../contexts/TodoContext', async (importOriginal) => {
        const actual = await importOriginal();
        return {
            ...actual,
            useTodos: vi.fn(),
        }
});

    test('Form should be initialized empty', async () => {
        const expectedDate = dayjs().format('MM-DD-YYYY h:mm A').replaceAll('-', '/'); // Adjust format if necessary based on your input's requirements

        render(<AddTodoFields />);
      
        // Check if the input field is initialized as empty
        const todoNameInput = screen.getByLabelText(/What are you doing today/i);
        expect(todoNameInput.value).toBe('');
      
        // Check if description is empty if not in modal mode
        const descriptionTextarea = screen.getByPlaceholderText('Enter your description here');
        expect(descriptionTextarea.value).toBe('');
      
        // Check initial state of switches and date pickers if necessary
        const repeatSwitch = screen.getByLabelText('Repeat?');
        expect(repeatSwitch.checked).toBeFalsy();
      
        const replenishSwitch = screen.getByLabelText('Replenish Spoons?');
        expect(replenishSwitch.checked).toBeFalsy();
      
        // Since the date picker uses dayjs, check if it is initialized to the current date
        // This might require a bit more setup or mocking depending on your needs
        const dateInput = screen.getByLabelText(/Choose date/i);
        expect(dateInput.value).toBe(expectedDate);
        // Cost input from SpoonSelect, depending on implementation, you may need to access differently
        const costDisplay = screen.getAllByTestId(CONSTANTS.ids.spoonSelectSelected); // Assuming it displays the cost
        expect(costDisplay.length).toEqual(1);
    });
      

    test('Modal prop is false, should render full screen', () => {
        // Code to check rendering mode when modal is false
        render(<AddTodoFields modal={true}></AddTodoFields>)
        const todoFields = screen.getByTestId(CONSTANTS.ids.AddTodoFieldsModal);
        expect(todoFields).toBeInTheDocument();
    });

    test('Modal prop is true, should render as a modal', () => {
        // Code to check rendering mode when modal is true
        render(<AddTodoFields modal={false}></AddTodoFields>)
        const todoFields = screen.getByTestId(CONSTANTS.ids.AddTodoFields);
        expect(todoFields).toBeInTheDocument();
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.CREATE}`, () => {
        // Code to check UI elements for CREATE mode
        beforeEach(() => {
            useTodos.mockReturnValue({
              create: vi.fn(),
              update: vi.fn(),
              deleteTodo: vi.fn()
            });
          });
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.DELETE}`, () => {
        // Code to check UI elements for DELETE mode
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.UPDATE}`, () => {
        // Code to check UI elements for UPDATE mode
    });

    test('State with todo provided', () => {
        // Code to verify component state when 'todo' prop is provided
    });

    test('State without todo provided', () => {
        // Code to verify component initializes correctly without 'todo' prop
    });

    test('Handles form submission correctly for create mode', () => {
        // Code to simulate form submission and verify calls to context functions
    });

    test('Button triggers correct action for delete mode', () => {
        // Code to simulate button click and verify navigation/actions
    });

    test('Changes in input fields update the state', () => {
        // Code to input text in fields and check state updates
    });

    test('Switch toggles update the state appropriately', () => {
        // Code to toggle switches and verify state changes
    });

    test('Navigates correctly after certain actions', () => {
        // Code to check if the navigation after operations like delete or create is correct
    });

    test('Renders correctly based on context data', () => {
        // Code to mock context data and verify render output
    });

    test('Error handling works when API calls fail', () => {
        // Code to simulate API failure and check error handling
    });
});

