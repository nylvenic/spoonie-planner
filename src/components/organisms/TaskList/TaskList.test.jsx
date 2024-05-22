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

describe('Empty tasklist tests', () => {
    beforeEach(() => {
        todos = [];
        deleted = [];
        completed = [];
        today = [];
        // Reset mock functions before each test
        mockFetchTodos.mockClear();
        mockFetchCompleted.mockClear();
        mockFetchDeleted.mockClear();
        mockFetchToday.mockClear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    for(const type in CONSTANTS.TODO_TYPE) {
        const msg = {
            [CONSTANTS.TODO_TYPE.INBOX]: 'No tasks yet, feel free to create some.',
            [CONSTANTS.TODO_TYPE.TODAY]: 'No tasks today.',
            [CONSTANTS.TODO_TYPE.COMPLETED]: 'Nothing completed yet.',
            [CONSTANTS.TODO_TYPE.DELETED]: 'No deleted tasks.'
        }[type];

        test(`Empty state for ${type}`, () => {
            render(<TaskList type={type} />)
            const message = screen.getByText(msg);
            expect(message).toBeInTheDocument();
        });
    }
});

describe('Populated tasklist tests', () => {
    todos = mockTodos.slice(0,1);
    deleted = mockTodos.slice(0,2);
    completed = mockTodos.slice(0,3);
    today = mockTodos.slice(0,4);
    
    beforeEach(() => {
        todos = mockTodos.slice(0,1);
        deleted = mockTodos.slice(0,2);
        completed = mockTodos.slice(0,3);
        today = mockTodos.slice(0,4);
    });

    afterEach(() => {
        todos = [];
        deleted = [];
        completed = [];
        today = [];
        vi.restoreAllMocks();
    });

    for(const type in CONSTANTS.TODO_TYPE) {
        const title = {
            [CONSTANTS.TODO_TYPE.INBOX]: 'All Tasks',
            [CONSTANTS.TODO_TYPE.COMPLETED]: 'Completed Tasks',
            [CONSTANTS.TODO_TYPE.DELETED]: 'Deleted Tasks',
            [CONSTANTS.TODO_TYPE.TODAY]: "Today's Tasks"
        }[type];

        const src = {
            [CONSTANTS.TODO_TYPE.INBOX]: todos,
            [CONSTANTS.TODO_TYPE.COMPLETED]: completed,
            [CONSTANTS.TODO_TYPE.DELETED]: deleted,
            [CONSTANTS.TODO_TYPE.TODAY]: today
        }[type];

        console.log(src);

        const toCall = {
            [CONSTANTS.TODO_TYPE.INBOX]: mockFetchTodos,
            [CONSTANTS.TODO_TYPE.COMPLETED]: mockFetchCompleted,
            [CONSTANTS.TODO_TYPE.DELETED]: mockFetchDeleted,
            [CONSTANTS.TODO_TYPE.TODAY]: mockFetchToday
        }[type];

        test(`Type is ${type}`, () => {
            render(<TaskList type={type}></TaskList>)
            const heading = screen.getByRole('heading', {level: 2});
            const todoItems = screen.getAllByTestId('todo-item');
            console.log(todoItems.length);
            console.log(src.length);
            expect(todoItems.length).toBe(src.length);
            expect(heading.textContent).toBe(title);
            expect(toCall).toHaveBeenCalled();
        });
    }
})