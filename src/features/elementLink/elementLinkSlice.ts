import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewElementLink, deleteElementLink, getElementLinks, updateElementLink } from "./elementLinksAPI";
import { ElementFormStateType } from "../../components/Forms/Element/ElementForm";
import { store } from "../../redux/store";
import { ElementLinkFormStateType } from "../../components/Forms/Element/ElementLinkForm";


interface ElementLinkInitialStateType  {
    loading: boolean;
    error: boolean;
    elementLinks: ElementLinkFormStateType[] | [];
    selectedElementLink: ElementLinkFormStateType | null;
}



export const GetElementLinksThunk = createAsyncThunk("elementLinks/getAll", async ()=> {
    const { elements } = store.getState();
    const selectedElementID = elements?.selectedElement?.id;
    const links = selectedElementID && await getElementLinks(selectedElementID);
    console.log({ link:  links.data.content})
    return links.data.content;
});

export const CreateElementLinkThunk = createAsyncThunk("elementLinks/create", async (data: ElementFormStateType)=> {
    const { elements } = store.getState();
    const selectedElementID = elements?.selectedElement?.id;
    const newElementLink = selectedElementID && await createNewElementLink(selectedElementID, data);
    console.log({newElementLink});
    return newElementLink;
});

export const UpdateElementLinkThunk = createAsyncThunk("elementLinks/update", async (data: ElementFormStateType)=> {
    const { elements } = store.getState();
    const selectedElementID = elements?.selectedElement?.id;
    
    const updatedElement = selectedElementID && await updateElementLink(selectedElementID, data);
    console.log({updatedElement});
    return updatedElement;
});

export const DeleteElementLinkThunk = createAsyncThunk("elementLinks/delete", async ()=> {
    const { elements, elementLinks } = store.getState();
    const selectedElementLinkID = elementLinks.selectedElementLink?.id;
    const selectedElementID = elements?.selectedElement?.id;

    const deletedElement = selectedElementID && selectedElementLinkID && await deleteElementLink(selectedElementID, selectedElementLinkID);
    console.log({deletedElement});
    return deletedElement;
});

const initialState: ElementLinkInitialStateType = {
    loading: false,
    error: false,
    elementLinks: [],
    selectedElementLink: null,
};

const reducers = {
    setSelectedElementLink: (state: any, action: PayloadAction<ElementFormStateType | null>) => {
        return { ...state, selectedElementLink: action.payload };
    }
};

const elementLinkSlice = createSlice({
    name: "elementLinks",
    initialState,
    reducers,

    extraReducers(builder) {
        builder
            .addCase(GetElementLinksThunk.pending, (state)=> {
                return { ...state, loading: true, error: false, }
            })
            .addCase(GetElementLinksThunk.fulfilled, (state, action)=> {
                return { ...state, error: false, loading: false, elementLinks: action.payload  }
            })
            .addCase(GetElementLinksThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
        builder
            .addCase(CreateElementLinkThunk.pending, (state)=> {
                return { ...state, loading: true, error: false }
            })
            .addCase(CreateElementLinkThunk.fulfilled, (state)=> {
                return { ...state, error: false, loading: false }
            })
            .addCase(CreateElementLinkThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
        builder
            .addCase(UpdateElementLinkThunk.pending, (state)=> {
                return { ...state, loading: true, error: false }
            })
            .addCase(UpdateElementLinkThunk.fulfilled, (state)=> {
                return { ...state, error: false, loading: false }
            })
            .addCase(UpdateElementLinkThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
        builder
            .addCase(DeleteElementLinkThunk.pending, (state)=> {
                return { ...state, loading: true, error: false, }
            })
            .addCase(DeleteElementLinkThunk.fulfilled, (state)=> {
                return { ...state, error: false, loading: false }
            })
            .addCase(DeleteElementLinkThunk.rejected, (state)=> {
                return { ...state, error: true, loading: false }
            });
    },
});

export const { setSelectedElementLink } = elementLinkSlice.actions;

export default elementLinkSlice.reducer;