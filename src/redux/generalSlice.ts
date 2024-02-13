import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnyObject } from "yup";
import { getDepartments, getLookups, getSuborganizations } from "./generalAPIs";

type LookupObject = {
    "id": string,
    "name": string,
    "description": string,
    "status": string,
    "lookupId": string,
    "lookupName": string,
    "createdAt": string
}

interface GeneralInitialStateType  {
    loading: boolean;
    error: boolean;
    suborganizations: AnyObject[] | [];
    departments: AnyObject[] | [];
    grades: AnyObject[] | [];
    gradeSteps: AnyObject[] | [];

    lookups: {
        elementCategories?: LookupObject[]
        elementClassifications?: LookupObject[]
        employeeCategories?: LookupObject[]
        employeeTypes?: LookupObject[]
        payRuns?: LookupObject[]
        jobTitles?: LookupObject[]
        locations?: LookupObject[]
        unions?: LookupObject[]
        housings?: LookupObject[]
        wardrobes?: LookupObject[]
        securities?: LookupObject[]
    };
}


 export const GetLookupsThunk = createAsyncThunk("general/lookups", async ()=> {
    const lookups = await getLookups();
    console.log({ lookups });
    return lookups;
});

 export const GetSuborganizatonsThunk = createAsyncThunk("general/suborganizations", async ()=> {
    const suborganizations = await getSuborganizations();
    console.log({ suborganizations });
    return suborganizations;
});

 export const GetDepartmentsThunk = createAsyncThunk("general/departments", async (suborganizationID: string)=> {
    const departments = await getDepartments(suborganizationID);
    console.log({ departments });
    return departments;
});

 export const GetGradesThunk = createAsyncThunk("general/grades", async ()=> {
    const suborganizations = await getSuborganizations();
    console.log({ suborganizations });
    return suborganizations;
});

 export const GetGradeStepsThunk = createAsyncThunk("general/gradesteps", async (gradeID: string)=> {
    const departments = await getDepartments(gradeID);
    console.log({ departments });
    return departments;
});

const initialState: GeneralInitialStateType = {
    loading: false,
    error: false,
    suborganizations: [],
    departments: [],
    grades: [],
    gradeSteps: [],
    lookups: {},
};

const reducers = {};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers,

    extraReducers(builder) {
        builder
            .addCase(GetLookupsThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, lookups: action.payload??{}  }
            })
            .addCase(GetSuborganizatonsThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, suborganizations: action.payload??[]  }
            })
            .addCase(GetDepartmentsThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, departments: action.payload??[]  }
            })
            .addCase(GetGradesThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, grades: action.payload??[]  }
            })
            .addCase(GetGradeStepsThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, gradeSteps: action.payload??[]  }
            })
    },
});

export default generalSlice.reducer;