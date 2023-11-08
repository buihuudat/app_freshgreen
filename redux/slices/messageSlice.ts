import {createSlice} from '@reduxjs/toolkit';
import {messageActions} from '../../actions/messageActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface SendProps {
  authId: string;
  message: string;
}

interface InitialProp {
  popup: boolean;
  user: any;
  aiChat: {
    from: Array<SendProps>;
    to: Array<SendProps>;
  };
  userChat: Array<{
    fromSelf: boolean;
    message: string;
  }>;
  loading: boolean;
}

const initialState: InitialProp = {
  popup: false,
  user: {
    user: {
      _id: '',
      name: '',
      avatar: '',
    },
    lastMessage: '',
    time: '',
    seen: false,
  },

  aiChat: {
    from: [],
    to: [],
  },

  userChat: [],

  loading: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(messageActions.ask.fulfilled, (state, action) => {
        const fromData = {
          authId: action.meta.arg.userId,
          message: action.meta.arg.message,
        };
        const toData = {
          authId: action.payload.authId,
          message: action.payload.message,
        };

        const updatedChatFrom = [...state.aiChat.from, fromData];
        const updatedChatTo = [...state.aiChat.to, toData];

        // Update the state
        state.aiChat = {
          from: updatedChatFrom,
          to: updatedChatTo,
        };
      })
      .addCase(messageActions.send.fulfilled, (state, action) => {
        state.userChat.push(action.payload);
      })
      .addCase(messageActions.get.fulfilled, (state, action) => {
        state.userChat = action.payload;
      })
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true;
        },
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        action =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
        },
      );
  },
});

export default messageSlice.reducer;
