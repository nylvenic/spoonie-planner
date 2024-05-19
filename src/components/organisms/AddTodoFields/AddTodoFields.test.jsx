import { beforeEach, describe, test, vi } from "vitest";
import {screen, render} from '../../../models/utils/test-utils';
import CONSTANTS from "../../../models/utils/CONSTANTS";
import AddTodoFields from "./AddTodoFields";
import dayjs from "dayjs";
import { useTodos } from "../../../contexts/TodoContext";
import userEvent from "@testing-library/user-event";


const createMock = vi.fn();
const deleteMock = vi.fn();
const permanentlyDeleteMock = vi.fn();
const updateMock = vi.fn();
const navigateMock = vi.fn();

vi.mock('../../../contexts/TodoContext', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useTodos: () => ({
            create: createMock,
            alterDeletedStatus: deleteMock,
            update: updateMock,
            deleteTodo: permanentlyDeleteMock
        }),
    };
});

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => navigateMock
    };
});


describe('AddTodoFields tests', () => {
    const todoData = { text: 'My test todo', date: +(new Date()), cost: 2, repeat: false, replenish: false, description: '', id: 2 };
    const expectedDate = dayjs().format('MM-DD-YYYY hh:mm A').replaceAll('-', '/');
    test('Form should be initialized empty', async () => {
        render(<AddTodoFields />);
      
        // Check if the input field is initialized as empty
        const todoNameInput = screen.getByLabelText(/What are you doing today/i);
        expect(todoNameInput.value).toBe('');
      
        // Check if description is empty if not in modal mode
        const descriptionTextarea = screen.getByPlaceholderText('Enter your description here');
        expect(descriptionTextarea.value).toBe('');
      
        // Check initial state of switches and date pickers if necessary
        const repeatSwitch = screen.getByRole('checkbox', {name: /repeat/i});
        expect(repeatSwitch.checked).toBeFalsy();
      
        const replenishSwitch = screen.getByLabelText('Replenish spoons?');
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

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.CREATE}`, async () => {
        render(<AddTodoFields mode={CONSTANTS.EDIT_MODE.CREATE} modal={true} todo={todoData} />);
        const submitButton = screen.getByRole('button', { name: 'Create Todo' });
        const deleteButton = screen.queryByRole('button', { name: 'Delete Todo' });
        await userEvent.click(submitButton);
        expect(submitButton).toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();
        expect(createMock).toHaveBeenCalled(); // throws an error
        expect(createMock).toHaveBeenCalledWith(expect.objectContaining({
            text: 'My test todo',
            cost: 2,
            repeat: false,
            replenish: false,
            description: ''
        })); // throws an error
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.DELETE} type is ${CONSTANTS.TODO_TYPE.TODAY}`, async () => {
        // Code to check UI elements for DELETE mode
        render(<AddTodoFields todo={todoData} type={CONSTANTS.TODO_TYPE.TODAY} mode={CONSTANTS.EDIT_MODE.DELETE}></AddTodoFields>)
        const submitButton = screen.getByRole('button', { name: 'Restore' });
        await userEvent.click(submitButton);
        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith(`/today/${todoData.id}`);
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.DELETE} type is ${CONSTANTS.TODO_TYPE.INBOX}`, async () => {
        // Code to check UI elements for DELETE mode
        render(<AddTodoFields todo={todoData} type={CONSTANTS.TODO_TYPE.INBOX} mode={CONSTANTS.EDIT_MODE.DELETE}></AddTodoFields>)
        const submitButton = screen.getByRole('button', { name: 'Restore' });
        await userEvent.click(submitButton);
        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith(`/inbox/${todoData.id}`);
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.DELETE} type is ${CONSTANTS.TODO_TYPE.COMPLETED}`, async () => {
        // Code to check UI elements for DELETE mode
        render(<AddTodoFields todo={todoData} type={CONSTANTS.TODO_TYPE.COMPLETED} mode={CONSTANTS.EDIT_MODE.DELETE}></AddTodoFields>)
        const submitButton = screen.getByRole('button', { name: 'Restore' });
        await userEvent.click(submitButton);
        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith(`/`);
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.DELETE} `, async () => {
        // Code to check UI elements for DELETE mode
        render(<AddTodoFields todo={todoData} mode={CONSTANTS.EDIT_MODE.DELETE}></AddTodoFields>)
        const deleteButton = screen.getByRole('button', { name: 'Permanently Delete' });
        const submitButton = screen.getByRole('button', { name: 'Restore' });
        await userEvent.click(deleteButton);
        await userEvent.click(submitButton);
        expect(permanentlyDeleteMock).toHaveBeenCalled();
        expect(permanentlyDeleteMock).toHaveBeenCalledWith(todoData.id);
        expect(deleteMock).toHaveBeenCalled();
        expect(deleteMock).toHaveBeenCalledWith({id: todoData.id, newStatus: false});
        expect(submitButton).toBeInTheDocument();
    });

    test(`Edit mode is ${CONSTANTS.EDIT_MODE.UPDATE}`, async () => {
        render(<AddTodoFields todo={todoData} mode={CONSTANTS.EDIT_MODE.UPDATE}></AddTodoFields>)
        const submitButton = screen.getByRole('button', { name: 'Update Todo' });
        const deleteButton = screen.getByRole('button', { name: 'Delete Button' });
        await userEvent.click(submitButton);
        await userEvent.click(deleteButton);
        const clone = {...todoData, date: new Date(todoData.date)};
        delete clone.id;
        expect(deleteMock).toHaveBeenCalled();
        expect(updateMock).toHaveBeenCalled();
        expect(deleteMock).toHaveBeenCalledWith(expect.objectContaining({
            id: todoData.id,
            newStatus: true,
        }));
        expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({
            data: clone, 
            id: todoData.id
        }));
    });

    test('State with todo provided', () => {
        // Code to verify component state when 'todo' prop is provided
        render(<AddTodoFields todo={todoData} mode={CONSTANTS.EDIT_MODE.UPDATE}></AddTodoFields>)
        const textField = screen.getByRole('textbox', {name: /what are you doing today/i});
        const repeatToggle = screen.getByRole('checkbox', {name: /repeat/i});
        const replenishSpoons = screen.getByRole('checkbox', {name: /replenish/i});
        const description = screen.getByRole('textbox', {name: /description/i});
        const dateInput = screen.getByLabelText(/Choose date/i);
        const spoonCost = screen.getByRole('textbox', {name: /Selected cost/i, hidden: true});
        // Using .checked for checkboxes and .value for text inputs
        expect(textField.value).toBe(todoData.text);
        expect(repeatToggle.checked).toBe(todoData.repeat); // Assuming repeat is a boolean
        expect(replenishSpoons.checked).toBe(todoData.replenish); // Assuming replenish is a boolean
        expect(description.value).toBe(todoData.description);
        expect(dateInput.value).toBe(expectedDate);
        expect(spoonCost.value).toBe((todoData.cost-1).toString());
    });

    test('Modal without todo provided', () => {
        // Code to verify component initializes correctly without 'todo' prop
        // Code to verify component state when 'todo' prop is provided
        render(<AddTodoFields mode={CONSTANTS.EDIT_MODE.UPDATE}></AddTodoFields>)
        const textField = screen.getByRole('textbox', {name: /what are you doing today/i});
        const repeatToggle = screen.getByRole('checkbox', {name: /repeat/i});
        const replenishSpoons = screen.getByRole('checkbox', {name: /replenish/i});
        const description = screen.getByRole('textbox', {name: /description/i});
        const dateInput = screen.getByLabelText(/Choose date/i);
        const spoonCost = screen.getByRole('textbox', {name: /Selected cost/i, hidden: true});
        // Using .checked for checkboxes and .value for text inputs
        expect(textField.value).toBe('');
        expect(repeatToggle.checked).toBe(false); // Assuming repeat is a boolean
        expect(replenishSpoons.checked).toBe(false); // Assuming replenish is a boolean
        expect(description.value).toBe('');
        expect(dateInput.value).toBe(expectedDate);
        expect(spoonCost.value).toBe('1');
    });

    test('State without todo provided', () => {
        // Code to verify component initializes correctly without 'todo' prop
        // Code to verify component state when 'todo' prop is provided
        render(<AddTodoFields modal={true} mode={CONSTANTS.EDIT_MODE.UPDATE}></AddTodoFields>)
        const textField = screen.getByRole('textbox', {name: /what are you doing today/i});
        const repeatToggle = screen.getByRole('checkbox', {name: /repeat/i});
        const replenishSpoons = screen.getByRole('checkbox', {name: /replenish/i});
        const dateInput = screen.getByLabelText(/Choose date/i);
        const spoonCost = screen.getByRole('textbox', {name: /Selected cost/i, hidden: true});
        // Using .checked for checkboxes and .value for text inputs
        expect(textField.value).toBe('');
        expect(repeatToggle.checked).toBe(false); // Assuming repeat is a boolean
        expect(replenishSpoons.checked).toBe(false); // Assuming replenish is a boolean
        expect(dateInput.value).toBe(expectedDate);
        expect(spoonCost.value).toBe('1');
    });

    test('Error handling works when API calls fail', () => {
        // Code to simulate API failure and check error handling
    });
});

