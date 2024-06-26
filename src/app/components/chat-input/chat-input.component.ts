import { Component, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../message.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {

  value = model<ChatMessage | null>();
  myId = input.required<string>();
  inputValue = signal<string>('');
  activeUserId =input<string>();

  sendMessage(message: string, $event: Event) {

    $event.preventDefault();

    this.value.set({
      text: message,
      id: uuidv4(),
      userId: this.activeUserId()!,
      createdAt: Date.now(),
    });
    this.inputValue.set('');
  }
}
