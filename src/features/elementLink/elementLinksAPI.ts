import { ElementFormStateType } from "../../components/Forms/CreateElement/ElementForm";
import { api } from "../../redux/generalAPIs";

export const getElementLinks = async (elementID: string) => {

    try {
        const result = await api.get(`elements/${elementID}/elementlinks`);
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}

export const createNewElementLink = async (elementID: string, data: ElementFormStateType) => {

    try {
        const result = await api.post(`elements/${elementID}/elementlinks`, { ...data, modifiedBy: "Victor Izu-Akiti"});
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}

export const updateElementLink = async (elementID: string, data: ElementFormStateType) => {

    try {
        const result = await api.put(`elements/${elementID}/elementlinks/` + data.id, { ...data, modifiedBy: "Victor Izu-Akiti"});
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}

export const deleteElementLink = async (elementID: string, linkID :string) => {

    try {
        const result = await api.delete(`elements/${elementID}/elementlinks/${linkID}`);
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}