import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnyObject } from "yup";
import { getCategories, getDepartments, getElementLinkAdditionalLookups, getElementLookups, getGradeSteps, getGrades, getHousings, getJobTitles, getLocations, getSecurities, getSuborganizations, getTypes, getUnions, getWardrobes } from "./generalAPIs";

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

    elementLookups: {
        elementCategories?: LookupObject[]
        elementClassifications?: LookupObject[]
        payRuns?: LookupObject[]
    };
    linkLookups: {
        employeeCategories?: LookupObject[]
        employeeTypes?: LookupObject[]
        jobTitles?: LookupObject[]
        locations?: LookupObject[]
        unions?: LookupObject[]
        housings?: LookupObject[]
        securities?: LookupObject[]
        wardrobes?: LookupObject[]
    };
    additionalLookups: {
        housings?: LookupObject[]
        wardrobes?: LookupObject[]
        securities?: LookupObject[]
    };
}


export const GetElementLookupsThunk = createAsyncThunk("general/element_lookups", async ()=> {
    const lookups = await getElementLookups();
    return lookups;
});
// export const GetElementLinkLookupsThunk = createAsyncThunk("general/link_lookups", async ()=> {
//     const lookups = [
//         await getJobTitles(), 
//         await getJobTitles(), 
//         await getJobTitles(), 
//         await getJobTitles(), 
//         await getJobTitles(), 
//     ];
//     return lookups;
// });
export const GetJobTitlesAndLocations = createAsyncThunk("general/title_location", async ()=> {
    const lookups = {
        jobTitles: await getJobTitles(), 
        locations: await getLocations(),
    };
    return lookups;
});
export const GetCategoriesAndTypes = createAsyncThunk("general/category_type", async ()=> {
    const lookups = {
        employeeCategories: await getCategories(), 
        employeeTypes: await getTypes(),
    };
    return lookups;
});
export const GetUnions = createAsyncThunk("general/union", async ()=> {
    const lookups = {
        unions: await getUnions(),
    };
    return lookups;
});

export const GetAdditionals = createAsyncThunk("general/additional_info", async ()=> {
    const lookups = {
        housings: await getHousings(),
        securities: await getSecurities(),
        wardrobes: await getWardrobes(),
    };
    return lookups;
});

export const GetElementLinkAdditionalLookupsThunk = createAsyncThunk("general/additional_lookups", async ()=> {
    const lookups = await getElementLinkAdditionalLookups();
    return lookups;
});

export const GetSuborganizatonsThunk = createAsyncThunk("general/suborganizations", async ()=> {
    const suborganizations = await getSuborganizations();
    return suborganizations.data;
});

export const GetDepartmentsThunk = createAsyncThunk("general/departments", async (suborganizationID: string)=> {
    const departments = await getDepartments(suborganizationID);
    return departments.data;
});

export const GetGradesThunk = createAsyncThunk("general/grades", async ()=> {
    const grades = await getGrades();
    return grades.data;
});

export const GetGradeStepsThunk = createAsyncThunk("general/gradesteps", async (gradeID: string)=> {
    const gradeSteps = await getGradeSteps(gradeID);
    return gradeSteps;
});

const initialState: GeneralInitialStateType = {
    loading: false,
    error: false,
    suborganizations: [],
    departments: [],
    grades: [],
    gradeSteps: [],
    elementLookups: {},
    linkLookups: {},
    additionalLookups: {},
};

const reducers = {};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers,

    extraReducers(builder) {
        builder
            .addCase(GetElementLookupsThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, elementLookups: action.payload??{}  }
            })
            .addCase(GetJobTitlesAndLocations.fulfilled, (state, action)=> {
                return { 
                    ...state, 
                    error: false, 
                    loading: false, 
                    linkLookups: action.payload? { ...state.linkLookups, ...action.payload }:{}  
                }
            })
            .addCase(GetCategoriesAndTypes.fulfilled, (state, action)=> {
                return { 
                    ...state, 
                    error: false, 
                    loading: false, 
                    linkLookups: action.payload? { ...state.linkLookups, ...action.payload }:{}  
                }
            })
            .addCase(GetUnions.fulfilled, (state, action)=> {
                return { 
                    ...state, 
                    error: false, 
                    loading: false, 
                    linkLookups: action.payload? { ...state.linkLookups, ...action.payload }:{}  
                }
            })
            .addCase(GetAdditionals.fulfilled, (state, action)=> {
                return { 
                    ...state, 
                    error: false, 
                    loading: false, 
                    linkLookups: action.payload? { ...state.linkLookups, ...action.payload }:{}  
                }
            })
            .addCase(GetElementLinkAdditionalLookupsThunk.fulfilled, (state, action)=> {
                return { ...state, error: true, loading: false, additionalLookups: action.payload??{}  }
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