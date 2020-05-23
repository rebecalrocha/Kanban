import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

    getMessages(){
        return JSON.parse(sessionStorage.getItem('messages')) || [];
    }

    createMessage(type, message){
        let messages = this.getMessages();
        messages.push({type: type, text: message});
        sessionStorage.setItem('messages', JSON.stringify(messages));

    }

    removeMessage(index) {
        let messages = this.getMessages();
        messages.splice(index, 1);
        sessionStorage.setItem('messages', JSON.stringify(messages)); 
    }

}