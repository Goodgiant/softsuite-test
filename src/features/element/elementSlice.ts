import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewElement, deleteElement, getElements, updateElement } from "./elementAPI";
import { ElementFormStateType } from "../../components/Forms/Element/ElementForm";
import { store } from "../../redux/store";


interface ElementInitialStateType  {
    loading: boolean;
    error: boolean;
    elements: ElementFormStateType[] | [];
    selectedElement: ElementFormStateType | null;
}


export const GetElementsThunk = createAsyncThunk("elements/getAll", async ()=> {
    const elements = await getElements();
    return elements.data.content;
});

export const CreateElementThunk = createAsyncThunk("elements/create", async (data: ElementFormStateType )=> {
    const newElement = await createNewElement(data);
    return newElement;
});

export const UpdateElementThunk = createAsyncThunk("elements/update", async (data: ElementFormStateType )=> {
    const updatedElement = await updateElement(data);
    return updatedElement;
});

export const DeleteElementThunk = createAsyncThunk("elements/delete", async ()=> {
    const { elements } = store.getState();
    const deletedElement = elements.selectedElement?.id && await deleteElement(elements.selectedElement?.id);
    return deletedElement;
});

const initialState: ElementInitialStateType = {
    loading: false,
    error: false,
    elements: [],
    selectedElement: null,
};

const reducers = {
    setSelectedElement: (state: any, action: PayloadAction<ElementFormStateType | null>) => {
        sessionStorage.setItem('selectedElement', JSON.stringify(action.payload));
        return { ...state, selectedElement: action.payload };
    }
};

const elementSlice = createSlice({
    name: "elements",
    initialState,
    reducers,

    extraReducers(builder) {
        builder
            .addCase(GetElementsThunk.pending, (state)=> {
                return { ...state, loading: true, error: false, }
            })
            .addCase(GetElementsThunk.fulfilled, (state, action)=> {
                return { ...state, error: false, loading: false, elements: action.payload  }
            })
            .addCase(GetElementsThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
        builder
            .addCase(CreateElementThunk.pending, (state)=> {
                return { ...state, loading: true, error: false }
            })
            .addCase(CreateElementThunk.fulfilled, (state)=> {
                return { ...state, error: false, loading: false }
            })
            .addCase(CreateElementThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
        builder
            .addCase(UpdateElementThunk.pending, (state)=> {
                return { ...state, loading: true, error: false }
            })
            .addCase(UpdateElementThunk.fulfilled, (state)=> {
                return { ...state, error: false, loading: false }
            })
            .addCase(UpdateElementThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
        builder
            .addCase(DeleteElementThunk.pending, (state)=> {
                return { ...state, loading: true, error: false, }
            })
            .addCase(DeleteElementThunk.fulfilled, (state)=> {
                return { ...state, error: false, loading: false }
            })
            .addCase(DeleteElementThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
    },
});

export const { setSelectedElement } = elementSlice.actions;

export default elementSlice.reducer;