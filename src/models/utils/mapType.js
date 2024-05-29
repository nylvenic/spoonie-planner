import CONSTANTS from "./CONSTANTS";
export default function mapType(type) {
    let editMode;
    switch(type) {
        case CONSTANTS.TODO_TYPE.COMPLETED: {
            editMode = CONSTANTS.EDIT_MODE.COMPLETE;
            break;
        }
        case CONSTANTS.TODO_TYPE.DELETED: {
            editMode = CONSTANTS.EDIT_MODE.DELETE;
            break;
        }
        case CONSTANTS.TODO_TYPE.INBOX: {
            editMode = CONSTANTS.EDIT_MODE.UPDATE;
            break;
        }
        case CONSTANTS.TODO_TYPE.TODAY: {
            editMode = CONSTANTS.EDIT_MODE.UPDATE;
            break;
        }
    }
    return editMode;
}