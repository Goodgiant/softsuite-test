import axios from "axios";

export const api = axios.create({
    baseURL: "https://650af6bedfd73d1fab094cf7.mockapi.io"
});

export const getLookups = async () => {

    try {
        const { data: elementCategories } = await api.get("lookups/1/lookupvalues");
        const { data: elementClassifications } = await api.get("lookups/2/lookupvalues");
        const { data: employeeCategories } = await api.get("lookups/3/lookupvalues");
        const { data: employeeTypes } = await api.get("lookups/4/lookupvalues");
        const { data: payRuns } = await api.get("lookups/5/lookupvalues");
        const { data: jobTitles } = await api.get("lookups/6/lookupvalues");
        const { data: locations } = await api.get("lookups/7/lookupvalues");
        const { data: unions } = await api.get("lookups/8/lookupvalues");
        const { data: housings } = await api.get("lookups/9/lookupvalues");
        const { data: wardrobes } = await api.get("lookups/10/lookupvalues");
        const { data: securities } = await api.get("lookups/11/lookupvalues");
        
        return {
            elementCategories,
            elementClassifications,
            employeeCategories,
            employeeTypes,
            payRuns,
            jobTitles,
            locations,
            unions,
            housings,
            wardrobes,
            securities,
        };
    } catch (err) {
        console.log({err})
    }
    
}

export const getSuborganizations = async () => {

    try {
        const { data: suborganizations } = await api.get("suborganizations");
        
        return suborganizations
    } catch (err) {
        console.log({err})
    }
    
}

export const getDepartments = async (suborganizationID: string) => {

    try {
        const { data: departments } = await api.get(`suborganizations/${suborganizationID}/departments`);
        
        return departments;
    } catch (err) {
        console.log({err})
    }
    
}

export const getGrades = async () => {

    try {
        const { data: grades } = await api.get(`grade`);
        
        return grades;
    } catch (err) {
        console.log({err})
    }
    
}

export const getGradeSteps = async (gradeID: string) => {

    try {
        const { data: grades } = await api.get(`grade/${gradeID}/gradeSteps`);
        
        return grades;
    } catch (err) {
        console.log({err})
    }
    
}
