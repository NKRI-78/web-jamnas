import { fetchClubList } from '@lib/clubService';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchClubListAsync = createAsyncThunk('club/list',
  async () => {
    const response = await fetchClubList();
    return response;
  }
);

interface ClubState {
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  clubs: [],
  isLoading: false,
  error: null,
};

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Club[]>) {
      state.clubs = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClubListAsync.fulfilled, (state, action) => {
      state.clubs = action.payload;
    });
  },
});

export const { setUsers, setIsLoading, setError } = clubSlice.actions;
export default clubSlice.reducer;