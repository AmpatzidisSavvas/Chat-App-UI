import { ChangeDetectionStrategy, ChangeDetectorRef, Component, afterNextRender, effect, inject, signal, viewChild } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { ChatInputComponent } from '../components/chat-input/chat-input.component';
import { ChatMessage } from '../message.interface';
import { v4 as uuid4} from 'uuid';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [ChatComponent, ChatInputComponent, CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {

  myId = uuid4();
  contactId = uuid4();
  activatedUser: string ='';
  chatComponent = viewChild.required(ChatComponent);
  newMessage = signal<ChatMessage | null>(null);
  cdRef = inject(ChangeDetectorRef);
  newMessageChange = effect(() => {
    console.log('newMessage change', this.newMessage());
    if (!this.newMessage()) {
      return;
    }
    this.messages.update((messages) => [...messages, this.newMessage()! ]);
    this.cdRef.detectChanges();
    this.scrollToChatToBottom();
    this.newMessage.set(null);
  }, {
    allowSignalWrites: true
  });


  messages = signal<ChatMessage[]>([
    {
      text: 'Hey',
      userId: this.myId,
      id: uuid4()
    },
    {
      text: 'How are you doing;',
      userId: this.contactId,
      id: uuid4()
    },
    {
      text: 'Nice',
      userId: this.myId,
      id: uuid4()
    }
  ])

  constructor() {
    afterNextRender(() => {       // When refresh the page, Chat scroll to the bottom 
      this.scrollToChatToBottom();
    })
  }

  changeActiveUser(userId: string) {
    this.activatedUser = userId;
    
    console.log('Change at ',this.activatedUser )
  }

  scrollToChatToBottom() {
    const el = this.chatComponent().scrollContainer as HTMLElement;

    el.scrollTo({
      top: el.scrollHeight
    })
  }

  removeMessage(messageId: string) {
    this.messages.update((messages) =>
      messages.filter((msg) => msg.id !== messageId)
    );
  }
}

