import { afterEach, describe, test, vi } from "vitest";
import { render, screen } from "../../../models/utils/test-utils";
import CONSTANTS from "../../../models/utils/CONSTANTS";
import TodoItem from "./TodoItem";
import mockTodos from "../../../models/utils/mockData/mockTodos";
import userEvent from "@testing-library/user-event";
import mockUser from "../../../models/utils/mockData/mockUser";
import mapType from "../../../models/utils/mapType";

let todo = mockTodos[0];
const mockAlterCompleteStatus = vi.fn();
const mockModifySpoons = vi.fn();
const mockNavigate = vi.fn();
const mockUserData = mockUser;

vi.mock("../../../contexts/TodoContext", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useTodos: () => ({
            alterCompleteStatus: mockAlterCompleteStatus
        })
    }
});

vi.mock("../../../contexts/SpoonContext", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useSpoonContext: () => ({
            modifySpoons: mockModifySpoons,
        })
    }
});

vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
});

vi.mock("../../../contexts/AuthContext", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAuth: () => ({
            userData: mockUserData 
        })
    }
});

async function setup(type) {
    let testId = type == CONSTANTS.TODO_TYPE.DELETED ? 'xmark' : 'check';
    render(<TodoItem todo={todo} type={type}></TodoItem>);
    const button = screen.getByTestId(testId);
    await userEvent.click(button);
}

describe('TodoItem test', () => {
    beforeEach(() => {
        todo = mockTodos[0];
        mockAlterCompleteStatus.mockClear();
        mockModifySpoons.mockClear();
        mockNavigate.mockClear();
    });

    test(`Todo type is ${CONSTANTS.TODO_TYPE.COMPLETED} button interaction`, async () => {
        await setup(CONSTANTS.TODO_TYPE.COMPLETED);
        expect(mockAlterCompleteStatus).toHaveBeenCalledWith(expect.objectContaining({
            id:todo.id,
            newStatus: false
        }));
        expect(mockModifySpoons).toHaveBeenCalledWith(expect.objectContaining({
            cost: todo.cost, 
            replenish: !(todo.replenish), 
            maxSpoons: mockUserData.maxSpoons
        }));
    });
    test(`Todo type is ${CONSTANTS.TODO_TYPE.DELETED} button interaction`, async () => {
        await setup(CONSTANTS.TODO_TYPE.DELETED);
        expect(mockAlterCompleteStatus).not.toHaveBeenCalled();
        expect(mockModifySpoons).not.toHaveBeenCalled();
    });
    test(`Todo type is ${CONSTANTS.TODO_TYPE.TODAY} button interaction`, async () => {
        await setup(CONSTANTS.TODO_TYPE.TODAY);
        expect(mockAlterCompleteStatus).toHaveBeenCalledWith(expect.objectContaining({
            id:todo.id,
            newStatus: true
        }));
        expect(mockModifySpoons).toHaveBeenCalledWith(expect.objectContaining({
            cost: todo.cost, 
            replenish: todo.replenish, 
            maxSpoons: mockUserData.maxSpoons
        }));
    });
    test(`Todo type is ${CONSTANTS.TODO_TYPE.INBOX} button interaction`, async () => {
        await setup(CONSTANTS.TODO_TYPE.INBOX);
        expect(mockAlterCompleteStatus).toHaveBeenCalledWith(expect.objectContaining({
            id:todo.id,
            newStatus: true
        }));
        expect(mockModifySpoons).toHaveBeenCalledWith(expect.objectContaining({
            cost: todo.cost, 
            replenish: todo.replenish, 
            maxSpoons: mockUserData.maxSpoons
        }));
    });

    for(let type in CONSTANTS.TODO_TYPE) {
        test(`Todo click navigation test for ${type}`, async () => {
            render(<TodoItem todo={todo} type={type}></TodoItem>);
            const button = screen.getByTestId('todo-item');
            await userEvent.click(button);
            expect(mockNavigate).toHaveBeenCalledWith(`/todos/${todo.id}?page=${mapType(type)}&type=${type}`);
        });
    }

    for(let type in CONSTANTS.TODO_TYPE) {
        if(type !== CONSTANTS.TODO_TYPE.DELETED) {
            test(`Todo button icon is checkmark for ${type}`, () => {
                render(<TodoItem todo={todo} type={type}></TodoItem>);
                const button = screen.getByTestId('check');
                expect(button).toBeInTheDocument();
            });
        }
    }
    test(`Todo button icon is xmark`, () => {
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.DELETED}></TodoItem>);
        const button = screen.getByTestId('xmark');
        expect(button).toBeInTheDocument();
    })
    test(`Todo has replenish indicator`, () => {
        todo.replenish = 1;
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const replenish = screen.getByTestId('Replenish');
        expect(replenish).toBeInTheDocument();
    });
    test(`Todo does not have replenish indicator`, () => {
        todo.replenish = 0;
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const replenish = screen.queryByTestId('Replenish');
        expect(replenish).not.toBeInTheDocument();
    });
    test(`Todo repeat indicator`, () => {
        todo.repeat = 1;
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const repeatIcon = screen.getByTestId('Repeats');
        expect(repeatIcon).toBeInTheDocument();
    });
    test(`Todo without repeat indicator`, () => {
        todo.repeat = 0;
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const repeatIcon = screen.queryByTestId('Repeats');
        expect(repeatIcon).not.toBeInTheDocument();
    });
    test(`Test todo cost icon`, () => {
        todo.cost = 3;
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const spoons = screen.getAllByTestId('spoon');
        expect(spoons.length).toBe(3);
    });
    test(`Test todo cost greater than 3`, () => {
        todo.cost = 4;
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const text = screen.getByTestId('greater-than-3');
        expect(text).toBeInTheDocument();
    });
    test(`Todo text is displayed`, () => {
        todo.text = 'This is a test string';
        render(<TodoItem todo={todo} type={CONSTANTS.TODO_TYPE.TODAY}></TodoItem>);
        const text = screen.getByText(todo.text);
        expect(text).toBeInTheDocument();
    });
});