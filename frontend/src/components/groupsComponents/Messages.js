import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MessageSection = () => {
  const currentUser = {
    id: 1,
    name: 'Current User',
    avatarUrl: 'https://via.placeholder.com/50',
  };

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Make an Axios request to fetch messages from the server
    axios.get('http://localhost:3001/comment/55', { withCredentials: true })
      .then((res) => {
        // Assuming the response data is an array of messages
        setMessages(res.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts


  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObject = {
        id: messages.length + 1,
        sender: currentUser.name,
        text: newMessage,
      };

      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <MessageContainer>
      <MessageAmount>
        <Section>Messages</Section>
        <Number>{messages.length}</Number>
      </MessageAmount>
      <MessagesContainer>
        {messages.map(({ id, sender, text }) => (
          <Message key={id}>
            <AvatarContainer>
              {sender !== currentUser.name && (
                <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
              )}
            </AvatarContainer>
            <MessageContent>
              <Sender>{sender}</Sender>
              <MessageText>{text}</MessageText>
            </MessageContent>
          </Message>
        ))}
        <SendMessageContainer>
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </SendMessageContainer>
      </MessagesContainer>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  margin: 10px;
  width: 420px;
  height: 681px;
`;

const MessagesContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: auto;
  padding: 10px;
  height: 80%;
`;

const Message = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const AvatarContainer = styled.div`
  margin-right: 10px;
`;

const MessageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Sender = styled.h3`
  margin: 0;
`;

const MessageText = styled.p`
  white-space: pre-line;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
`;

const SendMessageContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #ddd;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Section = styled.h2`
  margin: 0 0 10px;
`;

const MessageAmount = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.h3`
  margin-left: 1rem;
  padding: 0.5rem;
  border: 1px solid grey;
  background: grey;
  border-radius: 20px;
  display: inline-block;
`;

const Avatar = styled.img`
  border-radius: 50%;
`;

export default MessageSection;