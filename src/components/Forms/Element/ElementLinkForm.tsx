import { useEffect, useState } from "react";
import "./ElementForm.scss";
import dayjs from 'dayjs';
import { DatePicker, Input, Modal, Radio, Select, Steps, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetAdditionals, GetDepartmentsThunk, GetGradeStepsThunk } from "../../../redux/generalSlice";

export interface ElementLinkFormStateType {
    "id"?: string,
    "name"?: string,
    "elementId"?: number,
    "suborganizationId"?: string,
    "suborganizationValueId"?: string,
    "locationId"?: string,
    "locationValueId"?: string,
    "departmentId"?: number,
    "departmentValueId"?: string,
    "employeeCategoryId"?: string,
    "employeeCategoryValueId"?: string,
    "employeeTypeId"?: string,
    "employeeTypeValueId"?: number,
    "jobTitleId"?: number,
    "jobTitleValueId"?: string
    "grade"?: string,
    "gradeValueId"?: string,
    "gradeStep"?: number,
    "gradeStepValueId"?: string,
    "unionId"?: string,
    "unionValueId"?: string,
    "amountType"?: string,
    "amount"?: number,
    "rate"?: number,
    "effectiveStartDate"?: string,
    "effectiveEndDate"?: string,
    "status"?: any,
    "automate"?: string,
    "additionalInfo"?: {
      "lookupId": string,
      "lookupValueId": string,
    }[],
}

const totalSteps = 3;

const items = [
    {
      title: 'Staff Information',
    },
    {
      title: 'Additional Information',
    },
    {
        title: 'Processing Information',
    },
];

const ElementLinkForm = (props: { showForm: boolean, cancelShow: ()=>void, handleSubmit: (formData: ElementLinkFormStateType)=> void, editMode?: boolean }) => {
    const dispatch = useAppDispatch();
    
    const { selectedElementLink, loading } = useAppSelector(state=> state.elementLinks);
    const { linkLookups, suborganizations, departments, grades, gradeSteps } = useAppSelector(state=> state.general);
    
    useEffect(()=> {
        setStep(1);
        if (props.editMode) {
            setData(selectedElementLink);
            selectedElementLink?.suborganizationId && dispatch(GetDepartmentsThunk(selectedElementLink?.suborganizationId));
            setTimeout(()=> {

                selectedElementLink?.grade && dispatch(GetGradeStepsThunk(selectedElementLink?.grade));
        
            }, 700)
        }
    }, [selectedElementLink])


    const [data, setData] = useState<ElementLinkFormStateType | null>(props.editMode? selectedElementLink : {
        status: "active",
        automate: "yes",
        amountType: "Fixed Value",
        additionalInfo: [],
    });

    
    const [step, setStep] = useState(1);
    useEffect(()=> {
        step === 2 && dispatch(GetAdditionals());
    }, [step])
    const isNextableStep1 = data?.name
    const isNextableStep2 = true;
    const isSubmitable = isNextableStep1 && isNextableStep2 && data?.amountType && (data?.amount || data?.rate);

    const handleInputChange = ({value, key}:{key: string, value: any }): void => {
        
        if (key === 'suborganizationId') {
            dispatch(GetDepartmentsThunk(value));
        }
        if (key === 'grade') {
            dispatch(GetGradeStepsThunk(value));
        }
        
        let realValue = value?.target?.value?? value;
        let newValue = key==="amount" || key==="rate"? Number(realValue) : realValue;
        console.log({[key]: newValue})

        setData((prev)=> ({
            ...prev,
            [key]: newValue,
        }));
    };
    
    const handleAdditionalInputChange = ({id, valueId}:{id: string, valueId: any }): void => {

        const existingIndex = data?.additionalInfo?.findIndex(item=> {
            return item.lookupId === id;
        });

        
        if (existingIndex && existingIndex >= 0) {
            
            setData((prev)=> {
                if (prev && prev?.additionalInfo) {
                    prev.additionalInfo[existingIndex].lookupValueId = valueId;
                }
                return prev;
            });
        } else {
            setData((prev)=> {
                if (prev && prev?.additionalInfo) {
                    let infoArray = [ 
                        ...prev.additionalInfo, 
                        {
                            lookupId: id,
                            lookupValueId: valueId
                        }
                    ]

                    return { ...prev, additionalInfo: infoArray};
                }
                return prev;
            });
        }

        
    };

    const handleCancel = () => {
        if (step === 1) {
            props.cancelShow();
        } else {
            setStep(prev=> prev-1);
        }
    }

    const handleConfirm = () => {
        
        if (step === totalSteps) {
            isSubmitable && submitForm();
        } else if (step === 1) {
            isNextableStep1 && setStep(prev=> prev+1);
        } else {
            isNextableStep2 && setStep(prev=> prev+1);
        }
    }

    const submitForm = async () => {
        if (data) {
            props.handleSubmit(data);
        } else {
            // TODO: error toast
        }
    }

    const getAdditionalInfoValue= (lookupId:string) =>{

        let objectInAddedInfoArray= data?.additionalInfo?.find(item=> item.lookupId === lookupId);
        
        if(objectInAddedInfoArray){
            let finder;
            if (lookupId === '9') {
                finder = linkLookups?.housings?.find(item=> item.id === objectInAddedInfoArray?.lookupValueId);
                
                return finder;
            }
            if (lookupId === '10') {
                finder = linkLookups?.wardrobes?.find(item=> item.id === objectInAddedInfoArray?.lookupValueId);
                 
                return finder;
            }
            if (lookupId === '11') {
                finder = linkLookups?.securities?.find(item=> item.id === objectInAddedInfoArray?.lookupValueId);

                return finder;
            }
            return finder;
            
        } else {
            return null
        }
    }

    const getElementLinkFormRowsByStep = (step: number) => {
        switch (step) {
            case 1: return (
                <>
                <div className="form-row">
                    <label className="input-single">
                        Name
                        <Input onChange={(value)=> handleInputChange({key: "name", value})} value={data?.name} className="input-element" placeholder="Input Name" />
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Suborganization
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "suborganizationId", value});
                                handleInputChange({
                                    key: "suborganizationValueId", 
                                    value: suborganizations?.find(item => item.id === value)?.name
                                });
                            } } 
                            value={data?.suborganizationId} 
                            className="select-element" 
                            placeholder="Select Suborganization"
                        >
                        {
                            suborganizations?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                    {data?.suborganizationId &&
                    <label className="input-group" hidden={data?.suborganizationId? false : true}>
                        Department
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "departmentId", value});
                                // handleInputChange({
                                //     key: "departmentValueId", 
                                //     value: departments?.find(item => item.id === value)?.name
                                // });
                            } }
                            value={data?.departmentId} 
                            className="select-element" 
                            placeholder="Select Department" 
                        >
                        {
                            departments?.map((cat, i)=> <Select.Option className="select-option" key={i} value={cat.id}>{cat.name}</Select.Option>)
                        }
                        </Select>
                    </label>}
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Job Title
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "jobTitleId", value});
                                handleInputChange({
                                    key: "jobTitleValueId", 
                                    value: linkLookups?.jobTitles?.find(item => item.id == JSON.stringify(value))?.name
                                });
                            }} 
                            value={data?.jobTitleId} 
                            className="select-element" 
                            placeholder="Select Job title"
                        >
                        {
                            linkLookups?.jobTitles?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                    <label className="input-group">
                        Location
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "locationId", value});
                                handleInputChange({
                                    key: "locationValueId", 
                                    value: linkLookups?.locations?.find(item => item.id == value)?.name
                                });
                            }} 
                            value={data?.locationId} 
                            className="select-element" 
                            placeholder="Select Location"
                        >
                        {
                            linkLookups?.locations?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Employee Type
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "employeeTypeId", value});
                                handleInputChange({
                                    key: "employeeTypeValueId", 
                                    value: linkLookups?.employeeTypes?.find(item => item.id == value)?.name
                                });
                            }} 
                            value={data?.employeeTypeId} 
                            className="select-element" 
                            placeholder="Select Employee Type"
                        >
                        {
                            linkLookups?.employeeTypes?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                    <label className="input-group">
                        Employee Category
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "employeeCategoryId", value});
                                handleInputChange({
                                    key: "employeeCategoryValueId", 
                                    value: linkLookups?.employeeCategories?.find(item => item.id === value)?.name
                                });
                            }} 
                            value={data?.employeeCategoryId} 
                            className="select-element" 
                            placeholder="Select Employee Category"
                        >
                        {
                            linkLookups?.employeeCategories?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                </div>
                </>
            );
            case 2: return (
                <>
                <div className="form-row">
                    <label className="input-group">
                        Grade
                        <Select 
                            onChange={(value)=> {
                                console.log(value);
                                handleInputChange({key: "grade", value});
                                handleInputChange({
                                    key: "gradeValueId", 
                                    value: grades?.find(item => item.id === value)?.name
                                });
                            } } 
                            value={data?.grade} 
                            className="select-element" 
                            placeholder="Select Grade"
                        >
                        {
                            grades?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                    {data?.grade && 
                    <label className="input-group" hidden={data?.suborganizationId? false : true}>
                        Grade Step
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "gradeStep", value});
                                handleInputChange({
                                    key: "gradeStepValueId", 
                                    value: gradeSteps?.find(item => item.id === value)?.name
                                });
                            } }
                            value={data?.gradeStep} 
                            className="select-element" 
                            placeholder="Select Grade Step" 
                        >
                        {
                            gradeSteps?.map((cat, i)=> <Select.Option className="select-option" key={i} value={cat.id}>{cat.name}</Select.Option>)
                        }
                        </Select>
                    </label>}
                </div>
                <div className="form-row">
                    <label className="input-single">
                        Union
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "unionId", value});
                                handleInputChange({
                                    key: "unionValueId", 
                                    value: linkLookups?.unions?.find(item => item.id === value)?.name
                                });
                            }} 
                            value={data?.unionId}
                            className="select-element" 
                            placeholder="Select Union"
                        >
                        {
                            linkLookups?.unions?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                </div>
                <section className="additional-section">
                    <h4>Additional Assignment Information</h4>
                    <div className="form-row">
                        <label className="input-group">
                            Securities
                            <Select 
                                onChange={(value)=> {
                                    handleAdditionalInputChange({id: "11", valueId: value});
                                    
                                }} 
                                value={getAdditionalInfoValue('11')?.id} 
                                className="select-element" 
                                placeholder="Select Security Level" 
                            >
                            {
                                linkLookups?.securities?.map((item, i)=> (
                                    <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                            </Select>
                        </label>
                        <label className="input-group">
                            Housing
                            <Select 
                                onChange={(value)=> {
                                    handleAdditionalInputChange({id: "9", valueId: value});
                                    
                                }} 
                                value={getAdditionalInfoValue('9')?.id} 
                                className="select-element" 
                                placeholder="Select Housing Options" 
                            >
                            {
                                linkLookups?.housings?.map((item, i)=> (
                                    <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                            </Select>
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="input-group">
                            Wardrobe
                            <Select 
                                onChange={(value)=> {
                                    handleAdditionalInputChange({id: "10", valueId: value});
                                    
                                }} 
                                value={getAdditionalInfoValue('10')?.id} 
                                className="select-element" 
                                placeholder="Select Wardrobe Type" 
                            >
                            {
                                linkLookups?.wardrobes?.map((item, i)=> (
                                    <Select.Option className="select-option" key={i} value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                            </Select>
                        </label>
                    </div>
                </section>
                </>
            )
            case 3: return (
                <>
                <div className="form-row">
                    <label className="input-group">
                        Amount Type
                        <Select 
                            onChange={(value)=> {
                                handleInputChange({key: "amountType", value});
                                // handleInputChange({
                                //     key: "amountTypeId", 
                                //     value: grades?.find(item => item.id === value)?.name
                                // });
                            } } 
                            value={data?.amountType} 
                            defaultValue={data?.amountType} 
                            className="select-element" 
                            placeholder="Select amount type"
                        >
                        {
                            ["Fixed Value", "Rate Of Salary"]?.map((item, i)=> (
                                <Select.Option className="select-option" key={i} value={item}>{item}</Select.Option>
                            ))
                        }
                        </Select>
                    </label>
                    {data?.amountType === "Fixed Value" && 
                    <label className="input-group" hidden={data?.suborganizationId? false : true}>
                        Amount
                        <Input
                            type="decimal" 
                            onChange={(value)=> {
                                handleInputChange({key: "rate", value: 0});
                                handleInputChange({key: "amount", value: value});
                            } }
                            value={data?.amount} 
                            className="select-element" 
                            placeholder="Enter Amount" 
                        />
                    </label>}
                    {data?.amountType === "Rate Of Salary" && 
                    <label className="input-group" hidden={data?.suborganizationId? false : true}>
                        Rate
                        <Input
                            type="decimal"
                            onChange={(value:any)=> {
                                handleInputChange({key: "amount", value: 0});
                                handleInputChange({key: "rate", value: value});
                            } }
                            value={data?.rate} 
                            className="select-element" 
                            placeholder="Enter Rate" 
                        />
                    </label>}
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Effective Start Date
                        <DatePicker defaultValue={dayjs(data?.effectiveStartDate)} onChange={(_, value)=> handleInputChange({key: "effectiveStartDate", value })} className="input-element" placeholder="Select Date" />
                    </label>
                    <label className="input-group">
                        Effective End Date
                        <DatePicker defaultValue={dayjs(data?.effectiveEndDate)} onChange={(_, value)=> handleInputChange({key: "effectiveEndDate", value })} className="input-element" placeholder="Select Date" />
                    </label>
                </div>
                <div className="form-row">
                    <label className="input-group">
                        Automate
                        <Radio.Group onChange={(value)=> handleInputChange({key: "automate", value})} value={data?.automate} className="radio-group">
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
            title="Create Element Link"
            cancelButtonProps={{ 
                className: 'form-modal-cancel-button',
            }}
            onCancel={handleCancel}
            okButtonProps={{ 
                className: (step === 1 && isNextableStep1) || (step === 2 && isNextableStep2) || (step==3 && isSubmitable)?'form-modal-confirm-button': 'form-modal-confirm-button-disabled',
            }}
            confirmLoading={loading}
            onOk={handleConfirm}
            cancelText={step===1? "Cancel" : "Back"}
            okText={step!==totalSteps? "Next" : `${props.editMode? "Update" : "Create"} Element Link`}
        >
            <div className="form-modal-content-wrapper">

                <div className="stepper-container">
                    <div className="active-line"></div>
                    <Steps 
                        current={step - 1}
                        labelPlacement="vertical" 
                        
                        items={items} 
                    />
                    <div className="inactive-line"></div>

                </div>

                <div className="form-wrapper">
                    <form>
                    {getElementLinkFormRowsByStep(step)}
                    </form>
                </div>

            </div>



        </Modal>
    )

}

export default ElementLinkForm;