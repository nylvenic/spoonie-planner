import { describe } from "vitest";
import CONSTANTS from "../../../models/utils/CONSTANTS";
import { vi } from "vitest";
import { render, screen } from "../../../models/utils/test-utils";
import TaskList from "./TaskList";
import mockTodos from "../../../models/utils/mockData/mockTodos";

const mockFetchTodos = vi.fn();
const mockFetchCompleted = vi.fn();
const mockFetchDeleted = vi.fn();
const mockFetchToday = vi.fn();
let todos = [];
let deleted = [];
let completed = [];
let today = [];

vi.mock('../../../contexts/TodoContext', async (original) => {
    const originalImports = await original();
    return {
        ...originalImports,
        useTodos: () => ({
            todos,
            deleted,
            completed,
            today,
            fetchTodos: mockFetchTodos,
            fetchToday: mockFetchToday,
            fetchCompleted: mockFetchCompleted,
            fetchDeleted: mockFetchDeleted
        })
    }
});

describe('TaskList tests', () => {
    beforeEach(() => {
        // Reset mock functions before each test
        mockFetchTodos.mockClear();
        mockFetchCompleted.mockClear();
        mockFetchDeleted.mockClear();
        mockFetchToday.mockClear();
    });

    afterEach(() => {
        // Reset test data arrays to avoid test leakage
        todos = [];
        deleted = [];
        completed = [];
        today = [];
    });

    test(`Type is ${CONSTANTS.TODO_TYPE.COMPLETED}`, () => {
        completed = mockTodos.slice(0,3);
        render(<TaskList type={CONSTANTS.TODO_TYPE.COMPLETED}></TaskList>)
        const heading = screen.getByRole('heading', {level: 2});
        const todoItems = screen.getAllByTestId('todo-item');
        expect(todoItems.length).toBe(completed.length);
        expect(heading.textContent).toBe('Completed Tasks');
        expect(mockFetchCompleted).toHaveBeenCalled();
    });
    test(`Type is ${CONSTANTS.TODO_TYPE.INBOX}`, () => {
        todos = mockTodos.slice(0,1);
        render(<TaskList type={CONSTANTS.TODO_TYPE.INBOX}></TaskList>)
        const heading = screen.getByRole('heading', {level: 2})
        const todoItems = screen.getAllByTestId('todo-item');
        expect(todoItems.length).toBe(todos.length);
        expect(heading.textContent).toBe('All Tasks');
        expect(mockFetchTodos).toHaveBeenCalled();
    });
    test(`Type is ${CONSTANTS.TODO_TYPE.DELETED}`, () => {
        deleted = mockTodos.slice(0,2);
        render(<TaskList type={CONSTANTS.TODO_TYPE.DELETED}></TaskList>)
        const heading = screen.getByRole('heading', {level: 2})
        const todoItems = screen.getAllByTestId('todo-item');
        expect(todoItems.length).toBe(deleted.length);
        expect(heading.textContent).toBe('Deleted Tasks');
        expect(mockFetchDeleted).toHaveBeenCalled();
    });
    test(`Type is ${CONSTANTS.TODO_TYPE.TODAY}`, () => {
        today = mockTodos.slice(0,4);
        render(<TaskList type={CONSTANTS.TODO_TYPE.TODAY}></TaskList>)
        const heading = screen.getByRole('heading', {level: 2})
        const todoItems = screen.getAllByTestId('todo-item');
        expect(todoItems.length).toBe(today.length);
        expect(heading.textContent).toBe('Today\'s Tasks');
        expect(mockFetchToday).toHaveBeenCalled();
    });
    test(`Empty state for ${CONSTANTS.TODO_TYPE.COMPLETED}`, () => {
        render(<TaskList type={CONSTANTS.TODO_TYPE.COMPLETED} />)
        const message = screen.getByText('Nothing completed yet.');
        expect(message).toBeInTheDocument();
    });
    test(`Empty state for ${CONSTANTS.TODO_TYPE.INBOX}`, () => {
        render(<TaskList type={CONSTANTS.TODO_TYPE.INBOX} />)
        const message = screen.getByText('No tasks yet, feel free to create some.');
        expect(message).toBeInTheDocument();
    });
    test(`Empty state for ${CONSTANTS.TODO_TYPE.DELETED}`, () => {
        render(<TaskList type={CONSTANTS.TODO_TYPE.DELETED} />)
        const message = screen.getByText('No deleted tasks.');
        expect(message).toBeInTheDocument();
    });
    test(`Empty state for ${CONSTANTS.TODO_TYPE.TODAY}`, () => {
        render(<TaskList type={CONSTANTS.TODO_TYPE.TODAY} />)
        const message = screen.getByText('No tasks today.');
        expect(message).toBeInTheDocument();
    });
    
});