import { ElementFormStateType } from "../../components/Forms/CreateElement/ElementForm";
import { api } from "../../redux/generalAPIs";

export const getElements = async () => {

    try {
        const result = await api.get("elements");
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}

export const createNewElement = async (data: ElementFormStateType) => {

    try {
        const result = await api.post("elements", { ...data, modifiedBy: "Victor Izu-Akiti"});
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}

export const updateElement = async (data: ElementFormStateType) => {

    try {
        const result = await api.put("elements/" + data.id, { ...data, modifiedBy: "Victor Izu-Akiti"});
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}

export const deleteElement = async (elementID: string) => {

    try {
        const result = await api.delete("elements/" + elementID);
        return result.data;
    } catch (err) {
        console.log({err})
    }
    
}