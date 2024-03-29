import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import * as yup from 'yup';
import "./ElementForm.scss";
import { DatePicker, Input, Modal, Radio, Select, Steps, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetElementLookupsThunk } from "../../../redux/generalSlice";

export interface ElementFormStateType {
    "id"?: string,
    "name"?: string,
    "description"?: string,
    "payRunId"?: string,
    "payRunValueId"?: string,
    "classificationId"?: string,
    "classificationValueId"?: string,
    "categoryId"?: string,
    "categoryValueId"?: string,
    "reportingName"?: string,
    "processingType"?: "open" | "close",
    "status"?: any,
    "prorate"?: "yes" | "no",
    "effectiveStartDate"?: string,
    "effectiveEndDate"?: string,
    "selectedMonths"?: string[],
    "payFrequency"?: string,
    "modifiedBy"?: string,
}

let totalSteps = 2;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const stepperItems = [
    {
      title: 'Element Details',
    },
    {
      title: 'Additional Details',
    },
];

// schema for yup validation
const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    payRunId: yup.number().required(),
    // payRunValueId: yup.number().required(),
    classificationId: yup.number().required(),
    // classificationValueId: yup.number().required(),
    categoryId: yup.number().required(),
    // categoryValueId: yup.number().required(),
    reportingName: yup.string().required(),
    processingType: yup.string().required(),
    status: yup.string().required(),
    prorate: yup.string().required(),
    effectiveStartDate: yup.string().required(),
    effectiveEndDate: yup.string().required(),
    selectedMonths: yup.array().required(),
    payFrequency: yup.string().required(),
});



const ElementForm = (props: { showForm: boolean, cancelShow: ()=>void, handleSubmit: (formData: ElementFormStateType)=> void, editMode?: boolean }) => {
    const dispatch = useAppDispatch();
    
    const { selectedElement, loading } = useAppSelector(state=> state.elements);
    const { elementLookups } = useAppSelector(state=> state.general);
    useEffect(()=> {
        dispatch(GetElementLookupsThunk());
    }, [])

    const defaultInitialState: ElementFormStateType = {
        status: "active",
        prorate: "yes",
        processingType: "open",
        payFrequency: "monthly",
        selectedMonths: [],
    };

    useEffect(()=> {
        setStep(1);
        if (props.editMode && selectedElement) {
            setData(selectedElement);
        } else {
            setData(defaultInitialState)
        }
    }, [selectedElement])


    const [data, setData] = useState<ElementFormStateType | null>(props.editMode? selectedElement : defaultInitialState);
    const [step, setStep] = useState(1);
    
    // conditions to be checked before progressing or submitting
    const isNextable = 
        data?.name 
        && data?.description 
        && data?.categoryId 
        && data?.classificationId 
        && data?.reportingName 
        && data?.payRunId;
    const isSubmitable = 
        isNextable 
        && data?.effectiveStartDate 
        && data?.effectiveEndDate 
        && data?.processingType 
        && data?.payFrequency 
        && ((data?.payFrequency !== "monthly" && data?.selectedMonths?.length) 
            || data?.payFrequency === "monthly") 
        && data?.prorate;

    const handleInputChange = ({value, key}:{key: string, value: any }): void => {
        const realValue = value?.target? 
            value.target.value : value;

        if (key === 'payFrequency' && realValue === "monthly") {
            setData((prev)=> ({
                ...prev,
                [key]: realValue,
                selectedMonths: [],
            }));
        } else {
            setData((prev)=> ({
                ...prev,
                [key]: realValue,
            }));
        }
    };

    const handleCancel = () => {
        if (step === 1) {
            setData(defaultInitialState);
            props.cancelShow();
        } else {
            setStep(prev=> prev-1);
        }
    }

    const handleConfirm = () => {
        
        if (step === totalSteps) {
            isSubmitable && submitForm();
        } else {
            // alert(`Confirm`)
            isNextable && setStep(prev=> prev+1);
        }
    }

    // Function to display only categories under selected classification
    const filterCategories =()=> {
        let selectedClass = elementLookups?.elementClassifications?.find(item=> item.id == data?.classificationId );
        let isEarningClass = (item:any):boolean=> {
            return item?.name.toLowerCase().includes("earning")  && !item?.name.toLowerCase().includes("deduction");
        }
        let isDeductionClass = (item:any):boolean=> {
            return item?.name.toLowerCase().includes("deduction")  && !item?.name.toLowerCase().includes("earning");
        }
        let isOtherClass = (item:any):boolean=> {
            return !item?.name.toLowerCase().includes("earning") && !item?.name.toLowerCase().includes("deduction");
        }
        const earningsCategories= elementLookups.elementCategories?.filter((item)=> isEarningClass(item));
        const deductionsCategories= elementLookups.elementCategories?.filter((item)=> isDeductionClass(item));
        const otherCategories= elementLookups.elementCategories?.filter((item)=> isOtherClass(item));
        
        if (selectedClass?.name.toLowerCase() === "earning"){
            return earningsCategories;
        }
        else if (selectedClass?.name.toLowerCase() === "deduction"){
            return deductionsCategories;
        }
        return otherCategories;
    }

    // method to trigger validation and return the error message
    const validateFormData = async (formData:ElementFormStateType) => {
        const errors = await schema.validate(formData);
        console.log({ errors });
        if (errors) {
            return errors;
        } else {
            return undefined;
        }
    };

    const submitForm = async () => {
        if (data) {
            const valid = await validateFormData(data);
            if (valid) {
                props.handleSubmit(data);
            }
        } else {
            // TODO:
        }
    }



    // Render function for each form step
    const getElementFormRowsByStep = (step: number) => {
        switch (step) {
            case 1: return (
                <>
                <div className="form-row">
                    <label className="input-group">
                        Name
                        <Input onChange={(value)=> handleInputChange({key: "name", value})} value={data?.name} className="input-element" placeholder="Input Name" />
                    </label>
                    <label className="input-group">
                        Element Classification
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "classificationId", value});
                                handleInputChange({
                                    key: "classificationValueId", 
                                    value: elementLookups.elementClassifications?.find(item => item.id === value)?.name
                                });
                            } } 
                            value={data?.classificationId} 
                            className="select-element" 
                            placeholder="Select Classification"
                        >
                        {
                            elementLookups?.elementClassifications?.map((clas, i)=> (
                                <Select.Option className="select-option" key={i} value={clas.id}>{clas.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-group" hidden={data?.classificationId? false : true}>
                        Element Category
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "categoryId", value});
                                handleInputChange({
                                    key: "categoryValueId", 
                                    value: elementLookups.elementCategories?.find(item => item.id === value)?.name
                                });
                            } }
                            value={data?.categoryId} 
                            className="select-element" 
                            placeholder="Select Element Category"
                        >
                        {
                            filterCategories()?.map((cat, i)=> <Select.Option className="select-option" key={i} value={cat.id}>{cat.name}</Select.Option>)
                        }
                        </Select>
                    </label>
                    <label className="input-group">
                        Payrun
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "payRunId", value});
                                handleInputChange({
                                    key: "payRunValueId", 
                                    value: elementLookups.payRuns?.find(payRun => payRun.id === value)?.name
                                });
                            }} 
                            value={data?.payRunId} 
                            className="select-element" 
                            placeholder="Select Payrun"
                        >
                        {
                            elementLookups?.payRuns?.map((pr, i)=> (
                                <Select.Option className="select-option" key={i} value={pr.id}>{pr.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-single">
                        Description
                        <TextArea rows={3} onChange={(value)=> handleInputChange({key: "description", value})} value={data?.description} className="text-area-element" placeholder="Input Description" />
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-single">
                        Reporting Name
                        <TextArea rows={3} onChange={(value)=> handleInputChange({key: "reportingName", value})} value={data?.reportingName} className="text-area-element" placeholder="Input Reporting Name" />
                    </label>
                </div>
                </>
            );
            case 2: return (
                <>
                <div className="form-row">
                    <label className="input-group">
                        Effective Start Date
                        <DatePicker defaultValue={data?.effectiveStartDate && dayjs(data?.effectiveStartDate)} onChange={(_, value)=> handleInputChange({key: "effectiveStartDate", value })} className="input-element" placeholder="Select Date" />
                    </label>
                    <label className="input-group">
                        Effective End Date
                        <DatePicker minDate={dayjs(data?.effectiveStartDate)} defaultValue={data?.effectiveEndDate && dayjs(data?.effectiveEndDate)} onChange={(_, value)=> handleInputChange({key: "effectiveEndDate", value })} className="input-element" placeholder="Select Date" />
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Processing Type
                        <Radio.Group onChange={(value)=> handleInputChange({key: "processingType", value})} value={data?.processingType} className="radio-group">
                            <Radio value={"open"}>Open</Radio>
                            <Radio value={"close"}>Close</Radio>
                        </Radio.Group>
                    </label>
                    <label className="input-group">
                        Pay Frequency
                        <Radio.Group onChange={(value)=> handleInputChange({key: "payFrequency", value})} value={data?.payFrequency} className="radio-group">
                            <Radio value={"monthly"}>Monthly</Radio>
                            <Radio value={"selectedMonths"}>Selected Months</Radio>
                        </Radio.Group>
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-single">
                        Selected Pay Months
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            value={data?.selectedMonths}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            mode="multiple"
                            onChange={(value)=> handleInputChange({key: "selectedMonths", value})}
                            className="select-element-items"
                            disabled={data?.payFrequency === "monthly"}
                            options={months.map(value=> ({ value, key: value })) }
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Prorate
                        <Radio.Group onChange={(value)=> handleInputChange({key: "prorate", value})} value={data?.prorate} className="radio-group">
                            <Radio value={"yes"}>Yes</Radio>
                            <Radio value={"no"}>No</Radio>
                        </Radio.Group>
                    </label>
                    <label className="input-group">
                        Status
                        <div className="switch-group">
                            <Switch className="switch-element" defaultChecked={!props.editMode? true : data?.status?.toLowerCase() === "active"? true : false } onChange={(value)=> handleInputChange({key: "status", value: value? "active":"inactive"})} />
                            <p>{ data?.status?.toLowerCase() == "active"? "Active" : "Inactive"}</p>
                        </div>
                    </label>
                </div>
                </>
            );
        }
    }




    return (
        <Modal 
            open={props.showForm} 
            className="form-modal"
            width={1000}
            centered
            closable={false}
            title="Create Element"
            cancelButtonProps={{ 
                className: 'form-modal-cancel-button',
            }}
            onCancel={handleCancel}
            okButtonProps={{ 
                className: (step===1 && isNextable) || (step==2 && isSubmitable)?'form-modal-confirm-button': 'form-modal-confirm-button-disabled',
            }}
            confirmLoading={loading}
            onOk={handleConfirm}
            cancelText={step===1? "Cancel" : "Back"}
            okText={step!==totalSteps? "Next" : `${props.editMode? "Update" : "Create New"} Element`}
        >
            <div className="form-modal-content-wrapper">

                <div className="stepper-container">
                    <div className="active-line"></div>
                    <Steps 
                        current={step - 1}
                        labelPlacement="vertical" 
                        
                        items={stepperItems} 
                    />
                    <div className="inactive-line"></div>

                </div>

                <div className="form-wrapper">
                    <form>
                    {getElementFormRowsByStep(step)}
                    </form>
                </div>

            </div>



        </Modal>
    )

}

export default ElementForm;