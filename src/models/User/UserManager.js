import CONSTANTS from "../utils/CONSTANTS";
import Cookies from "js-cookie";
class User {
    static async login({username, password}) {
        const response = await fetch(`${CONSTANTS.backend_url}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        });
        const {token, msg, success} = await response.json();
        return {
            token,
            msg,
            success
        }
    }

    static async signup({username, password, email}) {
        const response = await fetch(`${CONSTANTS.backend_url}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        });
        const {msg, success} = await response.json();

        return {msg, success};
    }

    static async changeSpoons({id, cost, replenish, maxSpoons}) {
        const res = await fetch(`${CONSTANTS.backend_url}/users/${id}/spoons`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cost, 
                    replenish, 
                    maxSpoons
                })
            }
        );
        const data = await res.json();
        return data;
    }

    static async changeNickname({id, newNickname}) {
        const res = await fetch(`${CONSTANTS.backend_url}/users/${id}/nickname`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newNickname
            })
        })
        const data = await res.json();
        return data;
    }

    static async changeMaxSpoons({id, newMaxSpoons}) {
        const res = await fetch(`${CONSTANTS.backend_url}/users/${id}/max-spoons`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newMaxSpoons
            })
        })
        const data = await res.json();
        return data;
    }

    static async changePassword({id, newPassword, oldPassword}) {
        const res = await fetch(`${CONSTANTS.backend_url}/users/${id}/password`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPassword,
                oldPassword
            })
        })
        const data = await res.json();
        return data;
    }

    static async changeReminders({id, reminders}) {
        const res = await fetch(`${CONSTANTS.backend_url}/users/${id}/browser-reminder`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reminders
            })
        })
        const data = await res.json();
        return data;
    }

    static async changeAvatar({id, file}) {
        const formData = new FormData();
        formData.append('file', file); // 'avatar' is the field name you'll access on the server
        const res = await fetch(`${CONSTANTS.backend_url}/users/${id}/avatar`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: formData
        })
        const data = await res.json();
        return data;
    }
}

export default User;