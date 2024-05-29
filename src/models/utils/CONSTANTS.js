export default {
    backend_url: "http://api.spoonietodo.com",
    msgBoxTimer: 3000,
    redirectTimer: 2000,
    notificationTimer: 30000,
    notificationLeeway: 30000 * 2,
    EDIT_MODE: {
        UPDATE: 'UPDATE',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
    },
    TODO_TYPE: {
        COMPLETED: 'COMPLETED',
        TODAY: 'TODAY',
        DELETED: 'DELETED',
        INBOX: 'INBOX',
    },
    ids: {
        AddTodoFields: 'add-todo-fields',
        AddTodoFieldsModal: 'add-todo-fields-modal',
        Overlay: 'overlay',
        QuickAddButton: 'quick-add-button',
        SpoonMeterPoint: 'point',
        SpoonMeterUsed: 'used',
        spoonSelectSelected: 'spoon-select-selected',
    }
}