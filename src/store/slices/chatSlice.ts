import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import type { ChatRoom, Message } from '../../types';

interface ChatState {
  chatRooms: ChatRoom[];
  currentChatRoom: ChatRoom | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chatRooms: [],
  currentChatRoom: null,
  messages: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const getChatRooms = createAsyncThunk(
  'chat/getChatRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getChatRooms();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get chat rooms');
    }
  }
);

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (chatRoomId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getMessages(chatRoomId);
      return { chatRoomId, messages: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatRoomId, content }: { chatRoomId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.sendMessage(chatRoomId, content);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChatRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.currentChatRoom = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateChatRoom: (state, action: PayloadAction<ChatRoom>) => {
      const index = state.chatRooms.findIndex(room => room.id === action.payload.id);
      if (index !== -1) {
        state.chatRooms[index] = action.payload;
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Chat Rooms
      .addCase(getChatRooms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRooms = action.payload;
        state.error = null;
      })
      .addCase(getChatRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get Messages
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.messages;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { 
  setCurrentChatRoom, 
  addMessage, 
  updateChatRoom, 
  clearMessages, 
  clearError 
} = chatSlice.actions;
export default chatSlice.reducer;
