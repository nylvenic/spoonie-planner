import CONSTANTS from "../utils/CONSTANTS";
import Cookies from "js-cookie";
class TodoListManager {
    async alterCompleteStatus({userId, id, newStatus}) {
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/${id}/complete`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newStatus
            })
        });
        return response;
    }

    async alterDeletedStatus({id, newStatus, userId}) {
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/${id}/markForDeletion`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newStatus
            })
        });
        return response;
    }

    async getById({id, userId}) { // changed the parameters
        console.log(userId);
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`
            }
        });
        return response;
    }

    async deleteTodo({id, userId}) { // changed the parameters format
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`
            }
        });
        return response;
    }

    async getAll({status, userId}) { // changed the parameters format
        let statusString='';
        if(status == 'deleted') {
            statusString = '?status=deleted';
        } else if(status == 'completed') {
            statusString = '?status=completed';
        } else if(status =='today') {
            statusString = '?status=today';
        }

        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos${statusString}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`
            }
        });
        const {todos} = await response.json(); 
        return todos;
    }

    async createTodo({todo, userId}) { // changed the parameters format
        console.log('TODO IN CREATE', todo);
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        return response;
    }

    async setRemindedState({id, reminders, userId}) {
        console.log('SET REMINDED STATE', reminders);
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/${id}/set-reminded-state`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reminders})
        });
        return response;
    }

    async updateTodo({data, id, userId}) {
        const response = await fetch(`${CONSTANTS.backend_url}/users/${userId}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response;
    }
}

export default new TodoListManager();