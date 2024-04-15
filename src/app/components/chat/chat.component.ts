import { Component, ElementRef, InputSignal, inject, input, output } from '@angular/core';
import { ChatMessage } from '../../message.interface';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {

  messages = input.required<ChatMessage[]>();
  myId = input.required<string>();
  contactId = input.required<string>();
  messageDeleted = output<string>();

  elRef = inject(ElementRef);
  get scrollContainer() {
    return this.elRef.nativeElement;
  }

  deleteMessage(messageId: string) {

    const resp = confirm('Do you want to delete this message?');
    if (!resp) {
      return;
    }

    this.messageDeleted.emit(messageId);
  }
}
