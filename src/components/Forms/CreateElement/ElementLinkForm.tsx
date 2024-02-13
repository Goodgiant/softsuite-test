// import { useState } from "react";
// import "./ElementForm.scss";
// import { DatePicker, Input, Modal, Radio, Select, Steps, Switch } from "antd";
// import TextArea from "antd/es/input/TextArea";

// export interface ElementLinklFormStateType {
//     "name"?: string,
//     "elementId"?: number,
//     "suborganizationId"?: number,
//     "locationId"?: number,
//     "departmentId"?: number,
//     "employeeCategoryId"?: number,
//     "employeeCategoryValueId"?: number,
//     "employeeTypeId"?: number,
//     "employeeTypeValueId"?: number,
//     "jobTitleId"?: number,
//     "grade"?: number,
//     "gradeStep"?: number,
//     "unionId"?: number,
//     "amountType"?: string,
//     "amount"?: number,
//     "rate"?: number,
//     "effectiveStartDate"?: string,
//     "effectiveEndDate"?: string,
//     "status"?: string,
//     "automate"?: string,
//     "additionalInfo"?: {
//       "lookupId": number,
//       "lookupValueId": number,
//     }[],
// }
    

// const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
// ]

// const items = [
//     {
//       title: 'Element Details',
//     },
//     {
//       title: 'Additional Details',
//     },
// ];

// const ElementForm = (props: { showForm: boolean, handleSubmit: (formData: ElementLinklFormStateType)=> void, loading: boolean, editMode?: boolean, editData?: ElementLinklFormStateType, }) => {
//     let totalSteps = 2;
//     let [show, setShow] = useState(true);


//     const [data, setData] = useState<ElementLinklFormStateType | null>(props.editData??{
//         status: "active",
//     });
//     const [step, setStep] = useState(1);

//     const handleInputChange = (keyValue:{key: string, value: any }): void => {
//         const realValue = keyValue.value?.target?.value || keyValue.value;
//         console.log({ key: keyValue.key, value: realValue });
//         setData((prev)=> ({
//             ...prev,
//             [keyValue.key]: realValue,
//         }))
//     };

//     const handleCancel = () => {
//         if (step === 1) {
//             setShow(false);
//         } else {
//             setStep(prev=> prev-1);
//         }
//     }

//     const handleConfirm = () => {
        
//         if (step === totalSteps) {
//             // alert(`Confirm`)
//         } else {
//             // alert(`Confirm`)
//             setStep(prev=> prev+1);
//         }
//     }

//     const getElementFormRowsByStep = (step: number) => {
//         switch (step) {
//             case 1: return (
//                 <>
//                 <div className="form-row">
//                     <label className="input-group">
//                         Name
//                         <Input onChange={(value)=> handleInputChange({key: "name", value})} value={data?.name} className="input-element" placeholder="Input Name" />
//                     </label>
//                     <label className="input-group">
//                         Element Classification
//                         <Select onChange={(value)=> handleInputChange({key: "classificationId", value })} value={data?.classificationId} className="select-element" placeholder="Select Classification">
//                             <Select.Option className="select-option" key={"1"} value="Option 1">Option 1</Select.Option>
//                             <Select.Option className="select-option" key={"2"} value="Option 2">Option 2</Select.Option>
//                             <Select.Option className="select-option" key={"3"} value="Option 3">Option 3</Select.Option>
//                         </Select>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label className="input-group">
//                         Element Category
//                         <Select onChange={(value)=> handleInputChange({key: "categoryId", value})} value={data?.categoryId} className="select-element" placeholder="Select Element Category">
//                             <Select.Option className="select-option" key={"1"} value="Option 1">Option 1</Select.Option>
//                             <Select.Option className="select-option" key={"2"} value="Option 2">Option 2</Select.Option>
//                             <Select.Option className="select-option" key={"3"} value="Option 3">Option 3</Select.Option>
//                         </Select>
//                     </label>
//                     <label className="input-group">
//                         Payrun
//                         <Select onChange={(value)=> handleInputChange({key: "payRunId", value})} value={data?.payRunId} className="select-element" placeholder="Select Payrun">
//                             <Select.Option className="select-option" value="Option 1">Option 1</Select.Option>
//                             <Select.Option className="select-option" value="Option 2">Option 2</Select.Option>
//                             <Select.Option className="select-option" value="Option 3">Option 3</Select.Option>
//                         </Select>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label className="input-single">
//                         Description
//                         <TextArea rows={3} onChange={(value)=> handleInputChange({key: "description", value})} value={data?.description} className="text-area-element" placeholder="Input Description" />
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label className="input-single">
//                         Reporting Name
//                         <TextArea rows={3} onChange={(value)=> handleInputChange({key: "reportingName", value})} value={data?.reportingName} className="text-area-element" placeholder="Input Reporting Name" />
//                     </label>
//                 </div>
//                 </>
//             );
//             case 2: return (
//                 <>
//                 <div className="form-row">
//                     <label className="input-group">
//                         Effective Start Date
//                         <DatePicker onChange={(_, value)=> handleInputChange({key: "effectiveStartDate", value })} className="input-element" placeholder="Select Date" />
//                     </label>
//                     <label className="input-group">
//                         Effective End Date
//                         <DatePicker onChange={(_, value)=> handleInputChange({key: "effectiveStartDate", value })} className="input-element" placeholder="Select Date" />
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label className="input-group">
//                         Processing Type
//                         <Radio.Group onChange={(value)=> handleInputChange({key: "processingType", value})} value={data?.processingType} className="radio-group">
//                             <Radio value={"open"}>Open</Radio>
//                             <Radio value={"close"}>Close</Radio>
//                         </Radio.Group>
//                     </label>
//                     <label className="input-group">
//                         Pay Frequency
//                         <Radio.Group onChange={(value)=> handleInputChange({key: "payFrequency", value})} value={data?.payFrequency} className="radio-group">
//                             <Radio value={"monthly"}>Monthly</Radio>
//                             <Radio value={"selectedMonths"}>Selected Months</Radio>
//                         </Radio.Group>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label className="input-single">
//                         Selected Pay Months
//                         <Select
//                             showSearch
//                             style={{ width: '100%' }}
//                             value={data?.selectedMonths}
//                             dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
//                             placeholder="Please select"
//                             allowClear
//                             mode="multiple"
//                             onChange={(value)=> handleInputChange({key: "selectedMonths", value})}
//                             className="select-element"
//                             options={months.map(value=> ({ value, key: value })) }
//                         />
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label className="input-group">
//                         Prorate
//                         <Radio.Group onChange={(value)=> handleInputChange({key: "prorate", value})} value={data?.prorate} className="radio-group">
//                             <Radio value={"yes"}>Yes</Radio>
//                             <Radio value={"no"}>No</Radio>
//                         </Radio.Group>
//                     </label>
//                     <label className="input-group">
//                         Status
//                         <div className="switch-group">
//                             <Switch className="switch-element" defaultChecked onChange={(value)=> handleInputChange({key: "status", value: value? "active":"inactive"})} />
//                             <p>{data?.status == "active"? "Active" : "Inactive"}</p>
//                         </div>
//                     </label>
//                 </div>
//                 </>
//             );
//         }
//     }




//     return (
//         <Modal 
//             open={show} 
//             className="form-modal"
//             width={1000}
//             centered
//             closable={false}
//             title="Create Element"
//             cancelButtonProps={{ 
//                 className: 'form-modal-cancel-button',
//             }}
//             onCancel={handleCancel}
//             okButtonProps={{ 
//                 className: 'form-modal-confirm-button',
//             }}
//             onOk={handleConfirm}
//             cancelText={step===1? "Cancel" : "Back"}
//             okText={step!==totalSteps? "Next" : "Create New Element"}
//         >
//             <div className="form-modal-content-wrapper">

//                 <div className="stepper-container">
//                     <div className="active-line"></div>
//                     <Steps 
//                         current={step - 1}
//                         labelPlacement="vertical" 
                        
//                         items={items} 
//                     />
//                     <div className="inactive-line"></div>

//                 </div>

//                 <div className="form-wrapper">
//                     <form>
//                     {getElementFormRowsByStep(step)}
//                     </form>
//                 </div>

//             </div>



//         </Modal>
//     )

// }

// export default ElementForm;